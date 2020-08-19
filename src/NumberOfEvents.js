import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    number: 32,
  };

  onNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
  };

  render() {
    return (
      <div className="NumOfEvents">
        <span className="NumOfEvents-label">Show </span>
        <input
          type="number"
          className="NumOfEvents-input"
          onChange={this.onNumberChanged}
          value={this.state.number}
        />
        <span className="NumOfEvents-label"> Events</span>
      </div>
    ); //return
  } //render
}

export default NumberOfEvents;
