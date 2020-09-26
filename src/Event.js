import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false,
    detailsButtonText: "Details",
    events: [],
  };

  handleShowDetails = () => {
    if (this.state.showDetails === false) {
      this.setState({ showDetails: true, detailsButtonText: "Close" });
    } else {
      this.setState({ showDetails: false, detailsButtonText: "Details" });
    }
  };
  render() {
    return (
      <div className="Event">
        <div className="event-Overview">
          <p className="event-Overview_title">{this.props.event.name}</p>
          <p className="event-Overview_time">{this.props.event.local_time}</p>
          <p className="event-Overview_date">{this.props.event.local_date}</p>
        </div>
        {this.state.showDetails && (
          <div className="event-Details">
            <p className="event-Details_description">
              {this.props.event.description}
            </p>
          </div>
        )}
        <button
          className="event-Details_button"
          onClick={this.handleShowDetails}
        >
          {this.state.detailsButtonText}
        </button>
      </div>
    );
  }
}

export default Event;
