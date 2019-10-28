import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { _get } from '../utility/generic'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import memoize from 'memoize-one'

const defaultContextState = {
  getLeftOffsetFromDate: () => {
    console.warn('"getLeftOffsetFromDate" default func is being used')
  },
  getDateFromLeftOffsetPosition: () => {
    console.warn('"getDateFromLeftOffsetPosition" default func is being used')
  },
  getItemAbsoluteDimensions: () => {
    console.warn('"getItemAbsoluteDimensions" default func is being used')
  },
  getItemDimensions: () => {
    console.warn('"getItemDimensions" default func is being used')
  }
}

const HelpersContext = React.createContext(defaultContextState)

const { Consumer, Provider } = HelpersContext

class HelpersContextProviderCore extends PureComponent {
  static propTypes = {
    getLeftOffsetFromDate: PropTypes.func.isRequired,
    getDateFromLeftOffsetPosition: PropTypes.func.isRequired,
    groupsWithItemsDimensions: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    keys: PropTypes.object.isRequired,
    groupHeights: PropTypes.array.isRequired,
    groupTops: PropTypes.array.isRequired
  }

  getGroupByItemId = itemId => {
    const { items, keys } = this.props
    const item = items.find(i => _get(i, keys.itemIdKey) === itemId)
    const groupId = _get(item, keys.itemGroupKey)
    return groupId
  }

  /**
   * create new instance of getItemDimensions of dependant props have changed (similar to useCallback)
   */
  getItemDimensionsCreator = memoize(
    (groupsWithItemsDimensions, getGroupByItemId) => itemId => {
      const groupId = getGroupByItemId(itemId)
      const group = groupsWithItemsDimensions[groupId]
      const itemDimensions = group.itemDimensions.find(i => i.id === itemId)
      if (itemDimensions) return itemDimensions.dimensions
      else return undefined
    }
  )

  /**
   * create new instance of getItemAbsoluteDimensions of dependant props have changed (similar to useCallback)
   */
  getItemAbsoluteDimensionsCreator = memoize(
    (groupHeights, groupsWithItemsDimensions, getGroupByItemId) => itemId => {
      const groupId = getGroupByItemId(itemId)
      const group = groupsWithItemsDimensions[groupId]
      const itemDimensions = group.itemDimensions.find(i => i.id === itemId)
      if (!itemDimensions) return
      const groupIndex = group.index
      const groupTop = groupHeights.reduce((acc, height, index) => {
        if (index < groupIndex) return acc + height
        else return acc
      }, 0)
      return {
        left: itemDimensions.dimensions.left,
        top: groupTop + itemDimensions.dimensions.top,
        width: itemDimensions.dimensions.width
      }
    }
  )

  /**
   * create new instance of getGroupDimensionsCreator of dependant props have changed (similar to useCallback)
   */
  getGroupDimensionsCreator = memoize((
    groupsWithItemsDimensions,
    groupHeights,
    groupTops
  ) => groupId => {
    const group = groupsWithItemsDimensions[groupId]
    if (!group) return
    const index = group.index
    const height = groupHeights[index]
    const top = groupTops[index]
    return {
      height,
      top
    }
  })

  render() {
    const { children } = this.props
    return (
      <Provider
        value={{
          getLeftOffsetFromDate: this.props.getLeftOffsetFromDate,
          getDateFromLeftOffsetPosition: this.props
            .getDateFromLeftOffsetPosition,
          getItemDimensions: this.getItemDimensionsCreator(
            this.props.groupsWithItemsDimensions,
            this.getGroupByItemId
          ),
          getItemAbsoluteDimensions: this.getItemAbsoluteDimensionsCreator(
            this.props.groupHeights,
            this.props.groupsWithItemsDimensions,
            this.getGroupByItemId
          ),
          getGroupDimensions: this.getGroupDimensionsCreator(
            this.props.groupsWithItemsDimensions,
            this.props.groupHeights,
            this.props.groupTops
          )
        }}
      >
        {children}
      </Provider>
    )
  }
}

export class HelpersContextProvider extends PureComponent {
  render() {
    return (
      <TimelineStateConsumer>
        {({ getLeftOffsetFromDate, getDateFromLeftOffsetPosition }) => {
          return (
            <HelpersContextProviderCore
              getLeftOffsetFromDate={getLeftOffsetFromDate}
              getDateFromLeftOffsetPosition={getDateFromLeftOffsetPosition}
              {...this.props}
            />
          )
        }}
      </TimelineStateConsumer>
    )
  }
}

export const HelpersConsumer = Consumer
export default HelpersContext
