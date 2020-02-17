import PropTypes from 'prop-types'
import React, { Component } from 'react'
import moment from 'moment'

import Items from './items/Items'
import Sidebar from './layout/Sidebar'
import Columns from './columns/Columns'
import GroupRows from './row/GroupRows'
import ScrollElement from './scroll/ScrollElement'
import MarkerCanvas from './markers/MarkerCanvas'
import windowResizeDetector from '../resize-detector/window'

import {
  getMinUnit,
  getNextUnit,
  calculateTimeForXPosition,
  calculateScrollCanvas,
  getCanvasBoundariesFromVisibleTime,
  getCanvasWidth,
  stackTimelineItems
} from './utility/calendar'
import { _get, _length } from './utility/generic'
import {
  defaultKeys,
  defaultTimeSteps,
  defaultHeaderLabelFormats,
  defaultSubHeaderLabelFormats
} from './default-config'
import { TimelineStateProvider } from './timeline/TimelineStateContext'
import { TimelineMarkersProvider } from './markers/TimelineMarkersContext'
import { TimelineHeadersProvider } from './headers/HeadersContext'
import TimelineHeaders from './headers/TimelineHeaders'
import DateHeader from './headers/DateHeader'
import SidebarHeader from './headers/SidebarHeader'

export default class ReactCalendarTimeline extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    sidebarWidth: PropTypes.number,
    rightSidebarWidth: PropTypes.number,
    dragSnap: PropTypes.number,
    minResizeWidth: PropTypes.number,
    stickyHeader: PropTypes.bool,
    lineHeight: PropTypes.number,
    itemHeightRatio: PropTypes.number,

    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,

    clickTolerance: PropTypes.number,

    canChangeGroup: PropTypes.bool,
    canMove: PropTypes.bool,
    canResize: PropTypes.oneOf([true, false, 'left', 'right', 'both']),
    useResizeHandle: PropTypes.bool,
    canSelect: PropTypes.bool,

    stackItems: PropTypes.bool,

    traditionalZoom: PropTypes.bool,

    itemTouchSendsClick: PropTypes.bool,

    horizontalLineClassNamesForGroup: PropTypes.func,

    onItemMove: PropTypes.func,
    onItemResize: PropTypes.func,
    onItemClick: PropTypes.func,
    onItemSelect: PropTypes.func,
    onItemDeselect: PropTypes.func,
    onCanvasClick: PropTypes.func,
    onItemDoubleClick: PropTypes.func,
    onItemContextMenu: PropTypes.func,
    onCanvasDoubleClick: PropTypes.func,
    onCanvasContextMenu: PropTypes.func,
    onZoom: PropTypes.func,
    onItemDrag: PropTypes.func,

    moveResizeValidator: PropTypes.func,

    itemRenderer: PropTypes.func,
    groupRenderer: PropTypes.func,

    className: PropTypes.string,
    style: PropTypes.object,

    keys: PropTypes.shape({
      groupIdKey: PropTypes.string,
      groupTitleKey: PropTypes.string,
      groupLabelKey: PropTypes.string,
      groupRightTitleKey: PropTypes.string,
      itemIdKey: PropTypes.string,
      itemTitleKey: PropTypes.string,
      itemDivTitleKey: PropTypes.string,
      itemGroupKey: PropTypes.string,
      itemTimeStartKey: PropTypes.string,
      itemTimeEndKey: PropTypes.string
    }),
    headerRef: PropTypes.func,
    scrollRef: PropTypes.func,

    timeSteps: PropTypes.shape({
      second: PropTypes.number,
      minute: PropTypes.number,
      hour: PropTypes.number,
      day: PropTypes.number,
      month: PropTypes.number,
      year: PropTypes.number
    }),

    defaultTimeStart: PropTypes.object,
    defaultTimeEnd: PropTypes.object,

    visibleTimeStart: PropTypes.number,
    visibleTimeEnd: PropTypes.number,
    onTimeChange: PropTypes.func,
    onBoundsChange: PropTypes.func,

    selected: PropTypes.array,

    headerLabelFormats: PropTypes.shape({
      yearShort: PropTypes.string,
      yearLong: PropTypes.string,
      monthShort: PropTypes.string,
      monthMedium: PropTypes.string,
      monthMediumLong: PropTypes.string,
      monthLong: PropTypes.string,
      dayShort: PropTypes.string,
      dayLong: PropTypes.string,
      hourShort: PropTypes.string,
      hourMedium: PropTypes.string,
      hourMediumLong: PropTypes.string,
      hourLong: PropTypes.string
    }),

    subHeaderLabelFormats: PropTypes.shape({
      yearShort: PropTypes.string,
      yearLong: PropTypes.string,
      monthShort: PropTypes.string,
      monthMedium: PropTypes.string,
      monthLong: PropTypes.string,
      dayShort: PropTypes.string,
      dayMedium: PropTypes.string,
      dayMediumLong: PropTypes.string,
      dayLong: PropTypes.string,
      hourShort: PropTypes.string,
      hourLong: PropTypes.string,
      minuteShort: PropTypes.string,
      minuteLong: PropTypes.string
    }),

    resizeDetector: PropTypes.shape({
      addListener: PropTypes.func,
      removeListener: PropTypes.func
    }),

    verticalLineClassNamesForTime: PropTypes.func,

    children: PropTypes.node
  }

  static defaultProps = {
    sidebarWidth: 150,
    rightSidebarWidth: 0,
    dragSnap: 1000 * 60 * 15, // 15min
    minResizeWidth: 20,
    stickyHeader: true,
    lineHeight: 30,
    itemHeightRatio: 0.65,

    minZoom: 60 * 60 * 1000, // 1 hour
    maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years

    clickTolerance: 3, // how many pixels can we drag for it to be still considered a click?

    canChangeGroup: true,
    canMove: true,
    canResize: 'right',
    useResizeHandle: false,
    canSelect: true,

    stackItems: false,

    traditionalZoom: false,

    horizontalLineClassNamesForGroup: null,

    onItemMove: null,
    onItemResize: null,
    onItemClick: null,
    onItemSelect: null,
    onItemDeselect: null,
    onItemDrag: null,
    onCanvasClick: null,
    onItemDoubleClick: null,
    onItemContextMenu: null,
    onZoom: null,

    verticalLineClassNamesForTime: null,

    moveResizeValidator: null,

    dayBackground: null,

    defaultTimeStart: null,
    defaultTimeEnd: null,

    itemTouchSendsClick: false,

    style: {},
    className: '',
    keys: defaultKeys,
    timeSteps: defaultTimeSteps,
    headerRef: () => {},
    scrollRef: () => {},

    // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
    // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
    visibleTimeStart: null,
    visibleTimeEnd: null,
    onTimeChange: function(
      visibleTimeStart,
      visibleTimeEnd,
      updateScrollCanvas
    ) {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
    },
    // called when the canvas area of the calendar changes
    onBoundsChange: null,
    children: null,

    headerLabelFormats: defaultHeaderLabelFormats,
    subHeaderLabelFormats: defaultSubHeaderLabelFormats,

    selected: null
  }

  static childContextTypes = {
    getTimelineContext: PropTypes.func
  }

  getChildContext() {
    return {
      getTimelineContext: () => {
        return this.getTimelineContext()
      }
    }
  }

  getTimelineContext = () => {
    const {
      width,
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd
    } = this.state

    return {
      timelineWidth: width,
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd
    }
  }

  constructor(props) {
    super(props)

    this.getSelected = this.getSelected.bind(this)
    this.hasSelectedItem = this.hasSelectedItem.bind(this)
    this.isItemSelected= this.isItemSelected.bind(this)

    let visibleTimeStart = null
    let visibleTimeEnd = null

    if (this.props.defaultTimeStart && this.props.defaultTimeEnd) {
      visibleTimeStart = this.props.defaultTimeStart.valueOf()
      visibleTimeEnd = this.props.defaultTimeEnd.valueOf()
    } else if (this.props.visibleTimeStart && this.props.visibleTimeEnd) {
      visibleTimeStart = this.props.visibleTimeStart
      visibleTimeEnd = this.props.visibleTimeEnd
    } else {
      //throwing an error because neither default or visible time props provided
      throw new Error(
        'You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline'
      )
    }

    const [canvasTimeStart, canvasTimeEnd] = getCanvasBoundariesFromVisibleTime(
      visibleTimeStart,
      visibleTimeEnd
    )

    this.state = {
      width: 1000,
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      canvasTimeStart: canvasTimeStart,
      canvasTimeEnd: canvasTimeEnd,
      selectedItem: null,
      dragTime: null,
      dragGroupTitle: null,
      resizeTime: null,
      resizingItem: null,
      resizingEdge: null
    }

    const canvasWidth = getCanvasWidth(this.state.width)

    const {
      dimensionItems,
      height,
      groupHeights,
      groupTops
    } = stackTimelineItems(
      props.items,
      props.groups,
      canvasWidth,
      this.state.canvasTimeStart,
      this.state.canvasTimeEnd,
      props.keys,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems,
      this.state.draggingItem,
      this.state.resizingItem,
      this.state.dragTime,
      this.state.resizingEdge,
      this.state.resizeTime,
      this.state.newGroupOrder
    )

    /* eslint-disable react/no-direct-mutation-state */
    this.state.dimensionItems = dimensionItems
    this.state.height = height
    this.state.groupHeights = groupHeights
    this.state.groupTops = groupTops

    /* eslint-enable */
  }

  componentDidMount() {
    this.resize(this.props)

    if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
      this.props.resizeDetector.addListener(this)
    }

    windowResizeDetector.addListener(this)

    this.lastTouchDistance = null
  }

  componentWillUnmount() {
    if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
      this.props.resizeDetector.removeListener(this)
    }

    windowResizeDetector.removeListener(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visibleTimeStart, visibleTimeEnd, items, groups } = nextProps

    // This is a gross hack pushing items and groups in to state only to allow
    // For the forceUpdate check
    let derivedState = { items, groups }

    // if the items or groups have changed we must re-render
    const forceUpdate = items !== prevState.items || groups !== prevState.groups

    // We are a controlled component
    if (visibleTimeStart && visibleTimeEnd) {
      // Get the new canvas position
      Object.assign(
        derivedState,
        calculateScrollCanvas(
          visibleTimeStart,
          visibleTimeEnd,
          forceUpdate,
          items,
          groups,
          nextProps,
          prevState
        )
      )
    } else if (forceUpdate) {
      // Calculate new item stack position as canvas may have changed
      const canvasWidth = getCanvasWidth(prevState.width)
      Object.assign(
        derivedState,
        stackTimelineItems(
          items,
          groups,
          canvasWidth,
          prevState.canvasTimeStart,
          prevState.canvasTimeEnd,
          nextProps.keys,
          nextProps.lineHeight,
          nextProps.itemHeightRatio,
          nextProps.stackItems,
          prevState.draggingItem,
          prevState.resizingItem,
          prevState.dragTime,
          prevState.resizingEdge,
          prevState.resizeTime,
          prevState.newGroupOrder
        )
      )
    }
    
    return derivedState
  }

  componentDidUpdate(prevProps, prevState) {
    const newZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const oldZoom = prevState.visibleTimeEnd - prevState.visibleTimeStart

    // are we changing zoom? Report it!
    if (this.props.onZoom && newZoom !== oldZoom) {
      this.props.onZoom(this.getTimelineContext())
    }

    // The bounds have changed? Report it!
    if (
      this.props.onBoundsChange &&
      this.state.canvasTimeStart !== prevState.canvasTimeStart
    ) {
      this.props.onBoundsChange(
        this.state.canvasTimeStart,
        this.state.canvasTimeStart + newZoom * 3
      )
    }

    // Check the scroll is correct
    const scrollLeft = Math.round(
      this.state.width *
        (this.state.visibleTimeStart - this.state.canvasTimeStart) /
        newZoom
    )
    const componentScrollLeft = Math.round(
      prevState.width *
        (prevState.visibleTimeStart - prevState.canvasTimeStart) /
        oldZoom
    )
    if (componentScrollLeft !== scrollLeft) {
      this.scrollComponent.scrollLeft = scrollLeft
      this.scrollHeaderRef.scrollLeft = scrollLeft
    }
  }

  resize = (props = this.props) => {
    const { width: containerWidth } = this.container.getBoundingClientRect()

    let width = containerWidth - props.sidebarWidth - props.rightSidebarWidth
    const canvasWidth = getCanvasWidth(width)
    const {
      dimensionItems,
      height,
      groupHeights,
      groupTops
    } = stackTimelineItems(
      props.items,
      props.groups,
      canvasWidth,
      this.state.canvasTimeStart,
      this.state.canvasTimeEnd,
      props.keys,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems,
      this.state.draggingItem,
      this.state.resizingItem,
      this.state.dragTime,
      this.state.resizingEdge,
      this.state.resizeTime,
      this.state.newGroupOrder
    )

    // this is needed by dragItem since it uses pageY from the drag events
    // if this was in the context of the scrollElement, this would not be necessary

    this.setState({
      width,
      dimensionItems,
      height,
      groupHeights,
      groupTops
    })

    this.scrollComponent.scrollLeft = width
    this.scrollHeaderRef.scrollLeft = width
  }

  onScroll = scrollX => {
    const width = this.state.width

    const canvasTimeStart = this.state.canvasTimeStart

    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart

    const visibleTimeStart = canvasTimeStart + zoom * scrollX / width

    if (
      this.state.visibleTimeStart !== visibleTimeStart ||
      this.state.visibleTimeEnd !== visibleTimeStart + zoom
    ) {
      this.props.onTimeChange(
        visibleTimeStart,
        visibleTimeStart + zoom,
        this.updateScrollCanvas
      )
    }
  }

  // called when the visible time changes
  updateScrollCanvas = (
    visibleTimeStart,
    visibleTimeEnd,
    forceUpdateDimensions,
    items = this.props.items,
    groups = this.props.groups
  ) => {
    this.setState(
      calculateScrollCanvas(
        visibleTimeStart,
        visibleTimeEnd,
        forceUpdateDimensions,
        items,
        groups,
        this.props,
        this.state
      )
    )
  }

  handleWheelZoom = (speed, xPosition, deltaY) => {
    this.changeZoom(1.0 + speed * deltaY / 500, xPosition / this.state.width)
  }

  changeZoom = (scale, offset = 0.5) => {
    const { minZoom, maxZoom } = this.props
    const oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const newZoom = Math.min(
      Math.max(Math.round(oldZoom * scale), minZoom),
      maxZoom
    ) // min 1 min, max 20 years
    const newVisibleTimeStart = Math.round(
      this.state.visibleTimeStart + (oldZoom - newZoom) * offset
    )

    this.props.onTimeChange(
      newVisibleTimeStart,
      newVisibleTimeStart + newZoom,
      this.updateScrollCanvas
    )
  }

  showPeriod = (from, to) => {
    let visibleTimeStart = from.valueOf()
    let visibleTimeEnd = to.valueOf()

    let zoom = visibleTimeEnd - visibleTimeStart
    // can't zoom in more than to show one hour
    if (zoom < 360000) {
      return
    }

    this.props.onTimeChange(
      visibleTimeStart,
      visibleTimeStart + zoom,
      this.updateScrollCanvas
    )
  }

  selectItem = (item, clickType, e) => {
    if (
      this.isItemSelected(item) ||
      (this.props.itemTouchSendsClick && clickType === 'touch')
    ) {
      if (item && this.props.onItemClick) {
        const time = this.timeFromItemEvent(e)
        this.props.onItemClick(item, e, time)
      }
    } else {
      this.setState({ selectedItem: item })
      if (item && this.props.onItemSelect) {
        const time = this.timeFromItemEvent(e)
        this.props.onItemSelect(item, e, time)
      } else if (item === null && this.props.onItemDeselect) {
        this.props.onItemDeselect(e) // this isnt in the docs. Is this function even used?
      }
    }
  }

  doubleClickItem = (item, e) => {
    if (this.props.onItemDoubleClick) {
      const time = this.timeFromItemEvent(e)
      this.props.onItemDoubleClick(item, e, time)
    }
  }

  contextMenuClickItem = (item, e) => {
    if (this.props.onItemContextMenu) {
      const time = this.timeFromItemEvent(e)
      this.props.onItemContextMenu(item, e, time)
    }
  }

  // TODO: this is very similar to timeFromItemEvent, aside from which element to get offsets
  // from.  Look to consolidate the logic for determining coordinate to time
  // as well as generalizing how we get time from click on the canvas
  getTimeFromRowClickEvent = e => {
    const { dragSnap } = this.props
    const { width, canvasTimeStart, canvasTimeEnd } = this.state
    // this gives us distance from left of row element, so event is in
    // context of the row element, not client or page
    const { offsetX } = e.nativeEvent

    let time = calculateTimeForXPosition(
      canvasTimeStart,

      canvasTimeEnd,
      getCanvasWidth(width),
      offsetX
    )
    time = Math.floor(time / dragSnap) * dragSnap

    return time
  }

  timeFromItemEvent = e => {
    const { width, visibleTimeStart, visibleTimeEnd } = this.state
    const { dragSnap } = this.props

    const scrollComponent = this.scrollComponent
    const { left: scrollX } = scrollComponent.getBoundingClientRect()

    const xRelativeToTimeline = e.clientX - scrollX

    const relativeItemPosition = xRelativeToTimeline / width
    const zoom = visibleTimeEnd - visibleTimeStart
    const timeOffset = relativeItemPosition * zoom

    let time = Math.round(visibleTimeStart + timeOffset)
    time = Math.floor(time / dragSnap) * dragSnap

    return time
  }

  dragItem = (item, dragTime, newGroupOrder) => {
    let newGroup = this.props.groups[newGroupOrder]
    const keys = this.props.keys

    this.setState({
      draggingItem: item,
      dragTime: dragTime,
      newGroupOrder: newGroupOrder,
      dragGroupTitle: newGroup ? _get(newGroup, keys.groupLabelKey) : ''
    })

    this.updatingItem({
      eventType: 'move',
      itemId: item,
      time: dragTime,
      newGroupOrder
    })
  }

  dropItem = (item, dragTime, newGroupOrder) => {
    this.setState({ draggingItem: null, dragTime: null, dragGroupTitle: null })
    if (this.props.onItemMove) {
      this.props.onItemMove(item, dragTime, newGroupOrder)
    }
  }

  resizingItem = (item, resizeTime, edge) => {
    this.setState({
      resizingItem: item,
      resizingEdge: edge,
      resizeTime: resizeTime
    })

    this.updatingItem({
      eventType: 'resize',
      itemId: item,
      time: resizeTime,
      edge
    })
  }

  resizedItem = (item, resizeTime, edge, timeDelta) => {
    this.setState({ resizingItem: null, resizingEdge: null, resizeTime: null })
    if (this.props.onItemResize && timeDelta !== 0) {
      this.props.onItemResize(item, resizeTime, edge)
    }
  }

  updatingItem = ({ eventType, itemId, time, edge, newGroupOrder }) => {
    if (this.props.onItemDrag) {
      this.props.onItemDrag({ eventType, itemId, time, edge, newGroupOrder })
    }
  }

  columns(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    minUnit,
    timeSteps,
    height
  ) {
    return (
      <Columns
        canvasTimeStart={canvasTimeStart}
        canvasTimeEnd={canvasTimeEnd}
        canvasWidth={canvasWidth}
        lineCount={_length(this.props.groups)}
        minUnit={minUnit}
        timeSteps={timeSteps}
        height={height}
        verticalLineClassNamesForTime={this.props.verticalLineClassNamesForTime}
      />
    )
  }

  handleRowClick = (e, rowIndex) => {
    // shouldnt this be handled by the user, as far as when to deselect an item?
    if (this.hasSelectedItem()) {
      this.selectItem(null)
    }

    if (this.props.onCanvasClick == null) return

    const time = this.getTimeFromRowClickEvent(e)
    const groupId = _get(
      this.props.groups[rowIndex],
      this.props.keys.groupIdKey
    )
    this.props.onCanvasClick(groupId, time, e)
  }

  handleRowDoubleClick = (e, rowIndex) => {
    if (this.props.onCanvasDoubleClick == null) return

    const time = this.getTimeFromRowClickEvent(e)
    const groupId = _get(
      this.props.groups[rowIndex],
      this.props.keys.groupIdKey
    )
    this.props.onCanvasDoubleClick(groupId, time, e)
  }

  handleScrollContextMenu = (e, rowIndex) => {
    if (this.props.onCanvasContextMenu == null) return

    const timePosition = this.getTimeFromRowClickEvent(e)

    const groupId = _get(
      this.props.groups[rowIndex],
      this.props.keys.groupIdKey
    )

    if (this.props.onCanvasContextMenu) {
      e.preventDefault()
      this.props.onCanvasContextMenu(groupId, timePosition, e)
    }
  }

  rows(canvasWidth, groupHeights, groups) {
    return (
      <GroupRows
        groups={groups}
        canvasWidth={canvasWidth}
        lineCount={_length(this.props.groups)}
        groupHeights={groupHeights}
        clickTolerance={this.props.clickTolerance}
        onRowClick={this.handleRowClick}
        onRowDoubleClick={this.handleRowDoubleClick}
        horizontalLineClassNamesForGroup={
          this.props.horizontalLineClassNamesForGroup
        }
        onRowContextClick={this.handleScrollContextMenu}
      />
    )
  }

  items(
    canvasTimeStart,
    zoom,
    canvasTimeEnd,
    canvasWidth,
    minUnit,
    dimensionItems,
    groupHeights,
    groupTops
  ) {
    return (
      <Items
        canvasTimeStart={canvasTimeStart}
        canvasTimeEnd={canvasTimeEnd}
        canvasWidth={canvasWidth}
        dimensionItems={dimensionItems}
        groupTops={groupTops}
        items={this.props.items}
        groups={this.props.groups}
        keys={this.props.keys}
        selectedItem={this.state.selectedItem}
        dragSnap={this.props.dragSnap}
        minResizeWidth={this.props.minResizeWidth}
        canChangeGroup={this.props.canChangeGroup}
        canMove={this.props.canMove}
        canResize={this.props.canResize}
        useResizeHandle={this.props.useResizeHandle}
        canSelect={this.props.canSelect}
        moveResizeValidator={this.props.moveResizeValidator}
        itemSelect={this.selectItem}
        itemDrag={this.dragItem}
        itemDrop={this.dropItem}
        onItemDoubleClick={this.doubleClickItem}
        onItemContextMenu={this.contextMenuClickItem}
        itemResizing={this.resizingItem}
        itemResized={this.resizedItem}
        itemRenderer={this.props.itemRenderer}
        selected={this.props.selected}
        scrollRef={this.scrollComponent}
      />
    )
  }

  handleHeaderRef = el => {
    this.scrollHeaderRef = el
    this.props.headerRef(el)
  }

  sidebar(height, groupHeights) {
    const { sidebarWidth } = this.props
    return (
      sidebarWidth && (
        <Sidebar
          groups={this.props.groups}
          groupRenderer={this.props.groupRenderer}
          keys={this.props.keys}
          width={sidebarWidth}
          groupHeights={groupHeights}
          height={height}
        />
      )
    )
  }

  rightSidebar(height, groupHeights) {
    const { rightSidebarWidth } = this.props
    return (
      rightSidebarWidth && (
        <Sidebar
          groups={this.props.groups}
          keys={this.props.keys}
          groupRenderer={this.props.groupRenderer}
          isRightSidebar
          width={rightSidebarWidth}
          groupHeights={groupHeights}
          height={height}
        />
      )
    )
  }

  /**
   * check if child of type TimelineHeader
   * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types 
   */
  isTimelineHeader = (child) => {
    if(child.type === undefined) return false
    return child.type.secretKey ===TimelineHeaders.secretKey
  }
  
  childrenWithProps(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    dimensionItems,
    groupHeights,
    groupTops,
    height,
    visibleTimeStart,
    visibleTimeEnd,
    minUnit,
    timeSteps
  ) {
    if (!this.props.children) {
      return null
    }

    // convert to an array and remove the nulls
    const childArray = Array.isArray(this.props.children)
      ? this.props.children.filter(c => c)
      : [this.props.children]

    const childProps = {
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      dimensionItems,
      items: this.props.items,
      groups: this.props.groups,
      keys: this.props.keys,
      groupHeights: groupHeights,
      groupTops: groupTops,
      selected: this.getSelected(),
      height: height,
      minUnit: minUnit,
      timeSteps: timeSteps
    }

    return React.Children.map(childArray, child => {
      if (!this.isTimelineHeader(child)) {
        return React.cloneElement(child, childProps)
      } else {
        return null
      }
    })
  }

  renderHeaders = () => {
    if (this.props.children) {
      let headerRenderer
      React.Children.map(this.props.children, child => {
        if (this.isTimelineHeader(child)) {
          headerRenderer = child
        }
      })
      if (headerRenderer) {
        return headerRenderer
      }
    }
    return (
      <TimelineHeaders>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    )
  }

  getSelected() {
    return this.state.selectedItem && !this.props.selected
      ? [this.state.selectedItem]
      : this.props.selected || [];
  }

  hasSelectedItem(){
    if(!Array.isArray(this.props.selected)) return !!this.state.selectedItem
    return this.props.selected.length > 0
  }

  isItemSelected(itemId){
    const selectedItems = this.getSelected()
    return selectedItems.some(i => i === itemId)
  }
  getScrollElementRef = el => {
    this.props.scrollRef(el)
    this.scrollComponent = el
  }

  render() {
    const {
      items,
      groups,
      sidebarWidth,
      rightSidebarWidth,
      timeSteps,
      traditionalZoom
    } = this.props
    const {
      draggingItem,
      resizingItem,
      width,
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd
    } = this.state
    let { dimensionItems, height, groupHeights, groupTops } = this.state

    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasWidth = getCanvasWidth(width)
    const minUnit = getMinUnit(zoom, width, timeSteps)

    const isInteractingWithItem = !!draggingItem || !!resizingItem

    if (isInteractingWithItem) {
      const stackResults = stackTimelineItems(
        items,
        groups,
        canvasWidth,
        this.state.canvasTimeStart,
        this.state.canvasTimeEnd,
        this.props.keys,
        this.props.lineHeight,
        this.props.itemHeightRatio,
        this.props.stackItems,
        this.state.draggingItem,
        this.state.resizingItem,
        this.state.dragTime,
        this.state.resizingEdge,
        this.state.resizeTime,
        this.state.newGroupOrder
      )
      dimensionItems = stackResults.dimensionItems
      height = stackResults.height
      groupHeights = stackResults.groupHeights
      groupTops = stackResults.groupTops
    }

    const outerComponentStyle = {
      height: `${height}px`
    }

    return (
      <TimelineStateProvider
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        canvasTimeStart={canvasTimeStart}
        canvasTimeEnd={canvasTimeEnd}
        canvasWidth={canvasWidth}
        showPeriod={this.showPeriod}
        timelineUnit={minUnit}
        timelineWidth={this.state.width}
      >
        <TimelineMarkersProvider>
          <TimelineHeadersProvider
            registerScroll={this.handleHeaderRef}
            timeSteps={timeSteps}
            leftSidebarWidth={this.props.sidebarWidth}
            rightSidebarWidth={this.props.rightSidebarWidth}
          >
            <div
              style={this.props.style}
              ref={el => (this.container = el)}
              className={`react-calendar-timeline ${this.props.className}`}
            >
              {this.renderHeaders()}
              <div style={outerComponentStyle} className="rct-outer">
                {sidebarWidth > 0 ? this.sidebar(height, groupHeights) : null}
                <ScrollElement
                  scrollRef={this.getScrollElementRef}
                  width={width}
                  height={height}
                  onZoom={this.changeZoom}
                  onWheelZoom={this.handleWheelZoom}
                  traditionalZoom={traditionalZoom}
                  onScroll={this.onScroll}
                  isInteractingWithItem={isInteractingWithItem}
                >
                  <MarkerCanvas>
                    {this.columns(
                      canvasTimeStart,
                      canvasTimeEnd,
                      canvasWidth,
                      minUnit,
                      timeSteps,
                      height
                    )}
                    {this.rows(canvasWidth, groupHeights, groups)}
                    {this.items(
                      canvasTimeStart,
                      zoom,
                      canvasTimeEnd,
                      canvasWidth,
                      minUnit,
                      dimensionItems,
                      groupHeights,
                      groupTops
                    )}
                    {this.childrenWithProps(
                      canvasTimeStart,
                      canvasTimeEnd,
                      canvasWidth,
                      dimensionItems,
                      groupHeights,
                      groupTops,
                      height,
                      visibleTimeStart,
                      visibleTimeEnd,
                      minUnit,
                      timeSteps
                    )}
                  </MarkerCanvas>
                </ScrollElement>
                {rightSidebarWidth > 0
                  ? this.rightSidebar(height, groupHeights)
                  : null}
              </div>
            </div>
          </TimelineHeadersProvider>
        </TimelineMarkersProvider>
      </TimelineStateProvider>
    )
  }
}
