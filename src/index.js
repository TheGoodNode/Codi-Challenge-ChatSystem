import React, { Component } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

import "./styles.css";
import "./led.css";
import MessageCard from "./messageCard.js";

import { CreateTime } from "./utils/utils.js";

class App extends Component {
  state = {
    isConnected: false,
    id: null,
    peeps: [],
    text: "",
    messages: []
  };
  socket = null;

  componentWillMount() {
    this.socket = io("https://codi-server.herokuapp.com");

    this.socket.on("connect", () => {
      this.setState({ isConnected: true });
    });

    this.socket.on("disconnect", () => {
      this.setState({ isConnected: false });
    });

    this.socket.on("youare", answer => {
      this.setState({ id: answer.id });
    });

    this.socket.on("peeps", answer => {
      this.setState({ peeps: answer });
    });

    this.socket.on("next", message_from_server =>
      console.log(message_from_server)
    );

    this.socket.on("room", old_messages => {
      console.log(old_messages);
      this.setState({ messages: old_messages });
    });

    this.socket.emit("whoami");
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  sendMessage = e => {
    const MessageInfo = {
      id: this.state.id,
      name: "Willy_The_Chilly",
      text: this.state.text,
      date: this.CreateTime,
    };
    e.preventDefault();
    if (this.state.text !== "") {
      this.socket.emit("message", MessageInfo);
      this.setState({ text: "" });

      const data = [...this.state.messages];
      data.push(MessageInfo);
      this.setState({ messages: data });
    } else {
      return;
    }
  };

  componentWillUnmount() {
    this.socket.close();
    this.socket = null;
  }

  renderOnlineLight = () => {
    return (
      <div class="led-box">
        <div class="led-green"></div>
      </div>
    );
  };

  renderOfflineLight = () => {
    return (
      <div class="led-box">
        <div class="led-red"></div>
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="status">
            <div >Status:</div>
            {this.state.isConnected
              ? this.renderOnlineLight()
              : this.renderOfflineLight()}
          </div>
        </div>
        {/* <div>Online peeps: {this.state.peeps.length}</div> */}

        <div className="messagesArea">
          {this.state.messages.map(peep => (
            <MessageCard
              key={Math.random() * 1000}
              id={peep.id}
              name={peep.name}
              text={peep.text}
              date={peep.date}
            />
          ))}
        </div>
        <div >
          <form className="chatArea" onSubmit={this.sendMessage}>
          <button className="sendbtn"type="submit">
            Send
          </button>
          <input
            className="textArea"
            name="text"
            onChange={this.handleChange}
            value={this.state.text}
          />
          </form>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// Impressive. We're going to top it up a notch.
//The server will send you a simple, random, addition.
// You will need to answer correctly.
// You cannot put the answer in a button, because if you do,
//the page will refresh, and you will lose your ID. Try to
//solve it! The API to get an equation is to send "addition"

// Welcome! This is where you send your chat messages for others to read. A message is an object composed of:
//     1. a 'text' property containing the text
//     2. an 'id' property containing your user id
//     3. a 'name' property containing your desired user name
// That's it! Send an object with all those three things and other people will see your messages.
// Ah! I almost forgot. *You* also need to see the messages. To receive them, you need to listen for the message "room_message". Good luck!
