import React, { Component } from "react";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stomp-websocket';
import './ChattingRandom.css';
import { API_BASE_USER_URL, ACCESS_TOKEN, JOIN, CANCEL, WAIT } from "../constants";
import ApiController from '../api/ChatApiController';
import VoteModal from './VoteModal';
import ApiList from "../api/ApiList";

class ChattingRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnJoinText: JOIN,
      chatContent: "",
      chatMessageInput: "",
      chatStatus: WAIT,
      socket: null,
      stompClient: null,
      chatRoomId: null,
      joinInterval: null,
      showModal: false,
      senderUsername: "",
      ohterUserName: ""
    };

    this.handleChatMessageInput = this.handleChatMessageInput.bind(this);
    this.handleBtnJoin = this.handleBtnJoin.bind(this);
    this.updateText = this.updateText.bind(this);
    this.subscribeMessage = this.subscribeMessage.bind(this);
    this.connectAndSubscribe = this.connectAndSubscribe.bind(this);
    this.join = this.join.bind(this);
    this.cancel = this.cancel.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
  }

  getHeaders() {
    return {
      Authorization : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      chatRoomId: this.state.chatRoomId
    };
  }

  subscribeMessage() {
    this.state.stompClient.subscribe(
      "/topic/chat/" + this.state.chatRoomId,
      (resultObj) => {
        const result = JSON.parse(resultObj.body);
        let message = "";
        if (result.messageType === "CHAT") {
          this.setState({senderUsername: result.senderUsername});
          message = `${result.senderUsername} : ${result.message}\n`;
          if (this.props.currentUser.username !== result.senderUsername){
            this.setState({ohterUserName: result.senderUsername});
          } 
        } else if (result.messageType === "DISCONNECTED") {
          message = ">> Disconnected user :(";
          this.disconnect();
        }
        this.updateText(message, true);
      }
    );
  }

  connectAndSubscribe() {
    if (
      this.state.stompClient === null ||
      !this.state.stompClient.connected
    ) {
      const socket = new SockJS(`${API_BASE_USER_URL}/chat-websocket`);
      this.setState({stompClient: Stomp.over(socket)});
      this.state.stompClient.connect(this.getHeaders(), (frame) => {
        this.subscribeMessage();
        }
      );
    } else {
      this.subscribeMessage();
    }
  }

  join() {
    const responseSuccess = (chatResponse) => {
        if (!chatResponse) return;
        clearInterval(this.state.joinInterval);
        if (chatResponse.responseResult === "SUCCESS") {
          this.setState({
            chatRoomId: chatResponse.chatRoomId
          })
          this.setState({chatStatus: "chat"}); // TODO: Modify updateTemplate function
          this.updateText(">> Connected to another user :)\n", false);
          this.connectAndSubscribe();
        } else if (chatResponse.responseResult === "CANCEL") {
          this.updateText(">> Success to cancel", false);
          this.setState({btnJoinText: JOIN});
        } else if (chatResponse.responseResult === "TIMEOUT") {
          this.updateText(">> Can`t find user :(", false);
          this.setState({btnJoinText: JOIN});
        }
    };

    const responseFail = (jqxhr) => {
      clearInterval(this.state.joinInterval);
      if (jqxhr.status === 503) {
        this.updateText(
          "\n>>> Failed to connect some user :(\nPlz try again",
          true
        );
      } else {
        this.updateText(jqxhr, true);
      }
    }

    const complete = () => {
      clearInterval(this.state.joinInterval);
    };
    this.setState({btnJoinText: CANCEL});
    this.updateText("waiting anonymous user", false);
    this.setState({
      joinInterval: setInterval(() => {
        this.updateText(".", true);
      }, 1000)
    })

    ApiList.chatConnection(responseSuccess, responseFail, complete);
  }

  sendMessage() {
    const message = this.state.chatMessageInput;
    if (message === "") {
      alert("input message!");
    } else {
      var payload = {
      messageType: "CHAT",
      senderUserId: this.props.currentUser.userId,
      senderUsername: this.props.currentUser.username,
      message: message,
    };
    this.state.stompClient.send(
      "/app/chat.message/" + this.state.chatRoomId,
      this.getHeaders(),
      JSON.stringify(payload)
    );
    this.setState({chatMessageInput: ""});
    }
  }

  cancel() {
    ApiController({
      url: '/api/user/chat-random/cancel', // TODO: have to check this url later
      method: 'get'
    })
    .then(() => {
      this.updateText("", false);
    })
    .catch((jqxhr) => {
      alert("Error occur. please refresh");
    })
    .then(() => {
      this.disconnect();
      clearInterval(this.state.joinInterval);
    });
  }

  disconnect() {
    if (this.state.stompClient !== null) {
      this.handleOpenModal();
      this.state.stompClient.disconnect();
      this.setState({
        stompClient: null,
        chatStatus: WAIT,
        btnJoinText: JOIN
      });
    }
  }

    handleChatMessageInput(event) {
    this.setState({chatMessageInput: event.target.value});
  }

  handleOpenModal = () => {
    if (this.state.ohterUserName !== "" ) this.setState({showModal: true});
  }

  handleCloseModal = () => {
    this.setState({ohterUserName:""});
    this.setState({showModal: false});
  }

  handleBtnJoin() {
    var type = this.state.btnJoinText;
    if (type === JOIN) {
      this.setState({btnJoinText: CANCEL});
      this.join();
    } else if (type === CANCEL) {
      this.setState({btnJoinText: JOIN});
      this.cancel();
    }
  }

  updateText(message, append) {
    if (append) {
      this.setState({chatContent: this.state.chatContent + message})
    } else {
      this.setState({chatContent: message})
    }
  }

  render() {
    return (
        <div className="chatting-main-content">
          <VoteModal 
            ohterUserName={this.state.ohterUserName} 
            showModal={this.state.showModal}
            handleCloseModal={this.handleCloseModal}/>
          <div className="chat-main">
            <textarea className="chat-main" value={this.state.chatContent} readOnly/>
          </div>
          <div>
            {
            this.state.chatStatus === WAIT ?
              (
                <div className="chat-bottom">
                    <button className="join-btn btn" onClick={this.handleBtnJoin}>
                      {this.state.btnJoinText}
                    </button>
                </div>
              )
            :
              (
                <div className="chat-bottom">
                  <input type="text" 
                    className="chat-input"
                    onChange={this.handleChatMessageInput} 
                    onKeyPress={(e)=> {if(e.key === 'Enter') this.sendMessage()}}
                    value={this.state.chatMessageInput}/>
                  <div className="chat-btn">
                    <button className="join-btn btn" onClick={this.sendMessage}>Send</button>
                    <button className="join-btn btn" onClick={this.cancel}>Cancel</button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
    );
  }
}

export default ChattingRandom;