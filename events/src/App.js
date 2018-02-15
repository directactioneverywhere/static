import React from 'react';
import { getEvents, logHit }  from './utils/api';
import { EventLink } from './utils/EventLink';
import './thirdparty/bootstrap/css/bootstrap.min.css';
import EventList from './EventList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items: [],
    }
  }

  componentDidMount() {
    getEvents() // Load the default DxE page events
      .then((items) => {
        this.setState({
          items: items,
          isLoading: false,
        })
      })

    // Log a hit to indicate that the component has loaded.
    logHit();
  }

  render() {
    return (
      <div className="container">
        <h1 className="pageTitle">SF Bay Area Events</h1>
        <p>
          Not in the Bay Area? Find your chapter <EventLink analytics-type="find-chapter" href="https://www.directactioneverywhere.com/get-active-main#find-a-chapter">here</EventLink>.
        </p>
        <EventList
          eventList={this.state.items}
          isLoading={this.state.isLoading} />
        <div>Find all of our events <EventLink analytics-type="all-events" href="https://www.facebook.com/pg/directactioneverywheresf/events/">here</EventLink>.</div>
      </div>

    )

  }
}

export default App;
