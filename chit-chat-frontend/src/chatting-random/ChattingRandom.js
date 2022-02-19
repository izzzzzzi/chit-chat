import React, { Component } from "react";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stomp-websocket';
import './ChattingRandom.css';
import { API_BASE_USER_URL, ACCESS_TOKEN } from "../constants";
import axios from 'axios'

const JOIN = "Join";
const CANCEL = "Cancel";
const WAIT = "wait";

const chatApiController = axios.create({
  baseURL: API_BASE_USER_URL,
});

chatApiController.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = `Bearer ${localStorage.getItem((ACCESS_TOKEN))}`;
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
      currentUser: props.currentUser,
      btnJoinText: JOIN,
      chatContent: "",
      chatMessageInput: "",
      chatStatus: WAIT,
      socket: null,
      stompClient: null,
      sessionId: null,
      chatRoomId: null,
      joinInterval: null
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
  }

  handleChatMessageInput(event) {
    this.setState({chatMessageInput: event.target.value});
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
          if (result.senderSessionId === this.state.sessionId) {
            message += "[Me] : ";
          } else {
            message += "[Anonymous] : ";
          }
          message += result.message + "\n";
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
      // let options = {debug: false, protocols: Stomp.VERSIONS.supportedProtocols()};
      // 1. SockJS를 내부에 들고 있는 client를 내어준다.
      this.setState({stompClient: Stomp.over(socket)});
      const headers = {
        Authorization : `Bearer ${localStorage.getItem((ACCESS_TOKEN))}`,
        chatRoomId: this.state.chatRoomId
      };
      this.state.stompClient.connect(headers, (frame) => {
        console.log('conencted :' + frame);
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
        console.log(chatResponse);
        if (chatResponse.responseResult === "SUCCESS") {
          this.setState({
            sessionId: chatResponse.sessionId,
            chatRoomId: chatResponse.chatRoomId
          })
          this.setState({chatStatus: "chat"}); // TODO: Modify updateTemplate function
          this.updateText(">> Connected anonymous user :)\n", false);
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
      console.log(jqxhr);
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
      console.log(jqxhr);
      alert("Error occur. please refresh");
    })
    .then(() => {
      clearInterval(this.state.joinInterval);
      console.log("clear intervale due to cancel : ", this.state.joinInterval);
    });
  }

  disconnect() {
    if (this.state.stompClient !== null) {
      this.state.stompClient.disconnect();
      this.setState({
        stompClient: null,
        chatStatus: WAIT
      });
    }
  }

  sendMessage() {
    console.log("send message.. >> ");
    const message = this.state.chatMessageInput;

    if (message == "") {
      alert("input message!");
    } else {
      var payload = {
      messageType: "CHAT",
      senderSessionId: this.state.sessionId,
      message: message,
    };
    this.state.stompClient.send(
      "/app/chat.message/" + this.state.chatRoomId,
      {},
      JSON.stringify(payload)
    );
    this.setState({chatMessageInput: ""});
    }
  }

  render() {
    return (
      <div>
        <div className="chatting-main-content">
          <div className="row">
            <textarea value={this.state.chatContent} readOnly>
              {this.state.chatContent}
            </textarea>
          </div>
          <div className="row" id="chat-action-div">
            {
            this.state.chatStatus === WAIT ?
              (
                <div>
                  <button onClick={this.handleBtnJoin}>
                    {this.state.btnJoinText}
                  </button>
                </div>
              )
            :
              (
                <div>
                  <input type="text" 
                  onChange={this.handleChatMessageInput} 
                  onKeyPress={(e)=> {if(e.key === 'Enter') this.sendMessage()}}
                  value={this.state.chatMessageInput}/>
                  <span onClick={this.sendMessage}>Send</span>
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