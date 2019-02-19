import React from 'react'
import PropTypes from 'prop-types'
import { getNextUnit } from '../utility/calendar'
import { composeEvents } from '../utility/events'

class Interval extends React.PureComponent {
  static propTypes = {
    intervalRenderer: PropTypes.func,
    unit: PropTypes.string.isRequired,
    interval: PropTypes.object.isRequired,
    showPeriod: PropTypes.func.isRequired,
    intervalText: PropTypes.string.isRequired,
    primaryHeader: PropTypes.bool.isRequired,
    secondaryHeader: PropTypes.bool.isRequired,
    getIntervalProps: PropTypes.func.isRequired,
    props: PropTypes.object
  }

  getIntervalStyle = () => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        this.props.secondaryHeader && !this.props.primaryHeader
          ? 'rgb(240, 240, 240)'
          : 'initial',
      height: '100%',
      borderLeft: this.props.primaryHeader
        ? '1px solid #bbb'
        : '2px solid #bbb',
      borderRight: this.props.primaryHeader ? '1px solid #bbb' : 'none',
      borderBottom: '1px solid #bbb',
      color: this.props.primaryHeader ? '#fff' : 'initial',
      cursor: 'pointer',
      fontSize: '14px'
    }
  }

  onIntervalClick = () => {
    const { primaryHeader, interval, unit, showPeriod } = this.props
    if (primaryHeader) {
      const nextUnit = getNextUnit(unit)
      const newStartTime = interval.startTime.clone().startOf(nextUnit)
      const newEndTime = interval.startTime.clone().endOf(nextUnit)
      showPeriod(newStartTime, newEndTime)
    } else {
      showPeriod(interval.startTime, interval.endTime)
    }
  }

  getIntervalProps = (props={}) => {
    return {
      ...this.props.getIntervalProps({
        interval: this.props.interval,
        ...props
      }),
      onClick: composeEvents(this.onIntervalClick, props.onClick)
    }
  }

  render() {
    const { intervalText, interval, intervalRenderer, props } = this.props
    if (intervalRenderer)
      return intervalRenderer({
        getIntervalProps: this.getIntervalProps,
        intervalContext: {
          interval,
          intervalText
        }
      }, props)
    return (
      <div
        {...this.getIntervalProps({
          style: this.getIntervalStyle()
        })}
      >
        <span>{intervalText}</span>
      </div>
    )
  }
}

export default Interval
