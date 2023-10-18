import React, { Component } from "react";
import PropTypes from "prop-types";

class Messages extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    currentMember: PropTypes.object.isRequired,
  };

  render() {
    return (
      <ul className="Messages-list">
        {this.props.messages.map(this.renderMessage)}
      </ul>
    );
  }

  renderMessage = ({ id, member, text }) => {
    const messageFromMe = member.id === this.props.currentMember.id;
    const className = `Messages-message ${messageFromMe ? "currentMember" : ""}`;

    return (
      <li key={id} className={className}>
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };
}

export default Messages;
