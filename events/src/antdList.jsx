import React from 'react';
import { Row, Col, List, Icon, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import _ from 'lodash';

// lessTextSummary takes an event description and returns a shorter
// description that's easy to scan.
function lessTextSummary(desc) {
  // Trim desc it can't start with a newline.
  desc = desc.trim();
  let newlineIndex = desc.indexOf('\n');
  if (newlineIndex === -1) {
    return desc;
  }
  return desc.slice(0, newlineIndex);
}

const IconText = ({ type, text, toolTipText, event }) => (
    <span>
        <Tooltip placement={"top"} title={toolTipText}>
            <Icon type={type} style={{ marginRight: 8 }} onMouseOver={event}/>
            {text}
        </Tooltip>
    </span>
);

class EventItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMore: false,
    };
  }
  findLocation(place) {
    let street = _.get(place, 'location.street', undefined)
    let city = _.get(place, 'location.city', undefined)
    let state = _.get(place, 'location.state', undefined)

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
        <IconText type="calendar" text={
          moment(item.startTime).format("dddd, MMMM D") + " at " +
            moment(item.startTime).format("h:mm A") + " - " +
            moment(item.endTime).format("h:mm A")
        }/>,
        <IconText type="like-o" text={item.interest_count} toolTipText={"Interested Count"}/>,
        <IconText type="check-circle-o" text={item.attendingCount} toolTipText={"Attending Count"}/>,
    ];

    let location = this.findLocation(item.place);
    if (location) {
      actions.push(<IconText type="environment-o" text={location} toolTipText={"Location"}/>);
    }

    return (
      <Row gutter={8}>
          <Col span={4}>
              <a target="_blank" href={item.href}><img className="eventImg" width={272} alt="logo" src={item.avatar} /></a>
          </Col>
          <Col span={20}>
              <List.Item
                  key={item.title}
                  className="eventDescriptionInAnt"
                  actions={actions}
              >

                  <h3 className="eventTitle"><a target="_blank" href={item.href}>{item.title}</a></h3>

                  {this.state.showMore ? <p className="read-more-target">{item.description}</p> : <p className="read-more-target">{item.lessText}</p>}
                  <button className="showMoreLessBtn" onClick={() => { this.setState({ showMore: !this.state.showMore }) }} >{this.state.showMore ? 'Show Less' : 'Show More'}</button>
              </List.Item>
          </Col>
      </Row>
    );
  }
}

class AntdList extends React.Component {
    constructor(props) {
        super(props);
        console.log("Inside the constructor of component AntList: ", this.props)
        this.listData = []
        this.state = {
            likeCount: 0,
            dislikeCount: 0,
            showMore: false
        }
    }
    componentWillReceiveProps(newProps) {
        console.log("inside the component will receive props of AntdList", newProps)
        console.log("de-structuring the received object", newProps.eventList)
        this.listData = []
        Object.keys(newProps.eventList).map((index) => {
            console.log("The key and index are: ", newProps.eventList[index])
            let eventBe = newProps.eventList[index]
            console.log("The eventBe is", eventBe)
            this.listData.unshift({
                title: eventBe.name,
                startTime: eventBe.start_time,
                endTime: eventBe.end_time,
                attendingCount: eventBe.attending_count,
                description: eventBe.description,
                lessText: lessTextSummary(eventBe.description),
                interest_count: eventBe.interested_count,
                href: `http://www.facebool.com/${eventBe.id}`,
                avatar: eventBe.cover.source,
                host: `Hosted by ${newProps["hostedBy"]}`,
                place: eventBe.place
            })
        })
    }
    render() {
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={this.listData}
                    renderItem={item => (
                        <EventItem
                          item={item}
                        />
                    )}
                />
            </div>
        )
    }
}

export default AntdList
