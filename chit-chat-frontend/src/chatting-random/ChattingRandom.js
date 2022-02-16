import React, { Component } from "react";
// import * as $ from 'jquery';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stomp-websocket';
import './ChattingRandom.css';
import { API_BASE_URL } from "../constants";
import axios from 'axios'
// import Handlebars from 'handlebars'

const chatApiController = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});


const JOIN = "Join";
const CANCEL = "Cancel";
const WAIT = "wait";

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

  handleBtnJoin(event) {
    var type = this.state.btnJoinText;
    if (type == JOIN) {
      this.join();
    } else if (type == CANCEL) {
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
      function (resultObj) {
        console.log(">> success to receive message\n", resultObj.body);
        var result = JSON.parse(resultObj.body);
        var message = "";

        if (result.messageType == "CHAT") {
          if (result.senderSessionId === this.state.sessionId) {
            message += "[Me] : ";
          } else {
            message += "[Anonymous] : ";
          }

          message += result.message + "\n";
        } else if (result.messageType == "DISCONNECTED") {
          message = ">> Disconnected user :(";
          this.disconnect();
        }
        this.updateText(message, true);
      }
    );
  }

  connectAndSubscribe() {
    if (
      this.state.stompClient == null ||
      !this.state.stompClient.connected
    ) {
      var socket = new SockJS("/chat-websocket");
      this.setState({stompClient: Stomp.over(socket)});
      this.stompClient.connect(
        { chatRoomId: this.state.chatRoomId },
        function (frame) {
          console.log("Connected: " + frame);
          this.subscribeMessage();
        }
      );
    } else {
      this.subscribeMessage();
    }
  }

  join() {
    const responseSuccess = (chatResponse) => {
      console.log("Success to receive join result. \n", chatResponse);
        if (!chatResponse) {
          return;
        }
  
        clearInterval(this.state.joinInterval);
        if (chatResponse.responseResult == "SUCCESS") {
          this.setState({
            sessionId: chatResponse.sessionId,
            chatRoomId: chatResponse.chatRoomId
          })
          this.setState({chatStatus: "chat"}); // TODO: Modify updateTemplate function
          this.updateText(">> Connected anonymous user :)\n", false);
          this.connectAndSubscribe();
        } else if (chatResponse.responseResult == "CANCEL") {
          this.updateText(">> Success to cancel", false);
          this.setState({btnJoinText: JOIN});
        } else if (chatResponse.responseResult == "TIMEOUT") {
          this.updateText(">> Can`t find user :(", false);
          this.setState({btnJoinText: JOIN});
        }
    };

    const responseFail = (jqxhr) => {
      clearInterval(this.state.joinInterval);
      if (jqxhr.status == 503) {
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
    this.setState({joinInterval: setInterval(() => {
      this.updateText(".", true);
    }, 1000)});

    chatApiController({
      url: '/join', // TODO: have to check this url later
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(responseSuccess)
    .catch(responseFail)
    .then(complete);
  }

  cancel() {
    chatApiController({
      url: '/cancel', // TODO: have to check this url later
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
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
    console.log("Check.. >>\n", this.state.stompClient);
    console.log("send message.. >> ");
    const message = this.state.chatMessageInput;
    this.setState({chatMessageInput: ""});

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
  }

  render() {
    return (
      <div>
        <div className="chatting-main-content">
          <div class="row">
            <textarea value={this.state.chatContent} readonly>
              {this.state.chatContent}
            </textarea>
          </div>
          <div class="row" id="chat-action-div">
          </div>
        </div>
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
                  <textarea value={this.state.chatMessageInput} onChnage={this.handleChatMessageInput} />
                  <span>Send</span>
                </div>
              )
        }
      </div>
    );
  }
}

export default ChattingRandom;