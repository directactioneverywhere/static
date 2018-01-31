import React from 'react'
import './events.css'

class SelectEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
         events: [
             {
                 id: 171904216553096,
                 name: "Berkeley Animal Rights Center"
             },
             {
                 id: 153660568381244,
                 name: "DxE Los Angeles"
             },
             {
                 id: 515856298444724,
                 name: "Direct Action Everywhere"
             },
             {
                 id: 1377014279263790,
                 name: "DxE - SF Bay Area"
             }
         ]
        }
    }

    render() {
        let counter = 0;
        return (
            <div className={`events`}>
                {
                    this.state.events.map((value) => {
                       return (
                           <li className={`event${counter++}`} key={value.id} onClick={this.props.onSelect.bind(null, {
                               id: value.id,
                               name: value.name
                           })}>{value.name}</li>
                       )
                    })
                }
            </div>

        )
    }
}

export default SelectEvent
