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
          color = this.props.borderColor || (firstOfType || labelWidth > 100 ? '#aaa' : '#ccc'),
          width = firstOfType ? 2 : 1;

      lines.push(
        <div key={`line-${time.valueOf()}`}
             style={{
               position: 'absolute',
               top: `${lineHeight * 2}px`,
               left: `${left}px`,
               width: `1px`,
               height: (lineCount * lineHeight)+'px',
               borderLeft: `${width}px solid ${color}`
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
  minUnit: React.PropTypes.string.isRequired,
  borderColor: React.PropTypes.string
};
VerticalLines.defaultProps = {
};
