import React from 'react';
import { getEvents }  from './utils/api';
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
  }

  render() {
    return (
      <div className="container">
        <h1 className="pageTitle">Upcoming Events (Online & SF Bay)</h1>
        <h4 className="overTitle">
           Not in the Bay Area? Find your chapter <EventLink analytics-type="find-chapter" href="https://www.directactioneverywhere.com/get-active-main#find-a-chapter">here</EventLink>.
        </h4>
        <EventList
          eventList={this.state.items}
          isLoading={this.state.isLoading} />
        <div>Find all of our events <EventLink href="https://www.facebook.com/pg/directactioneverywheresf/events/">here</EventLink>.</div>
      </div>

    )

  }
}

export default App;
