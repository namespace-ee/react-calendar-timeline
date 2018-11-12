import React from 'react'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import CustomHeader from './CustomHeader'
import PropTypes from 'prop-types'
import {
  stackItems,
  calculateDimensions,
  stack,
  nostack,
  getGroupOrders
} from '../utility/calendar'
import { _get } from '../utility/generic'

const groups = [
  {
    bgColor: '#cdfc94',
    id: '1',
    rightTitle: 'Green',
    title: 'Zion'
  }
]

class ItemHeader extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    keys: PropTypes.object.isRequired
  }

  render() {
    const {keys, items} = this.props
    const order = getGroupOrders(groups, keys)
    console.log(this.props.items, order)
    const itemDimensions = this.props.items
      .map(item =>
        calculateDimensions({
          itemTimeStart: _get(item, this.props.keys.itemTimeStartKey),
          itemTimeEnd: _get(item, this.props.keys.itemTimeEndKey),
          canvasTimeStart: this.props.canvasTimeStart,
          canvasTimeEnd: this.props.canvasTimeEnd,
          canvasWidth: this.props.canvasWidth,
          dragTime: null,
          isDragging: false,
          isResizing: false,
          resizeTime: null,
          resizingEdge: null
        })
      )
      .map(item => ({
        id: _get(item, this.props.keys.itemIdKey),
        dimensions: {
          ...item,
          order: 0,
          top: null
        }
      }))

    const stackingMethod = true ? stack : nostack
    //Get a new array of groupOrders holding the stacked items
    const { height, groupHeights, groupTops } = stackingMethod(
      itemDimensions,
      order,
      60,
      groups
    )
    console.log(height, groupHeights, groupTops)
    return (
      <CustomHeader>
        {({ getRootProps }) => {
          return <div {...getRootProps({ style: { height: 30 } })}>ahmad</div>
        }}
      </CustomHeader>
    )
  }
}

const ItemHeaderWrapper = ({ style, className, props, items }) => (
  <TimelineStateConsumer>
    {({ getTimelineState }) => {
      const timelineState = getTimelineState()
      return (
        <ItemHeader
          style={style}
          className={className}
          items={items}
          props={props}
          canvasTimeEnd={timelineState.canvasTimeEnd}
          canvasTimeStart={timelineState.canvasTimeStart}
          visibleTimeStart={timelineState.visibleTimeStart}
          visibleTimeEnd={timelineState.visibleTimeEnd}
          canvasWidth={timelineState.canvasWidth}
          keys={timelineState.keys}
        />
      )
    }}
  </TimelineStateConsumer>
)

ItemHeaderWrapper.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  props: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ItemHeaderWrapper
