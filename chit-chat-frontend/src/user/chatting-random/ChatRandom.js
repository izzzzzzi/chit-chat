import React, { Component } from "react";

const CHAT_URI = {
    JOIN: '/join',
}

class ChatRandom extends Component {
  constructor(props) {
      super(props);

      this.state = {
          currentUser: props.currentUser,
          content: "",
          messageInput: ""
      }
      console.log(this.state.currentUser);

      this.handleMessageInput = this.handleMessageInput.bind(this);
  }

  handleMessageInput(e) {
      this.setState({messageInput: e.target.value});
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
                <textarea value={this.state.messageInput}
                onChange={this.handleMessageInput}/>
            </div>
        </div>
    );
  }
}

export default ChatRandom;