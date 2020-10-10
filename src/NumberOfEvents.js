import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 32,
    };
    // this.updateEvents = this.updateEvents.bind(this);
  }

  onNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
    this.props.updateEvents(null, null, value);
    if (value < 1) {
      this.setState({ infoText: "Please enter a valid number" });
    } else {
      this.setState({ infoText: "" });
    }
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
        <ErrorAlert text={this.state.infoText} />
      </div>
    ); //return
  } //render
}

export default NumberOfEvents;
