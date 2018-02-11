import React from 'react'
import { getEvents, logHit }  from './utils/api'
import './events.css';
import AntdList from './antdList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items : {},
      hostedBy: '',
    }
    this.showEvents = this.showEvents.bind(this)
  }
  showEvents(value) {
    getEvents()
      .then((items) => {
        this.setState({ items: {...items}, hostedBy: value.name })
      })
  }
  componentDidMount() {
    getEvents() // Load the default DxE page events
      .then((items) => {
        this.setState({ items: {...items} })
      })

    // Log a hit to indicate that the component has loaded.
    logHit();
  }
  render() {
    return (
      <div>
        <h1 className="pageTitle">SF Bay Events</h1>
        <AntdList eventList={this.state.items} hostedBy={this.state.hostedBy}/>
      </div>

    )

  }
}

export default App;
