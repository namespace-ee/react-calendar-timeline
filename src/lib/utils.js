import moment from 'moment';

export function iterateTimes(start, end, unit, callback) {
  let times = [],
      time = moment(start).startOf(unit);

  while(time.valueOf() < end) {
    let nextTime = moment(time).add(1, `${unit}s`);
    callback(time, nextTime);
    time = nextTime;
  }
}

export function getMinUnit(zoom, width) {
  let timeDividers = {
    second: 1000,
    minute: 60,
    hour: 60,
    day: 24,
    month: 30,
    year: 12
  }

  let minUnit = 'year',
      breakCount = zoom,
      minCellWidth = 17;

  Object.keys(timeDividers).some(unit => {
    breakCount = breakCount / timeDividers[unit];
    if (breakCount < width / minCellWidth) {
      minUnit = unit;
      return true;
    }
  });

  return minUnit;
}

export function getNextUnit(unit) {
  let nextUnits = {
    second: 'minute',
    minute: 'hour',
    hour: 'day',
    day: 'month',
    month: 'year'
  }

  return nextUnits[unit] || '';
}

export function getParentPosition(element) {
  var xPosition = 0;
  var yPosition = 0;
  var first = true;

  while (element) {
    xPosition += (element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft);
    yPosition += (element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop);
    element = element.offsetParent;
    first = false;
  }
  return { x: xPosition, y: yPosition };
}
