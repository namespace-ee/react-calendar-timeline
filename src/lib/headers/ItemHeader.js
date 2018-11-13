import React from 'react'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import CustomHeader from './CustomHeader'
import PropTypes from 'prop-types'
import {
  calculateDimensions,
  stack,
  nostack,
  getGroupOrders
} from '../utility/calendar'
import { _get } from '../utility/generic'

const groups = [
  {
    id: '1'
  }
]

const passThroughPropTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  props: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemHeight: PropTypes.number,
  stackItems: PropTypes.bool,
  itemRenderer: PropTypes.func
}

class ItemHeader extends React.PureComponent {
  static propTypes = {
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    keys: PropTypes.object.isRequired,
    ...passThroughPropTypes
  }

  static defaultProps = {
    itemHeight: 30,
    stackItems: false,
    itemRenderer: ({ item, getRootProps }) => {
      return (
        <div
          {...getRootProps({
            style: {
              color: 'white',
              background: 'rgb(33, 150, 243)',
              border: '1px solid rgb(26, 111, 179)'
            }
          })}
        >
          {item.title}
        </div>
      )
    }
  }

  getStateAndHelpers = (props, item, itemDimensions) => {
    const {
      canvasWidth: timelineWidth,
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd,
      itemHeight
    } = props
    return {
      timelineContext: {
        timelineWidth,
        visibleTimeStart,
        visibleTimeEnd,
        canvasTimeStart,
        canvasTimeEnd
      },
      item,
      itemContext: {
        dimensions: itemDimensions,
        width: itemDimensions.width
      },
      itemHeight
    }
  }

  render() {
    const {
      keys,
      items: itemWithNoIds,
      stackItems,
      itemHeight,
      itemRenderer
    } = this.props
    const items = itemWithNoIds.map(item => ({ ...item, group: '1' }))
    const order = getGroupOrders(groups, keys)
    const itemDimensions = this.props.items.map(item => {
      const itemDimension = calculateDimensions({
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

      return {
        id: _get(item, keys.itemIdKey),
        dimensions: {
          ...itemDimension,
          order: 0,
          top: null,
          stack: stackItems,
          height: itemHeight,
          isDragging: false
        }
      }
    })

    const stackingMethod = stackItems ? stack : nostack
    //Get a new array of groupOrders holding the stacked items
    const { height } = stackingMethod(itemDimensions, order, itemHeight, groups)

    return (
      <CustomHeader>
        {({ getRootProps }) => {
          return (
            <div {...getRootProps({ style: { height: height } })}>
              {items.map(item => {
                const itemId = _get(item, keys.itemIdKey)
                const dimensions = itemDimensions.find(
                  itemDimension => itemDimension.id === itemId
                ).dimensions
                return (
                  <Item
                    key={itemId}
                    itemRenderer={itemRenderer}
                    {...this.getStateAndHelpers(this.props, item, dimensions)}
                  />
                )
              })}
            </div>
          )
        }}
      </CustomHeader>
    )
  }
}

class Item extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    timelineContext: PropTypes.objectOf({
      timelineWidth: PropTypes.number,
      visibleTimeStart: PropTypes.number,
      visibleTimeEnd: PropTypes.number,
      canvasTimeStart: PropTypes.number,
      canvasTimeEnd: PropTypes.number
    }).isRequired,
    itemContext: PropTypes.objectOf({
      dimensions: PropTypes.object,
      width: PropTypes.number
    }).isRequired,
    itemRenderer: passThroughPropTypes['itemRenderer'],
    itemHeight: passThroughPropTypes['itemHeight']
  }

  getStyles = (style = {}, dimensions, itemHeight) => {
    return {
      position: 'absolute',
      left: dimensions.left,
      top: dimensions.top,
      width: dimensions.width,
      height: itemHeight,
      ...style
    }
  }

  getRootProps = (props = {}) => {
    const { style, ...rest } = props
    return {
      style: this.getStyles(
        style,
        this.props.itemContext.dimensions,
        this.props.itemHeight
      ),
      rest
    }
  }

  render() {
    const { item, timelineContext, itemContext } = this.props
    return this.props.itemRenderer({
      item,
      timelineContext,
      itemContext,
      getRootProps: this.getRootProps
    })
  }
}

const ItemHeaderWrapper = ({
  style,
  className,
  props,
  items,
  stackItems,
  itemHeight,
  itemRenderer
}) => (
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
          stackItems={stackItems}
          itemHeight={itemHeight}
          itemRenderer={itemRenderer}
        />
      )
    }}
  </TimelineStateConsumer>
)

ItemHeaderWrapper.propTypes = {
  ...passThroughPropTypes
}

export default ItemHeaderWrapper
