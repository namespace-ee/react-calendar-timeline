import React, { Component } from 'react'
import moment from 'moment'

import { iterateTimes, getNextUnit } from '../utils.js'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollTop: 0,
      componentTop: 0,
      touchTarget: null,
      touchActive: false
    }

    this.periodClick = this.periodClick.bind(this)
    this.touchStart = this.touchStart.bind(this)
    this.touchEnd = this.touchEnd.bind(this)
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
      return time.format(width < 46 ? 'YY' : 'YYYY')
    } else if (unit === 'month') {
      return time.format(width < 65 ? 'MM/YY' : width < 75 ? 'MM/YYYY' : width < 120 ? 'MMM YYYY' : 'MMMM YYYY')
    } else if (unit === 'day') {
      return time.format(width < 150 ? 'L' : 'dddd, LL')
    } else if (unit === 'hour') {
      return time.format(width < 50 ? 'HH' : width < 130 ? 'HH:00' : width < 150 ? 'L, HH:00' : 'dddd, LL, HH:00')
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
      return time.format(width < 47 ? 'D' : width < 80 ? 'dd D' : width < 120 ? 'ddd, Do' : 'dddd, Do')
    } else if (unit === 'hour') {
      return time.format(width < 50 ? 'HH' : 'HH:00')
    } else {
      return time.get(unit === 'day' ? 'date' : unit)
    }
  }

  periodClick (e) {
    const {time, unit} = e.target.dataset
    if (time && unit) {
      this.props.showPeriod(moment(time - 0), unit)
    }
  }

  touchStart (e) {
    if (e.touches.length === 1) {
      this.setState({
        touchTarget: e.target || e.touchTarget,
        touchActive: true
      })
    }
  }

  touchEnd (e) {
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
      visibleTimeStart, visibleTimeEnd, minUnit, fixedHeader,
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

      iterateTimes(visibleTimeStart, visibleTimeEnd, nextUnit, (time, nextTime) => {
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

    iterateTimes(canvasTimeStart, canvasTimeEnd, minUnit, (time, nextTime) => {
      const left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2)
      const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
      const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)
      const labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2)
      const borderWidth = firstOfType ? 2 : 1
      const leftCorrect = fixedHeader === 'fixed' ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - borderWidth + 1 : 0

      timeLabels.push(
        <div key={`label-${time.valueOf()}`}
             href='#'
             className={`rct-label ${twoHeaders ? '' : 'rct-label-only'} ${firstOfType ? 'rct-first-of-type' : ''} `}
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

Header.propTypes = {
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
  width: React.PropTypes.number.isRequired,
  fixedHeader: React.PropTypes.oneOf(['fixed', 'absolute', 'none']),
  zIndex: React.PropTypes.number
}
Header.defaultProps = {
  fixedHeader: 'none',
  zIndex: 11
}
