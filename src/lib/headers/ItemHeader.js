import React from 'react'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import CustomHeader from './CustomHeader'
import PropTypes from 'prop-types'
import {
  getItemDimensions,
  stackGroup
} from '../utility/calendar'
import { _get } from '../utility/generic'

const passThroughPropTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  props: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemHeight: PropTypes.number,
  stackItems: PropTypes.bool,
  itemRenderer: PropTypes.func,
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
      items,
      itemHeight,
      itemRenderer,
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      stackItems
    } = this.props
    const itemDimensions = items.map(item => {
      return getItemDimensions({
        item,
        keys,
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        groupOrders: {},
        lineHeight: itemHeight,
        itemHeightRatio: 1
      })
    })

    const { groupHeight: height } = stackGroup(
      itemDimensions,
      stackItems,
      itemHeight,
      0
    ) 
    return (
      <CustomHeader>
        {({ getRootProps }) => {
          return (
            <div
              className={this.props.className}
              {...getRootProps({ style: this.getRootStyles(height) })}
            >
              {items.map(item => {
                const itemId = _get(item, keys.itemIdKey)
                const dimensions = itemDimensions.find(
                  itemDimension => itemDimension.id === itemId
                ).dimensions
                return (
                  <Item
                    key={itemId}
                    itemRenderer={itemRenderer}
                    props={this.props.props}
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

  getRootStyles(height) {
    return {
      ...this.props.style,
      height
    }
  }
}

class Item extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    timelineContext: PropTypes.shape({
      timelineWidth: PropTypes.number,
      visibleTimeStart: PropTypes.number,
      visibleTimeEnd: PropTypes.number,
      canvasTimeStart: PropTypes.number,
      canvasTimeEnd: PropTypes.number
    }).isRequired,
    itemContext: PropTypes.shape({
      dimensions: PropTypes.object,
      width: PropTypes.number
    }).isRequired,
    itemRenderer: passThroughPropTypes['itemRenderer'],
    itemHeight: passThroughPropTypes['itemHeight'],
    props: PropTypes.object,
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
    const { item, timelineContext, itemContext, props } = this.props
    return this.props.itemRenderer({
      item,
      timelineContext,
      itemContext,
      getRootProps: this.getRootProps,
      props,
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
