import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { iterateTimes } from '../utils.js';

export default class VerticalLines extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    let lines = [],
        originX = this.props.originX,
        maxX = this.props.maxX,
        minUnit = this.props.minUnit,
        ratio = this.props.canvasWidth / (maxX - originX),
        lineCount = this.props.lineCount,
        lineHeight = this.props.lineHeight;

    iterateTimes(originX, maxX, minUnit, (time, nextTime) => {
      let left = Math.round((time.valueOf() - originX) * ratio, -2),
          minUnitValue = time.get(minUnit == 'day' ? 'date' : minUnit),
          firstOfType = minUnitValue == (minUnit == 'day' ? 1 : 0),
          labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2),
          color = firstOfType || labelWidth > 100 ? '#aaa' : '#ccc',
          width = firstOfType ? 2 : 1;

      lines.push(
        <div key={`line-${time.valueOf()}`}
             style={{
               position: 'absolute',
               top: `${firstOfType || minUnit == 'year' ? 0 : lineHeight}px`,
               left: `${left - (width == 2 ? 1 : 0)}px`,
               width: `${width}px`,
               height: ((lineCount + (firstOfType || minUnit == 'year' ? 2 : 1)) * lineHeight)+'px',
               background: color
             }} />);

    });

    return (
      <div>
        {lines}
      </div>
    );
  }
}

VerticalLines.propTypes = {
  originX: React.PropTypes.number.isRequired,
  maxX: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  lineCount: React.PropTypes.number.isRequired,
  minUnit: React.PropTypes.string.isRequired
};
VerticalLines.defaultProps = {
};
