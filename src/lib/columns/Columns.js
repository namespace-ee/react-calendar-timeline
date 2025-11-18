import PropTypes from 'prop-types'
import React, { Component } from 'react'
import moment from 'moment'

import { iterateTimes, getGroupOrders } from '../utility/calendar'
import { _get } from '../utility/generic'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'

const passThroughPropTypes = {
  canvasTimeStart: PropTypes.number.isRequired,
  canvasTimeEnd: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  lineCount: PropTypes.number.isRequired,
  minUnit: PropTypes.string.isRequired,
  timeSteps: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  verticalLineClassNamesForTime: PropTypes.func
}

class Columns extends Component {
  static propTypes = {
    ...passThroughPropTypes,
    getLeftOffsetFromDate: PropTypes.func.isRequired,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    keys: PropTypes.object,
    dimensionItems: PropTypes.array,
    groupHeights: PropTypes.array,
    groupTops: PropTypes.array,
    emptyCellLabelRenderer: PropTypes.func
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.minUnit === this.props.minUnit &&
      nextProps.timeSteps === this.props.timeSteps &&
      nextProps.height === this.props.height &&
      nextProps.verticalLineClassNamesForTime ===
        this.props.verticalLineClassNamesForTime &&
      nextProps.items === this.props.items &&
      nextProps.groups === this.props.groups &&
      nextProps.dimensionItems === this.props.dimensionItems &&
      nextProps.groupHeights === this.props.groupHeights &&
      nextProps.groupTops === this.props.groupTops &&
      nextProps.emptyCellLabelRenderer === this.props.emptyCellLabelRenderer
    )
  }

  // Check if a time range overlaps with any items in a group
  isTimeRangeEmpty(groupId, timeStart, timeEnd) {
    const { items, keys } = this.props
    
    if (!items || !keys) {
      return false
    }

    const { itemGroupKey, itemTimeStartKey, itemTimeEndKey } = keys

    // Get all items for this group
    const groupItems = Array.isArray(items) 
      ? items.filter(item => _get(item, itemGroupKey) === groupId)
      : Object.values(items).filter(item => _get(item, itemGroupKey) === groupId)

    // Check if any item overlaps with this time range
    return !groupItems.some(item => {
      const itemStart = _get(item, itemTimeStartKey)
      const itemEnd = _get(item, itemTimeEndKey)
      
      // Check for overlap: item starts before timeEnd and ends after timeStart
      return itemStart < timeEnd && itemEnd > timeStart
    })
  }

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      minUnit,
      timeSteps,
      height,
      verticalLineClassNamesForTime,
      getLeftOffsetFromDate,
      groups,
      groupHeights,
      groupTops,
      emptyCellLabelRenderer
    } = this.props
    const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)

    let lines = []
    let emptyCellLabels = []

    iterateTimes(
      canvasTimeStart,
      canvasTimeEnd,
      minUnit,
      timeSteps,
      (time, nextTime) => {
        const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
        const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)

        let classNamesForTime = []
        if (verticalLineClassNamesForTime) {
          classNamesForTime = verticalLineClassNamesForTime(
            time.unix() * 1000, // turn into ms, which is what verticalLineClassNamesForTime expects
            nextTime.unix() * 1000 - 1
          )
        }

        // TODO: rename or remove class that has reference to vertical-line
        const classNames =
          'rct-vl' +
          (firstOfType ? ' rct-vl-first' : '') +
          (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute'
            ? ` rct-day-${time.day()} `
            : ' ') +
          classNamesForTime.join(' ')

        const left = getLeftOffsetFromDate(time.valueOf())
        const right = getLeftOffsetFromDate(nextTime.valueOf())
        lines.push(
          <div
            key={`line-${time.valueOf()}`}
            className={classNames}
            style={{
              pointerEvents: 'none',
              top: '0px',
              left: `${left}px`,
              width: `${right - left}px`,
              height: `${height}px`
            }}
          />
        )

        // Check for empty cells and render labels if renderer is provided
        if (emptyCellLabelRenderer && groups && groupHeights && groupTops && this.props.keys) {
          const timeStartMs = time.valueOf()
          const timeEndMs = nextTime.valueOf()
          const cellWidth = right - left
          const groupOrders = getGroupOrders(groups, this.props.keys)

          // Check each group for empty cells
          groups.forEach((group) => {
            const groupId = _get(group, this.props.keys.groupIdKey)
            const groupOrderData = groupOrders[groupId]
            
            if (groupOrderData && this.isTimeRangeEmpty(groupId, timeStartMs, timeEndMs)) {
              const groupOrder = groupOrderData.index
              const groupTop = groupTops[groupOrder] || 0
              const groupHeight = groupHeights[groupOrder] || height
              
              const label = emptyCellLabelRenderer({
                time: moment(timeStartMs),
                timeEnd: moment(timeEndMs),
                group: group,
                groupOrder: groupOrder
              })

              if (label) {
                emptyCellLabels.push(
                  <div
                    key={`empty-cell-${groupOrder}-${timeStartMs}`}
                    className="rct-empty-cell-label"
                    style={{
                      position: 'absolute',
                      top: `${groupTop}px`,
                      left: `${left}px`,
                      width: `${cellWidth}px`,
                      height: `${groupHeight}px`,
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1
                    }}
                  >
                    {label}
                  </div>
                )
              }
            }
          })
        }
      }
    )

    return (
      <div className="rct-vertical-lines">
        {lines}
        {emptyCellLabels}
      </div>
    )
  }
}

const ColumnsWrapper = ({ ...props }) => {
  return (
    <TimelineStateConsumer>
      {({ getLeftOffsetFromDate }) => (
        <Columns getLeftOffsetFromDate={getLeftOffsetFromDate} {...props} />
      )}
    </TimelineStateConsumer>
  )
}

ColumnsWrapper.defaultProps = {
  ...passThroughPropTypes
}

export default ColumnsWrapper
