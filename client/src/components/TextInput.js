import React, { Component } from 'react';

class TextInput extends Component {
  render() {
    return (
      <textarea
        name="input"
        cols="143"
        rows="10"
        placeholder="Type here..."
        value={this.props.value}
        onChange={this.props.handleInput}
        className="box left">
      </textarea>
    );
  }
}

export default TextInput;