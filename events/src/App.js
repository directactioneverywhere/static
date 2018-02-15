import React from 'react'
import { getEvents, logHit }  from './utils/api'
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
        <EventList
          eventList={this.state.items}
          isLoading={this.state.isLoading} />
        <div>Find all of our events <a href="https://www.facebook.com/pg/directactioneverywheresf/events/">here</a>.</div>
      </div>

    )

  }
}

export default App;
