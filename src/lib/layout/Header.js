import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import { iterateTimes, getNextUnit } from '../utils.js'

export default class Header extends Component {

  static propTypes = {
    // groups: React.PropTypes.array.isRequired,
    // width: React.PropTypes.number.isRequired,
    // lineHeight: React.PropTypes.number.isRequired,
    // headerBackgroundColor: React.PropTypes.string.isRequired,
    showPeriod: React.PropTypes.func.isRequired,
    canvasTimeStart: React.PropTypes.number.isRequired,
    canvasTimeEnd: React.PropTypes.number.isRequired,
    canvasWidth: React.PropTypes.number.isRequired,
    lineHeight: React.PropTypes.number.isRequired,
    visibleTimeStart: React.PropTypes.number.isRequired,
    visibleTimeEnd: React.PropTypes.number.isRequired,
    // visibleTimeEnd: React.PropTypes.number.isRequired,
    minUnit: React.PropTypes.string.isRequired,
    timeSteps: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired,
    fixedHeader: React.PropTypes.oneOf(['fixed', 'absolute', 'none']),
    zIndex: React.PropTypes.number,
    rctLabelClass: PropTypes.string,

    subHeaderLabelYearFormatShort: PropTypes.string.isRequired,
    subHeaderLabelYearFormatLong: PropTypes.string.isRequired,
    subHeaderLabelMonthFormatShort: PropTypes.string.isRequired,
    subHeaderLabelMonthFormatMedium: PropTypes.string.isRequired,
    subHeaderLabelMonthFormatLong: PropTypes.string.isRequired,
    subHeaderLabelDayFormatShort: PropTypes.string.isRequired,
    subHeaderLabelDayFormatMedium: PropTypes.string.isRequired,
    subHeaderLabelDayFormatMediumLong: PropTypes.string.isRequired,
    subHeaderLabelDayFormatLong: PropTypes.string.isRequired,
    subHeaderLabelHourFormatShort: PropTypes.string.isRequired,
    subHeaderLabelHourFormatLong: PropTypes.string.isRequired,
    subHeaderLabelMinuteFormatShort: PropTypes.string.isRequired,
    subHeaderLabelMinuteFormatLong: PropTypes.string.isRequired,

    headerLabelYearFormatShort: PropTypes.string.isRequired,
    headerLabelYearFormatLong: PropTypes.string.isRequired,
    headerLabelMonthFormatShort: PropTypes.string.isRequired,
    headerLabelMonthFormatMedium: PropTypes.string.isRequired,
    headerLabelMonthFormatMediumLong: PropTypes.string.isRequired,
    headerLabelMonthFormatLong: PropTypes.string.isRequired,
    headerLabelDayFormatShort: PropTypes.string.isRequired,
    headerLabelDayFormatLong: PropTypes.string.isRequired,
    headerLabelHourFormatShort: PropTypes.string.isRequired,
    headerLabelHourFormatMedium: PropTypes.string.isRequired,
    headerLabelHourFormatMediumLong: PropTypes.string.isRequired,
    headerLabelHourFormatLong: PropTypes.string.isRequired,
  }

  static defaultProps = {
    fixedHeader: 'none',
    zIndex: 11,
    rctLabelClass: '',
  }

  constructor (props) {
    super(props)
    this.state = {
      scrollTop: 0,
      componentTop: 0,
      touchTarget: null,
      touchActive: false
    }
  }

  scroll (e) {
    if (this.props.fixedHeader === 'absolute' && window && window.document) {
      const scroll = window.document.body.scrollTop
      this.setState({
        scrollTop: scroll
      })
    }
  }

  setComponentTop () {
    const viewportOffset = this.refs.header.getBoundingClientRect()
    this.setState({
      componentTop: viewportOffset.top
    })
  }

  componentDidMount () {
    this.setComponentTop()
    this.scroll()

    this.scrollEventListener = {
      handleEvent: (event) => {
        this.scroll()
      }
    }

    window.addEventListener('scroll', this.scrollEventListener)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollEventListener)
  }

  componentWillReceiveProps () {
    this.setComponentTop()
  }

  headerLabel (time, unit, width) {
    if (unit === 'year') {
      const {
        headerLabelYearFormatShort,
        headerLabelYearFormatLong,
      } = this.props;
      return time.format(
        width < 46
          ? headerLabelYearFormatShort
          : headerLabelYearFormatLong
      )
    } else if (unit === 'month') {
      const {
        headerLabelMonthFormatShort,
        headerLabelMonthFormatMedium,
        headerLabelMonthFormatMediumLong,
        headerLabelMonthFormatLong,
      } = this.props;
      return time.format(
        width < 65
          ? headerLabelMonthFormatShort
          : width < 75
            ? headerLabelMonthFormatMedium
            : width < 120
              ? headerLabelMonthFormatMediumLong
              : headerLabelMonthFormatLong
      );
    } else if (unit === 'day') {
      const {
        headerLabelDayFormatShort,
        headerLabelDayFormatLong,
      } = this.props;
      return time.format(
        width < 150
          ? headerLabelDayFormatShort
          : headerLabelDayFormatLong
      );
    } else if (unit === 'hour') {
      const {
        headerLabelHourFormatShort,
        headerLabelHourFormatMedium,
        headerLabelHourFormatMediumLong,
        headerLabelHourFormatLong,
      } = this.props;
      return time.format(
        width < 50
          ? headerLabelHourFormatShort
          : width < 130
            ? headerLabelHourFormatMedium
            : width < 150
              ? headerLabelHourFormatMediumLong
              : headerLabelHourFormatLong
      )
    } else {
      return time.format('LLL')
    }
  }

  subHeaderLabel (time, unit, width) {
    if (unit === 'year') {
      const {
        subHeaderLabelYearFormatShort,
        subHeaderLabelYearFormatLong,
      } = this.props;
      return time.format(
        width < 46
          ? subHeaderLabelYearFormatShort
          : subHeaderLabelYearFormatLong
      )
    } else if (unit === 'month') {
      const {
        subHeaderLabelMonthFormatShort,
        subHeaderLabelMonthFormatMedium,
        subHeaderLabelMonthFormatLong,
      } = this.props;
      return time.format(
        width < 37
          ? subHeaderLabelMonthFormatShort
          : width < 85
            ? subHeaderLabelMonthFormatMedium
            : subHeaderLabelMonthFormatLong
      )
    } else if (unit === 'day') {
      const {
        subHeaderLabelDayFormatShort,
        subHeaderLabelDayFormatMedium,
        subHeaderLabelDayFormatMediumLong,
        subHeaderLabelDayFormatLong,
      } = this.props;
      return time.format(
        width < 47
          ? subHeaderLabelDayFormatShort
          : width < 80
            ? subHeaderLabelDayFormatMedium
            : width < 120
              ? subHeaderLabelDayFormatMediumLong
              : subHeaderLabelDayFormatLong
      )
    } else if (unit === 'hour') {
      const {
        subHeaderLabelHourFormatShort,
        subHeaderLabelHourFormatLong,
      } = this.props;
      return time.format(
        width < 50
          ? subHeaderLabelHourFormatShort
          : subHeaderLabelHourFormatLong
      )
    } else if (unit === 'minute') {
      const {
        subHeaderLabelMinuteFormatShort,
        subHeaderLabelMinuteFormatLong,
      } = this.props;
      return time.format(
        width < 60
          ? subHeaderLabelMinuteFormatShort
          : subHeaderLabelMinuteFormatLong
      )
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
      visibleTimeStart, visibleTimeEnd, minUnit, timeSteps, fixedHeader,
      headerLabelGroupHeight, headerLabelHeight
    } = this.props
    const {
      scrollTop
    } = this.state
    const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
    const twoHeaders = minUnit !== 'year'

    // add the top header
    if (twoHeaders) {
      const nextUnit = getNextUnit(minUnit)

      iterateTimes(visibleTimeStart, visibleTimeEnd, nextUnit, timeSteps, (time, nextTime) => {
        const startTime = Math.max(visibleTimeStart, time.valueOf())
        const endTime = Math.min(visibleTimeEnd, nextTime.valueOf())
        const left = Math.round((startTime.valueOf() - canvasTimeStart) * ratio, -2)
        const right = Math.round((endTime.valueOf() - canvasTimeStart) * ratio, -2)
        const labelWidth = right - left
        const leftCorrect = fixedHeader === 'fixed' ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - 1 : 0

        timeLabels.push(
          <div key={`top-label-${time.valueOf()}`}
               href='#'
               className='rct-label-group'
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
      const leftCorrect = fixedHeader === 'fixed' ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - borderWidth + 1 : 0
      const rctLabelClasses = `${this.props.rctLabelClass} rct-label ${twoHeaders ? '' : 'rct-label-only'} ${firstOfType ? 'rct-first-of-type' : ''} `;

      timeLabels.push(
        <div key={`label-${time.valueOf()}`}
             href='#'
             className={rctLabelClasses}
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

    const { zIndex } = this.props

    let headerStyle = {
      height: `${headerLabelGroupHeight + headerLabelHeight}px`,
      lineHeight: `${lineHeight}px`
    }

    if (fixedHeader === 'fixed') {
      headerStyle.position = 'fixed'
      headerStyle.width = '100%'
      headerStyle.zIndex = zIndex
    } else if (fixedHeader === 'absolute') {
      let componentTop = this.state.componentTop
      if (scrollTop >= componentTop) {
        headerStyle.position = 'absolute'
        headerStyle.top = `${scrollTop - componentTop}px`
        headerStyle.width = `${canvasWidth}px`
        headerStyle.left = '0'
      }
    }

    return (
      <div ref='header' key='header' className='rct-header' onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onClick={this.periodClick} style={headerStyle}>
        {timeLabels}
      </div>
    )
  }
}

