import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

function generateRandomPersonName() {
  const firstNames = [
    "John", "Emma", "Liam", "Olivia", "Noah",
    "Ava", "William", "Sophia", "James", "Isabella",
    "Benjamin", "Mia", "Lucas", "Charlotte", "Henry"
  ];

  const lastNames = [
    "Smith", "Johnson", "Brown", "Williams", "Jones",
    "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris"
  ];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}:`;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      member: {
        username: generateRandomPersonName(),
        color: randomColor(),
      },
    };

    this.drone = new window.Scaledrone("u0IDwIGVoaGy9hGl", {
      data: this.state.member,
    });
  }

  componentDidMount() {
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  onSendMessage = (message) => {
    if (message === "") {
      alert("Say something?");
    } else {
      this.drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
        <h1>Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;