import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  state = {
    text: "",
  };

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;

    if (text.trim()) {
      this.setState({ text: "" });
      this.props.onSendMessage(text);
      this.inputRef.current.focus();
    }
  };

  render() {
    const { text } = this.state;

    return (
      <div className="Input">
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            value={text}
            type="text"
            placeholder="Say something?"
            ref={this.inputRef}
            autoFocus
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

Input.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default Input;
