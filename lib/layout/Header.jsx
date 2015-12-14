import React, { Component } from 'react';

import { iterateTimes, getNextUnit } from '../utils.js';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  getMiddleLine(lineHeight, canvasWidth) {
    return <div key='label-line'
                style={{
                  position: 'absolute',
                  top: `${lineHeight}px`,
                  left: 0,
                  width: `${canvasWidth}px`,
                  height: `1px`,
                  lineHeight: `1px`,
                  background: '#ccc',
                  overflow: 'hidden'
                }}/>
  }

  headerLabel(time, unit, width) {
    if (unit == 'year') {
      return time.format(width < 46 ? 'YY' : 'YYYY');
    } else if (unit == 'month') {
      return time.format(width < 65 ? 'MM/YY' : width < 75 ? 'MM/YYYY' : width < 120 ? 'MMM YYYY' : 'MMMM YYYY');
    } else if (unit == 'day') {
      return time.format(width < 150 ? 'L' : 'LL');
    } else if (unit == 'hour') {
      return time.format(width < 50 ? 'HH' : width < 130 ? 'HH:00' : width < 150 ? 'L, HH:00' : 'LL, HH:00');
    } else {
      return time.format('LLL');
    }
  }

  subHeaderLabel(time, unit, width) {
    if (unit === 'year') {
      return time.format(width < 46 ? 'YY' : 'YYYY');
    } else if (unit === 'month') {
      return time.format(width < 37 ? 'MM' : width < 85 ? 'MMM' : 'MMMM');
    } else if (unit === 'day') {
      return time.format(width < 42 ? 'D' : 'Do');
    } else if (unit === 'hour') {
      return time.format(width < 50 ? 'HH' : 'HH:00');
    } else {
      return time.get(unit == 'day' ? 'date' : unit);
    }
  }

  periodClick(time, unit) {
    this.props.showPeriod(time, unit);
  }

  render() {
    let timeLabels = [],
        originX = this.props.originX,
        maxX = this.props.maxX,
        canvasWidth = this.props.canvasWidth,
        lineHeight = this.props.lineHeight,
        minUnit = this.props.minUnit,
        width = this.props.width,
        zoom = this.props.zoom,
        ratio = canvasWidth / (maxX - originX);

    iterateTimes(originX, maxX, minUnit, (time, nextTime) => {
      let left = Math.round((time.valueOf() - originX) * ratio, -2),
          minUnitValue = time.get(minUnit == 'day' ? 'date' : minUnit),
          firstOfType = minUnitValue == (minUnit == 'day' ? 1 : 0),
          labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2),
          color = firstOfType || labelWidth > 100 ? '#aaa' : '#ccc',
          width = firstOfType ? 2 : 1;

      timeLabels.push(
        <div key={`label-${time.valueOf()}`}
             onClick={this.periodClick.bind(this, time, minUnit)}
             style={{
               position: 'absolute',
               top: `${minUnit == 'year' ? 0 : lineHeight}px`,
               left: `${left}px`,
               width: `${labelWidth}px`,
               height: `${(minUnit == 'year' ? 2 : 1) * lineHeight}px`,
               lineHeight: `${(minUnit == 'year' ? 2 : 1) * lineHeight}px`,
               fontSize: labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10',
               overflow: 'hidden',
               textAlign: 'center',
               cursor: 'pointer'}}>
          {this.subHeaderLabel(time, minUnit, labelWidth)}
        </div>
      );
    });

    if (minUnit != 'year') {
      let minTime = this.props.minTime,
          maxTime = this.props.maxTime,
          nextUnit = getNextUnit(minUnit);

      timeLabels.push(this.getMiddleLine(lineHeight, canvasWidth));

      iterateTimes(minTime, maxTime, nextUnit, (time, nextTime) => {
        let startTime = Math.max(minTime, time.valueOf()),
            endTime = Math.min(maxTime, nextTime.valueOf()),
            left = Math.round((startTime.valueOf() - originX) * ratio, -2),
            right = Math.round((endTime.valueOf() - originX) * ratio, -2),
            labelWidth = right - left;

        timeLabels.push(
          <div key={`top-label-${time.valueOf()}`}
               onClick={this.periodClick.bind(this, time, nextUnit)}
               style={{
                 position: 'absolute',
                 top: 0,
                 left: `${left}px`,
                 width: `${labelWidth}px`,
                 height: `${lineHeight-1}px`,
                 lineHeight: `${lineHeight-1}px`,
                 fontSize: '14',
                 overflow: 'hidden',
                 textAlign: 'center',
                 cursor: 'pointer'}}>
            {this.headerLabel(time, nextUnit, labelWidth)}
          </div>
        );
      });
    }

    let headerColor = this.props.headerColor,
        headerBackgroundColor = this.props.headerBackgroundColor;

    return (
      <div key='timeLabels' style={{
                              height: `${lineHeight * 2}px`,
                              lineHeight: `${lineHeight}px`,
                              margin: '0',
                              color: headerColor,
                              background: headerBackgroundColor}}>
                            {timeLabels}
      </div>
    );
  }
}

Header.propTypes = {
  // groups: React.PropTypes.array.isRequired,
  // width: React.PropTypes.number.isRequired,
  // lineHeight: React.PropTypes.number.isRequired,
  // headerColor: React.PropTypes.string.isRequired,
  // headerBackgroundColor: React.PropTypes.string.isRequired,
  // gradientBackground: React.PropTypes.string.isRequired
};
Header.defaultProps = {
};
