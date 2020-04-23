import React from 'react';

export class EventLink extends React.Component {
  constructor(props) {
    super(props);

    this.aProps = {};
    for (let key in this.props) {
      this.aProps[key] = this.props[key];
    }
    this.aProps.target = '_blank';
  }

  render() {
    return (
      // eslint-disable-next-line
      <a {...this.aProps} />
    );
  }
}
