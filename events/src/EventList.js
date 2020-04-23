import React from 'react';

import { Row, Col } from 'react-bootstrap';
import { EventLink } from './utils/EventLink';
import moment from 'moment';
import _ from 'lodash';

import './events.css';

const meetupPrefix = "Every Saturday at 11am we have Meetups for everyone and anyone who cares about animals and making the world a better place! 🌍🐮🐷🐔🐭🦊🐠";
// this translates to https://directactioneverywhere.com/s/default_event_image.jpg in prod
const defaultEventImage = "/s/default_event_image.jpg"

// Picked arbitrarily by looking at summaries that were too short.
const minimumSummaryLength = 80;

// lessTextSummary takes an event description and returns a shorter
// description that's easy to scan.
function lessTextSummary(desc) {
  desc = desc.trim();
  if (desc.indexOf(meetupPrefix) === 0) {
    desc = desc.slice(meetupPrefix.length);
  }

  var lines = desc.trim().split('\n');

  var text = '';
  for (var i = 0; i < lines.length; i++) {
    if (i !== 0) {
      text += '\n\n';
    }

    text += lines[i];
    if (text.length >= minimumSummaryLength) {
      return text;
    }
  }

  return text;
}

class EventItem extends React.Component {
  findLocation(event) {
    let name = _.get(event, 'locationName', undefined)
    let street = _.get(event, 'locationAddress', undefined)
    let city = _.get(event, 'locationCity', undefined)
    let state = _.get(event, 'locationState', undefined)

    if (name) return name
    if (street && city && state) return street + ', ' + city + ', ' + state
    if (street && city) return street + ', ' + city
    if (street && state) return street + ', ' + state
    if (city && state) return city + ' ,' + state
    if (street) return street
    if (city) return city
    if (state) return state
    else return;
  }

  render() {
    let item = this.props.item;

    let actions = [
      <li key="attending">{item.attendingCount + " attending"}</li>
    ];

    let location = this.findLocation(item);
    if (location) {
      actions.push(<li key="location">{location}</li>);
    }

    return (
      <div className="eventItem">
        <Row>
          <Col md={4}>
            <div className="leftGutter">
              <div><EventLink href={item.href}><img className="eventImg" alt="logo" src={item.avatar} /></EventLink></div>
              <div><EventLink href={item.href}><button className="attendBtn">RSVP Here</button></EventLink></div>
            </div>
          </Col>

          <Col md={8}>
            <div className="eventDate">
              {moment(item.startTime).local().format("dddd, MMMM D") + " at " +
               moment(item.startTime).local().format("h:mm A") + " - " +
               moment(item.endTime).local().format("h:mm A")}
            </div>

            <h2 className="eventTitle">
              <EventLink href={item.href}>{item.title}</EventLink>
            </h2>

            <p className="eventDescription">{item.lessText}</p>

            <ul className="list-inline eventMisc">{actions}</ul>

          </Col>
        </Row>
      </div>
    );
  }
}

class EventList extends React.Component {
  render() {
    if (this.props.isLoading) {
      return null;
    }
    if (!this.props.eventList) {
      return (
        <div className="eventList">
          Could not load events
        </div>
      );
    }
    if (this.props.eventList.length === 0) {
      return (
        <div className="eventList">
          No events
        </div>
      );
    }

    let events = [];
    for (let i = 0; i < this.props.eventList.length; i++) {
      let event = this.props.eventList[i];

      let eventImage = defaultEventImage;
      if (event.Cover != null) {
        eventImage = event.Cover;
      }

      events.push(<EventItem item={{
        title: event.Name,
        startTime: event.StartTime,
        endTime: event.EndTime,
        attendingCount: event.AttendingCount,
        description: event.Description,
        lessText: lessTextSummary(event.Description),
        href: `https://www.facebook.com/${event.ID}`,
        avatar: eventImage,
        locationName: event.LocationName,
        locationAddress: event.LocationAddress,
        locationCity: event.LocationCity,
        locationState: event.LocationState
      }} key={i} />);
    }

    return (
      <div className="eventList">
        {events}
      </div>
    )
  }
}

export default EventList;