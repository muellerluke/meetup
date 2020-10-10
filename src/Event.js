import React, { Component } from "react";
import {
  PieChart, Pie, 
 Tooltip, ResponsiveContainer
 } from 'recharts';

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

  getData = () => {
    console.log(this.props.event.rsvp_limit - this.props.event.yes_rsvp_count)
    var data = [{
      value: this.props.event.yes_rsvp_count, name: "Reservations"
      },
    {
      value: this.props.event.rsvp_limit - this.props.event.yes_rsvp_count, name: "Free Slots"
    }];
    return data
  }

  render() {
    return (
      <div className="Event">
        <div className="event-Overview">
          <p className="event-Overview_title">{this.props.event.name}</p>
          <p className="event-Overview_time">{this.props.event.local_time}</p>
          <p className="event-Overview_date">{this.props.event.local_date}</p>
          <ResponsiveContainer height={200}>
            <PieChart>
              <Pie data={this.getData()} isAnimationActive={false} fill="#8884d8"/>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
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
