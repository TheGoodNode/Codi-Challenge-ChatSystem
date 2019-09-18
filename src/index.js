import React, { Component } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

import "./styles.css";

import MessageCard from "./messageCard.js";

class App extends Component {
  state = {
    isConnected: false,
    id: null,
    peeps: [],
    text: "",
    Messages: []
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

    /** this will be useful way, way later **/
    this.socket.on("room", old_messages => {
      this.setState({ Messages: old_messages });
    });
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  sendMessage = e => {
    e.preventDefault();
    if (this.state.text !== "") {
      this.socket.emit("message", {
        id: this.state.id,
        name: "Willy_The_Chilly",
        text: this.state.text
      });
      this.setState({ text: "" });
    } else {
      return;
    }
  };

  componentWillUnmount() {
    this.socket.emit("whoami");
    this.socket.close();
    this.socket = null;
  }

  render() {
    console.log();
    return (
      <div className="App">
        <div>
          status: {this.state.isConnected ? "connected" : "disconnected"}
        </div>
        <div>Online peeps: {this.state.peeps.length}</div>

        <div>
          {this.state.Messages.map(peep => (
            <MessageCard
              key={Math.random() * 1000}
              id={peep.id}
              name={peep.name}
              text={peep.text}
            />
          ))}
        </div>
        <div className="chatArea">
          <button className="sendbtn" onClick={this.sendMessage}>
            Send
          </button>
          <input
            className="textArea"
            name="text"
            onChange={this.handleChange}
          />
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
