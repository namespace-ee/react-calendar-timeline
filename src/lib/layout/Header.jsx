import React, { Component } from 'react'

import { iterateTimes, getNextUnit, createGradientPattern } from '../utils.js'

export default class Header extends Component {
  constructor (props) {
    super(props)
  }

  headerLabel (time, unit, width) {
    if (unit === 'year') {
      return time.format(width < 46 ? 'YY' : 'YYYY')
    } else if (unit === 'month') {
      return time.format(width < 65 ? 'MM/YY' : width < 75 ? 'MM/YYYY' : width < 120 ? 'MMM YYYY' : 'MMMM YYYY')
    } else if (unit === 'day') {
      return time.format(width < 150 ? 'L' : 'LL')
    } else if (unit === 'hour') {
      return time.format(width < 50 ? 'HH' : width < 130 ? 'HH:00' : width < 150 ? 'L, HH:00' : 'LL, HH:00')
    } else {
      return time.format('LLL')
    }
  }

  subHeaderLabel (time, unit, width) {
    if (unit === 'year') {
      return time.format(width < 46 ? 'YY' : 'YYYY')
    } else if (unit === 'month') {
      return time.format(width < 37 ? 'MM' : width < 85 ? 'MMM' : 'MMMM')
    } else if (unit === 'day') {
      return time.format(width < 42 ? 'D' : 'Do')
    } else if (unit === 'hour') {
      return time.format(width < 50 ? 'HH' : 'HH:00')
    } else {
      return time.get(unit === 'day' ? 'date' : unit)
    }
  }

  periodClick (time, unit) {
    this.props.showPeriod(time, unit)
  }

  render () {
    let timeLabels = []
    const {
      originX, maxX, canvasWidth, lineHeight,
      minTime, maxTime, minUnit,
      headerColor, borderColor, fixedHeader
    } = this.props
    const ratio = canvasWidth / (maxX - originX)
    const lowerHeaderColor = this.props.lowerHeaderColor || headerColor
    const twoHeaders = minUnit !== 'year'

    iterateTimes(originX, maxX, minUnit, (time, nextTime) => {
      const left = Math.round((time.valueOf() - originX) * ratio, -2)
      const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
      const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)
      const labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2)
      const borderWidth = firstOfType ? 2 : 1
      const color = twoHeaders ? lowerHeaderColor : headerColor
      const leftCorrect = fixedHeader ? Math.round((originX - minTime) * ratio) - borderWidth + 1 : 0

      timeLabels.push(
        <div key={`label-${time.valueOf()}`}
             onClick={this.periodClick.bind(this, time, minUnit)}
             style={{
               position: 'absolute',
               top: `${minUnit === 'year' ? 0 : lineHeight}px`,
               left: `${left + leftCorrect}px`,
               width: `${labelWidth}px`,
               height: `${(minUnit === 'year' ? 2 : 1) * lineHeight}px`,
               lineHeight: `${(minUnit === 'year' ? 2 : 1) * lineHeight}px`,
               fontSize: labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10',
               overflow: 'hidden',
               textAlign: 'center',
               cursor: 'pointer',
               borderLeft: this.props.fixedHeader ? `${borderWidth}px solid ${borderColor}` : '',
               color: color}}>
          {this.subHeaderLabel(time, minUnit, labelWidth)}
        </div>
      )
    })

    // add the top header
    if (twoHeaders) {
      const nextUnit = getNextUnit(minUnit)

      iterateTimes(minTime, maxTime, nextUnit, (time, nextTime) => {
        const startTime = Math.max(minTime, time.valueOf())
        const endTime = Math.min(maxTime, nextTime.valueOf())
        const left = Math.round((startTime.valueOf() - originX) * ratio, -2)
        const right = Math.round((endTime.valueOf() - originX) * ratio, -2)
        const labelWidth = right - left
        const leftCorrect = this.props.fixedHeader ? Math.round((originX - minTime) * ratio) - 1 : 0

        timeLabels.push(
          <div key={`top-label-${time.valueOf()}`}
               onClick={this.periodClick.bind(this, time, nextUnit)}
               style={{
                 position: 'absolute',
                 top: 0,
                 left: `${left + leftCorrect}px`,
                 width: `${labelWidth}px`,
                 height: `${lineHeight - 1}px`,
                 lineHeight: `${lineHeight - 1}px`,
                 fontSize: '14',
                 overflow: 'hidden',
                 textAlign: 'center',
                 cursor: 'pointer',
                 borderLeft: fixedHeader ? `2px solid ${borderColor}` : '',
                 color: headerColor}}>
            {this.headerLabel(time, nextUnit, labelWidth)}
          </div>
        )
      })
    }

    const { headerBackgroundColor, lowerHeaderBackgroundColor } = this.props

    const headerBackground = twoHeaders
            ? createGradientPattern(lineHeight, headerBackgroundColor, lowerHeaderBackgroundColor, this.props.borderColor)
            : createGradientPattern(lineHeight * 2, headerBackgroundColor, null, this.props.borderColor)

    let headerStyle = {
      height: `${lineHeight * 2}px`,
      lineHeight: `${lineHeight}px`,
      margin: '0',
      background: headerBackground
    }

    if (this.props.fixedHeader) {
      headerStyle.position = 'fixed'
      headerStyle.width = '100%'
      headerStyle.zIndex = this.props.zIndex
    }

    return (
      <div key='timeLabels' style={headerStyle}>
        {timeLabels}
      </div>
    )
  }
}

Header.propTypes = {
  // groups: React.PropTypes.array.isRequired,
  // width: React.PropTypes.number.isRequired,
  // lineHeight: React.PropTypes.number.isRequired,
  // headerBackgroundColor: React.PropTypes.string.isRequired,
  showPeriod: React.PropTypes.func.isRequired,
  originX: React.PropTypes.number.isRequired,
  maxX: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  minTime: React.PropTypes.number.isRequired,
  maxTime: React.PropTypes.number.isRequired,
  // maxTime: React.PropTypes.number.isRequired,
  minUnit: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  headerColor: React.PropTypes.string.isRequired,
  lowerHeaderColor: React.PropTypes.string.isRequired,
  headerBackgroundColor: React.PropTypes.string.isRequired,
  lowerHeaderBackgroundColor: React.PropTypes.string.isRequired,
  borderColor: React.PropTypes.string.isRequired,
  fixedHeader: React.PropTypes.bool,
  zIndex: React.PropTypes.number
}
Header.defaultProps = {
  fixedHeader: false,
  zIndex: 11
}
