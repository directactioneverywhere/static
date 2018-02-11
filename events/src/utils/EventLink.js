import React from 'react';
import { logClickLink } from './api.js';

export class EventLink extends React.Component {
  constructor(props) {
    super(props);

    this.aProps = {};
    this.analyticsData = {};
    for (let key in this.props) {
      if (key === 'href') {
        this.aProps[key] = this.props[key];
        this.analyticsData[key] = this.props[key];
      } else if (key === 'analytics-type') {
        this.analyticsData[key] = this.props[key];
      } else {
        this.aProps[key] = this.props[key];
      }
    }

    this.aProps.target = '_blank';

    if (!('href' in this.analyticsData)) {
      throw new Error("Must initialize EventLink with 'href' prop");
    }
    if (!('analytics-type' in this.analyticsData)) {
      throw new Error("Must initialize EventLink with 'analytics-type' prop");
    }

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    logClickLink(this.analyticsData.href, this.analyticsData['analytics-type']);
  }

  render() {
    return (
      <a {...this.aProps} onClick={this.onClickHandler} />
    );
  }
}
