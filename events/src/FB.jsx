import React from 'react'
import { getEvents }  from './utils/ApiResponse'
import SelectEvent from "./SelectEvent";
import './events.css';
import AntdList from './antdList';

class FB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : {},
            hostedBy: 'Berkeley Animal Rights Center'
        }
        this.showEvents = this.showEvents.bind(this)
    }
    showEvents(value) {
        console.log("inside the show events", value)
        getEvents()
            .then((items) => {
                this.setState({ items: {...items}, hostedBy: value.name })
            })
    }
    componentDidMount() {
        console.log("Inside the component did mount of FB")
        getEvents() // Load the default DxE page events
            .then((items) => {
                console.log("the type of value is: ", typeof items, items)
                this.setState({ items: {...items} })
        })
    }
    render() {
        console.log("Inside the render function of the component FB");
        return (
            <div>
                <SelectEvent onSelect={this.showEvents}/>
                <AntdList eventList={this.state.items} hostedBy={this.state.hostedBy}/>
            </div>

        )

    }
}

export default FB
