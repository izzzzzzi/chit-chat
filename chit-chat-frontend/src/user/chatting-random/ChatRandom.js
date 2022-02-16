import React, { Component } from "react";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stomp-websocket';

const CHAT_URI = {
    JOIN: '/join',
}

class ChatRandom extends Component {
  constructor(props) {
      super(props);
      this.state = {
          currentUser: props.currentUser,
          content: "",
          messageInput: "",
          chatStatus: "wait",
          // btnJoinText: "",
          btnJoinText: "Join!",
          stompClient: null,
          sessionId: null,
          chatRoomId : null,
          joinInterval: null
      }

      this.handleMessageInput = this.handleMessageInput.bind(this);
      this.handleBtnJoin = this.handleBtnJoin.bind(this);
      this.join = this.join.bind(this);
      this.updateText = this.updateText.bind(this);
      this.cancel = this.cancel.bind(this);
      this.disconnect = this.disconnect.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
      this.test = this.test.bind(this);
  }

  handleMessageInput = (e) => {
      this.setState({messageInput: e.target.value});
   }

   test = () => {
      console.log("test");
   }

   join = () => {
      this.setState({btnJoinText: "Cancel"});
      this.updateText("waiting random user", false);
      this.setState( {joinInterval: setInterval(() =>{
          this.updateText("..", true);
          }, 1000)});
      console.log("join function !")
   }

   handleBtnJoin = (e) => {
      // const type = this.state.btnJoinText;
       const type = "Join";
      if (type == "Join") {
          this.join();
      } else if (type == "Cancel") {
          this.cancel();
      }
  }

    updateText = (message, add) => {
      if (add) {
          this.setState({content: this.state.content + message})
      } else {
          this.setState({content: message})
      }
    }

    cancel = () => {
      this.setState({updateText: ""})
    }

    disconnect = () => {
      if (this.state.stompClient !== null) {
          this.state.stompClient.disconnect();
          this.setState({stompClient: null, chatStatus: "wait"});
      }
    }

    sendMessage = () => {
      console.log("send message!");
      const message = this.state.messageInput;
      this.setState({messageInput: ""});

      const payload = {
          messageType: "CHAT",
          senderSessionId: this.state.sessionId,
          message: message,
      };

      this.state.stompClient.send(
          "/app/chat.message/" + this.state.chatRoomId, {}, JSON.stringify(payload)
      );
    }

  render() {
    return (
        <div>
          <div>
              <textarea value={this.state.content} readOnly>
                  {this.state.content}
              </textarea>
          </div>
            <div>
                {this.state.chatStatus === "wait" ?
                    (<div>
                        <button onClick={this.handleBtnJoin}>
                            {this.state.btnJoinText}
                        </button>
                    </div>)
                :
                    (
                        <div>
                            <textarea value={this.state.messageInput} onChange={this.handleMessageInput}/>
                            <span>Send</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
  }
}

export default ChatRandom;