import PropTypes from 'prop-types'
import React, { Component } from 'react'
import moment from 'moment'

import { iterateTimes, getNextUnit } from '../utils.js'

export default class Header extends Component {
  static propTypes = {
    hasRightSidebar: PropTypes.bool.isRequired,
    showPeriod: PropTypes.func.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    minUnit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    headerLabelFormats: PropTypes.object.isRequired,
    subHeaderLabelFormats: PropTypes.object.isRequired,
    fixedHeader: PropTypes.oneOf(['fixed', 'sticky', 'none']),
    stickyOffset: PropTypes.number.isRequired,
    headerPosition: PropTypes.oneOf(['top', 'bottom', 'fixed'])
  }

  static defaultProps = {
    fixedHeader: 'sticky',
    stickyOffset: 0,
    headerPosition: 'top'
  }

  constructor (props) {
    super(props)
    this.state = {
      touchTarget: null,
      touchActive: false
    }
  }

  headerLabel (time, unit, width) {
    const { headerLabelFormats: f } = this.props

    if (unit === 'year') {
      return time.format(width < 46 ? f.yearShort : f.yearLong)
    } else if (unit === 'month') {
      return time.format(width < 65 ? f.monthShort : width < 75 ? f.monthMedium : width < 120 ? f.monthMediumLong : f.monthLong)
    } else if (unit === 'day') {
      return time.format(width < 150 ? f.dayShort : f.dayLong)
    } else if (unit === 'hour') {
      return time.format(width < 50 ? f.hourShort : width < 130 ? f.hourMedium : width < 150 ? f.hourMediumLong : f.hourLong)
    } else {
      return time.format(f.time)
    }
  }

  subHeaderLabel (time, unit, width) {
    const { subHeaderLabelFormats: f } = this.props

    if (unit === 'year') {
      return time.format(width < 46 ? f.yearShort : f.yearLong)
    } else if (unit === 'month') {
      return time.format(width < 37 ? f.monthShort : width < 85 ? f.monthMedium : f.monthLong)
    } else if (unit === 'day') {
      return time.format(width < 47 ? f.dayShort : width < 80 ? f.dayMedium : width < 120 ? f.dayMediumLong : f.dayLong)
    } else if (unit === 'hour') {
      return time.format(width < 50 ? f.hourShort : f.hourLong)
    } else if (unit === 'minute') {
      return time.format(width < 60 ? f.minuteShort : f.minuteLong)
    } else {
      return time.get(unit)
    }
  }

  periodClick = (e) => {
    const {time, unit} = e.target.dataset
    if (time && unit) {
      this.props.showPeriod(moment(time - 0), unit)
    }
  }

  touchStart = (e) => {
    if (e.touches.length === 1) {
      this.setState({
        touchTarget: e.target || e.touchTarget,
        touchActive: true
      })
    }
  }

  touchEnd = (e) => {
    if (!this.state.touchActive) {
      return this.resetTouchState()
    }

    var changedTouches = e.changedTouches[0]
    if (changedTouches) {
      var elem = document.elementFromPoint(changedTouches.pageX, changedTouches.pageY)
      if (elem !== this.state.touchTarget) {
        return this.resetTouchState()
      }
    }

    this.resetTouchState()
    this.periodClick(e)
  }

  resetTouchState () {
    this.setState({
      touchTarget: null,
      touchActive: false
    })
  }

  render () {
    let timeLabels = []
    const {
      canvasTimeStart, canvasTimeEnd, canvasWidth, lineHeight,
      visibleTimeStart, visibleTimeEnd, minUnit, timeSteps, fixedHeader, stickyOffset, headerPosition,
      headerLabelGroupHeight, headerLabelHeight, hasRightSidebar, width
    } = this.props

    const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
    const twoHeaders = minUnit !== 'year'

    const correctLeftPositions = fixedHeader === 'fixed' || (fixedHeader === 'sticky' && headerPosition === 'fixed')

    // add the top header
    if (twoHeaders) {
      const nextUnit = getNextUnit(minUnit)

      iterateTimes(visibleTimeStart, visibleTimeEnd, nextUnit, timeSteps, (time, nextTime) => {
        const startTime = Math.max(visibleTimeStart, time.valueOf())
        const endTime = Math.min(visibleTimeEnd, nextTime.valueOf())
        const left = Math.round((startTime.valueOf() - canvasTimeStart) * ratio, -2)
        const right = Math.round((endTime.valueOf() - canvasTimeStart) * ratio, -2)
        const labelWidth = right - left
        const leftCorrect = correctLeftPositions ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - 1 : 0

        timeLabels.push(
          <div key={`top-label-${time.valueOf()}`}
               href='#'
               className={`rct-label-group${hasRightSidebar ? ' rct-has-right-sidebar' : ''}`}
               data-time={time}
               data-unit={nextUnit}
               style={{
                 left: `${left + leftCorrect}px`,
                 width: `${labelWidth}px`,
                 height: `${headerLabelGroupHeight}px`,
                 lineHeight: `${headerLabelGroupHeight}px`,
                 cursor: 'pointer'
               }}>
            {this.headerLabel(time, nextUnit, labelWidth)}
          </div>
        )
      })
    }

    iterateTimes(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, (time, nextTime) => {
      const left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2)
      const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
      const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)
      const labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2)
      const borderWidth = firstOfType ? 2 : 1
      const leftCorrect = correctLeftPositions ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - borderWidth + 1 : 0

      timeLabels.push(
        <div key={`label-${time.valueOf()}`}
             href='#'
             className={`rct-label ${twoHeaders ? '' : 'rct-label-only'} ${firstOfType ? 'rct-first-of-type' : ''} ${(minUnit !== 'month' ? `rct-day-${time.day()}` : '')} `}
             data-time={time}
             data-unit={minUnit}
             style={{
               top: `${minUnit === 'year' ? 0 : headerLabelGroupHeight}px`,
               left: `${left + leftCorrect}px`,
               width: `${labelWidth}px`,
               height: `${(minUnit === 'year' ? headerLabelGroupHeight + headerLabelHeight : headerLabelHeight)}px`,
               lineHeight: `${(minUnit === 'year' ? headerLabelGroupHeight + headerLabelHeight : headerLabelHeight)}px`,
               fontSize: `${(labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10')}px`,
               cursor: 'pointer'
             }}>
          {this.subHeaderLabel(time, minUnit, labelWidth)}
        </div>
      )
    })

    let headerStyle = {
      height: `${headerLabelGroupHeight + headerLabelHeight}px`,
      lineHeight: `${lineHeight}px`
    }

    if (fixedHeader === 'fixed') {
      headerStyle.position = 'fixed'
      headerStyle.width = `${width}px`
    } else if (fixedHeader === 'sticky') {
      if (headerPosition === 'top') {
        // do nothing, keep at the top
      } else if (headerPosition === 'fixed') {
        headerStyle.position = 'fixed'
        headerStyle.top = stickyOffset
        headerStyle.width = `${width}px`
      } else if (headerPosition === 'bottom') {
        headerStyle.position = 'absolute'
        headerStyle.bottom = 0
        headerStyle.width = `${canvasWidth}px`
      }
    }

    return (
      <div ref='header' key='header' className='rct-header' onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onClick={this.periodClick} style={headerStyle}>
        {timeLabels}
      </div>
    )
  }
}
