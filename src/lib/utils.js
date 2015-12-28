import moment from 'moment'

// so we could use both immutable.js objects and regular objects
export function _get (object, key) {
  return typeof object.get === 'function' ? object.get(key) : object[key]
}

export function _length (object) {
  return typeof object.count === 'function' ? object.count() : object.length
}

export function arraysEqual (array1, array2) {
  return (_length(array1) === _length(array2)) && array1.every((element, index) => {
    return element === _get(array2, index)
  })
}

export function iterateTimes (start, end, unit, callback) {
  let time = moment(start).startOf(unit)

  while (time.valueOf() < end) {
    let nextTime = moment(time).add(1, `${unit}s`)
    callback(time, nextTime)
    time = nextTime
  }
}

export function getMinUnit (zoom, width) {
  let timeDividers = {
    second: 1000,
    minute: 60,
    hour: 60,
    day: 24,
    month: 30,
    year: 12
  }

  let minUnit = 'year'
  let breakCount = zoom
  const minCellWidth = 17

  Object.keys(timeDividers).some(unit => {
    breakCount = breakCount / timeDividers[unit]
    if (breakCount < width / minCellWidth) {
      minUnit = unit
      return true
    }
  })

  return minUnit
}

export function getNextUnit (unit) {
  let nextUnits = {
    second: 'minute',
    minute: 'hour',
    hour: 'day',
    day: 'month',
    month: 'year'
  }

  return nextUnits[unit] || ''
}

export function getParentPosition (element) {
  var xPosition = 0
  var yPosition = 0
  var first = true

  while (element) {
    xPosition += (element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft)
    yPosition += (element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop)
    element = element.offsetParent
    first = false
  }
  return { x: xPosition, y: yPosition }
}

export function createGradientPattern (lineHeight, color1, color2, borderColor) {
  if (borderColor) {
    if (!color2 || color1 === color2) {
      return `repeating-linear-gradient(to bottom, ` +
                    `${color1},` +
                    `${color1} ${lineHeight - 1}px,` +
                    `${borderColor} ${lineHeight - 1}px,` +
                    `${borderColor} ${lineHeight}px` +
              `)`
    } else {
      return `repeating-linear-gradient(to bottom, ` +
                    `${color1},` +
                    `${color1} ${lineHeight - 1}px,` +
                    `${borderColor} ${lineHeight - 1}px,` +
                    `${borderColor} ${lineHeight}px,` +
                    `${color2} ${lineHeight}px,` +
                    `${color2} ${lineHeight * 2 - 1}px,` +
                    `${borderColor} ${lineHeight * 2 - 1}px,` +
                    `${borderColor} ${lineHeight * 2}px` +
              `)`
    }
  } else {
    if (!color2 || color1 === color2) {
      return color1
    } else {
      return `repeating-linear-gradient(to bottom,${color1},${color1} ${lineHeight}px,${color2} ${lineHeight}px,${color2} ${lineHeight * 2}px)`
    }
  }
}
