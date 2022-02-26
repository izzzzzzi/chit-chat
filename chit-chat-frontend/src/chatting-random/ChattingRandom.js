import React, { Component } from "react";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stomp-websocket';
import './ChattingRandom.css';
import { API_BASE_USER_URL, ACCESS_TOKEN } from "../constants";
import axios from 'axios'
import Modal from 'react-modal';
import {ENNEAGRAM_TYPE, MBTI_TYPE} from '../constants/index';

const JOIN = "Join";
const CANCEL = "Cancel";
const WAIT = "wait";

const chatApiController = axios.create({
  baseURL: API_BASE_USER_URL,
});

chatApiController.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    return config;
  }
)

chatApiController.interceptors.response.use(
  function (response) {
    return response.data;
  }
);

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

  handleChatMessageInput(event) {
    this.setState({chatMessageInput: event.target.value});
  }

  handleOpenModal = (data) => {
    if (data.ohterUserName === "") {
      // console.log("상대방은.. 채팅을 하지 않았다..");
      this.setState({showModal: false});
<<<<<<< HEAD
    } else {this.setState({showModal: true})};
=======
    } else if (data.senderUsername === data.currentUser.username){
      console.log(data.senderUsername);
      // TODO 마지막 메세지 보낸 사람 말고 상대방 아이디 불러오기,,
      this.setState({showModal: true});
    }
>>>>>>> 1d23215f8bee2fccc377ee7fd0e61f97f5794848
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
        // console.log('conencted :' + frame);
        this.subscribeMessage();
        }
      );
    } else {
      this.subscribeMessage();
    }
  }

  join() {
    const responseSuccess = (chatResponse) => {
        if (!chatResponse) {
          return;
        }
        clearInterval(this.state.joinInterval);
        // console.log(chatResponse);
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
      // clearInterval(this.state.joinInterval);
      if (jqxhr.status === 503) {
        this.updateText(
          "\n>>> Failed to connect some user :(\nPlz try again",
          true
        );
      } else {
        this.updateText(jqxhr, true);
      }
      // console.log(jqxhr);
    }

    const complete = () => {
      clearInterval(this.state.joinInterval);
    };
    // before using axios
    this.setState({btnJoinText: CANCEL});
    this.updateText("waiting anonymous user", false);
    this.setState({
      joinInterval: setInterval(() => {
        this.updateText(".", true);
      }, 1000)
    })

    chatApiController({
      url: '/api/user/chat-random/join', // TODO: have to check this url later
      method: 'get'
    })
    .then(responseSuccess)
    .catch(responseFail)
    .then(complete);
  }

  cancel() {
    chatApiController({
      url: '/api/user/chat-random/cancel', // TODO: have to check this url later
      method: 'get'
    })
    .then(() => {
      this.updateText("", false);
    })
    .catch((jqxhr) => {
      // console.log(jqxhr);
      alert("Error occur. please refresh");
    })
    .then(() => {
      this.disconnect();
      clearInterval(this.state.joinInterval);
      // console.log("clear intervale due to cancel : ", this.state.joinInterval);
    });
  }

  disconnect() {
    if (this.state.stompClient !== null) {
      this.state.stompClient.disconnect();
      this.setState({
        stompClient: null,
        chatStatus: WAIT,
        btnJoinText: JOIN,
        showModal: true
      });
      // console.log(this.state.ohterUserName)
      this.handleOpenModal(this.state);
    }
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

  vote = () => {

  }

  render() {
    return (
      <div>
        <div className="chatting-main-content">
          <Modal 
            isOpen={this.state.showModal} 
            onRequestClose={this.handleCloseModal} 
            appElement={document.getElementById('root')}
            >
            <div className="vote-container">
            <button onClick={this.handleCloseModal}>X</button>
            <h2>Vote {this.state.ohterUserName}'s personalities!</h2>
              <div className="option-box">
                  <input type="text" list='mbti-options'onChange={this.setMbtiType}/>
                  <datalist id="mbti-options">
                      {MBTI_TYPE.map((mbti,i) => {return (
                          <option value={mbti} key={i}/>
                      )})}
                  </datalist>
              </div>
              <div className="option-box">
              <input type="text" list='enneagram-options' onChange={this.setEnneagram}/>
                  <datalist id="enneagram-options">
                      {ENNEAGRAM_TYPE.map((enneagram,i) => {return (
                          <option value={enneagram} key={i}/>
                      )})}
                  </datalist>
              </div>
              <button onClick={this.vote}>Submit</button>
              </div>
          </Modal>
          <div>
            <textarea className="chat-main" value={this.state.chatContent} readOnly/>
          </div>
          <div>
            {
            this.state.chatStatus === WAIT ?
              (
                <div className="chat-bottom">
                    <button className="btn" onClick={this.handleBtnJoin}>
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
                    <button className="join-btn" onClick={this.sendMessage}>Send</button>
                    <button className="join-btn" onClick={this.cancel}>Cancel</button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        </div>
    );
  }
}

export default ChattingRandom;