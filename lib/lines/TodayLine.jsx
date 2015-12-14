import React, { Component } from 'react';

import { iterateTimes } from '../utils.js';

export default class TodayLine extends Component {
  constructor(props) {
    super(props);
  }

  // TODO: should currentTime come from a prop? probably...?
  render() {
    let currentTime = new Date().getTime();

    if (currentTime > this.props.originX && currentTime < this.props.maxX) {
      let ratio = this.props.canvasWidth / (this.props.maxX - this.props.originX),
          left = Math.round((currentTime - this.props.originX) * ratio),
          top = this.props.lineHeight * 2,
          height = this.props.lineCount * this.props.lineHeight;

      return <div style={{
               position: 'absolute',
               top: `${top}px`,
               left: `${left}px`,
               width: '2px',
               height: `${height}px`,
               background: 'red'
             }} />
    } else {
      return <div />
    }
  }
}
TodayLine.propTypes = {
  originX: React.PropTypes.number.isRequired,
  maxX: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  lineCount: React.PropTypes.number.isRequired,
  minUnit: React.PropTypes.string.isRequired
};
TodayLine.defaultProps = {
};
