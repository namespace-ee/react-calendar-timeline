import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'
import { defaultGroupRowRenderer } from './defaultGroupRowRenderer'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import { TimelineHeadersConsumer } from '../headers/HeadersContext'

const passThroughPropTypes = {
    onDoubleClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    rowRenderer: PropTypes.func,
}

class GroupRow extends Component {
  static propTypes = {
    ...passThroughPropTypes,
    getLeftOffsetFromDate: PropTypes.func.isRequired,
    getTimelineState: PropTypes.func.isRequired,
    timeSteps: PropTypes.object.isRequired,
  }

  static defaultProps = {
    rowRenderer: defaultGroupRowRenderer
  }

  render() {
    const {
      onContextMenu,
      onDoubleClick,
      isEvenRow,
      style,
      onClick,
      clickTolerance,
      horizontalLineClassNamesForGroup,
      group,
      rowRenderer,
      getLeftOffsetFromDate,
      getTimelineState,
      timeSteps,
    } = this.props

    let classNamesForGroup = [];
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group);
    }

    const timelineState = getTimelineState()
    const timelineContext = {
      timelineWidth: timelineState.width,
      visibleTimeStart: timelineState.visibleTimeStart,
      visibleTimeEnd: timelineState.visibleTimeEnd,
      canvasTimeStart: timelineState.canvasTimeStart,
      canvasTimeEnd: timelineState.canvasTimeEnd,
      timelineUnit: timelineState.timelineUnit,
      timeSteps: timeSteps
    }

    return (
      <PreventClickOnDrag clickTolerance={clickTolerance} onClick={onClick}>
        {rowRenderer({
          onContextMenu,
          onDoubleClick,
          className: (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : ''),
          style,
          group,
          timelineContext,
          getLeftOffsetFromDate
        })}
      </PreventClickOnDrag>
    )
  }
}

const GroupRowWrapper = (props) => {
  return (
    <TimelineStateConsumer>
      {({ getLeftOffsetFromDate, getTimelineState }) => (
        <TimelineHeadersConsumer>
          {({ timeSteps }) => (
            <GroupRow getLeftOffsetFromDate={getLeftOffsetFromDate} getTimelineState={getTimelineState} timeSteps={timeSteps} {...props} />
          )}
        </TimelineHeadersConsumer>
      )}
    </TimelineStateConsumer>
  )
}

export default GroupRowWrapper
