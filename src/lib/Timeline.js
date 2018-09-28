import PropTypes from 'prop-types'
import React, { Component } from 'react'
import moment from 'moment'

import Items from './items/Items'
import InfoLabel from './layout/InfoLabel'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import Columns from './columns/Columns'
import GroupRows from './row/GroupRows'
import ScrollElement from './scroll/ScrollElement'
import MarkerCanvas from './markers/MarkerCanvas'

import windowResizeDetector from '../resize-detector/window'

import {
  getMinUnit,
  getNextUnit,
  stackItems,
  calculateScrollCanvas,
  calculateTimeForXPosition
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

export default class ReactCalendarTimeline extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    sidebarWidth: PropTypes.number,
    sidebarContent: PropTypes.node,
    rightSidebarWidth: PropTypes.number,
    rightSidebarContent: PropTypes.node,
    dragSnap: PropTypes.number,
    minResizeWidth: PropTypes.number,
    stickyOffset: PropTypes.number,
    stickyHeader: PropTypes.bool,
    lineHeight: PropTypes.number,
    headerLabelGroupHeight: PropTypes.number,
    headerLabelHeight: PropTypes.number,
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

    moveResizeValidator: PropTypes.func,

    itemRenderer: PropTypes.func,
    groupRenderer: PropTypes.func,

    style: PropTypes.object,

    keys: PropTypes.shape({
      groupIdKey: PropTypes.string,
      groupTitleKey: PropTypes.string,
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
    stickyOffset: 0,
    stickyHeader: true,
    lineHeight: 30,
    headerLabelGroupHeight: 30,
    headerLabelHeight: 30,
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
      canvasTimeStart
    } = this.state
    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3

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

    this.state = {
      width: 1000,

      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      canvasTimeStart: visibleTimeStart - (visibleTimeEnd - visibleTimeStart),

      selectedItem: null,
      dragTime: null,
      dragGroupTitle: null,
      resizeTime: null,
      topOffset: 0,
      resizingItem: null,
      resizingEdge: null
    }

    const { dimensionItems, height, groupHeights, groupTops } = stackItems(
      props.items,
      props.groups,
      this.state.canvasTimeStart,
      this.state.visibleTimeStart,
      this.state.visibleTimeEnd,
      this.state.width,
      this.props,
      this.state
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
    const {
      visibleTimeStart,
      visibleTimeEnd,
      items,
      groups
    } = nextProps

    // This is a gross hack pushing items and groups in to state only to allow
    // For the forceUpdate check
    let derivedState = {items, groups}

    // if the items or groups have changed we must re-render
    const forceUpdate = items !== prevState.items || groups !== prevState.groups

    // We are a controlled component
    if (visibleTimeStart && visibleTimeEnd) {
      // Get the new canvas position
      Object.assign(derivedState, 
        calculateScrollCanvas(
          visibleTimeStart,
          visibleTimeEnd,
          forceUpdate,
          items,
          groups,
          nextProps,
          prevState
      ))
    } else if (forceUpdate) {
      // Calculate new item stack position as canvas may have changed
      Object.assign(derivedState, 
        stackItems(items, 
          groups, 
          prevState.canvasTimeStart,
          prevState.visibleTimeStart,
          prevState.visibleTimeEnd,
          prevState.width,
          nextProps,
          prevState))
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
    if (this.props.onBoundsChange && this.state.canvasTimeStart !== prevState.canvasTimeStart) {
      this.props.onBoundsChange(this.state.canvasTimeStart, this.state.canvasTimeStart + newZoom * 3)
    }

    // Check the scroll is correct
    const scrollLeft = Math.round(
      this.state.width * (this.state.visibleTimeStart - this.state.canvasTimeStart) / newZoom)
    if (this.scrollComponent.scrollLeft !== scrollLeft) {
      this.scrollComponent.scrollLeft = scrollLeft
    }

    if (this.scrollHeaderRef.scrollLeft !== scrollLeft) {
      this.scrollHeaderRef.scrollLeft = scrollLeft
    }
  }

  resize = (props = this.props) => {
    const {
      width: containerWidth,
      top: containerTop
    } = this.container.getBoundingClientRect()

    let width = containerWidth - props.sidebarWidth - props.rightSidebarWidth
    const { headerLabelGroupHeight, headerLabelHeight } = props
    const headerHeight = headerLabelGroupHeight + headerLabelHeight

    const { dimensionItems, height, groupHeights, groupTops } = stackItems(
      props.items,
      props.groups,
      this.state.canvasTimeStart,
      this.state.visibleTimeStart,
      this.state.visibleTimeEnd,
      width,
      this.props,
      this.state
    )

    // this is needed by dragItem since it uses pageY from the drag events
    // if this was in the context of the scrollElement, this would not be necessary
    const topOffset = containerTop + window.pageYOffset + headerHeight

    this.setState({
      width,
      topOffset,
      dimensionItems,
      height,
      groupHeights,
      groupTops
    })
    
    this.scrollComponent.scrollLeft = width
    this.headerRef.scrollLeft = width
  }
  
  onScroll = scrollX => {
    const width = this.state.width
    let newScrollX = scrollX
    // move the virtual canvas if needed
    // if scrollX is less...i dont know how to explain the logic here
    if (newScrollX < width * 0.5) {
      newScrollX += width
    }
    if (newScrollX > width * 1.5) {
      newScrollX -= width
    }

    this.headerRef.scrollLeft = newScrollX
    this.scrollComponent.scrollLeft = newScrollX

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
        this.state))
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

  showPeriod = (from, unit) => {
    let visibleTimeStart = from.valueOf()
    let visibleTimeEnd = moment(from)
      .add(1, unit)
      .valueOf()
    let zoom = visibleTimeEnd - visibleTimeStart

    // can't zoom in more than to show one hour
    if (zoom < 360000) {
      return
    }

    // clicked on the big header and already focused here, zoom out
    if (
      unit !== 'year' &&
      this.state.visibleTimeStart === visibleTimeStart &&
      this.state.visibleTimeEnd === visibleTimeEnd
    ) {
      let nextUnit = getNextUnit(unit)

      visibleTimeStart = from.startOf(nextUnit).valueOf()
      visibleTimeEnd = moment(visibleTimeStart).add(1, nextUnit)
      zoom = visibleTimeEnd - visibleTimeStart
    }

    this.props.onTimeChange(
      visibleTimeStart,
      visibleTimeStart + zoom,
      this.updateScrollCanvas
    )
  }

  selectItem = (item, clickType, e) => {
    if (
      this.state.selectedItem === item ||
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
    const {
      width,
      canvasTimeStart,
      visibleTimeStart,
      visibleTimeEnd
    } = this.state
    // this gives us distance from left of row element, so event is in
    // context of the row element, not client or page
    const { offsetX } = e.nativeEvent

    // FIXME: DRY up way to calculate canvasTimeEnd
    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasTimeEnd = zoom * 3 + canvasTimeStart

    let time = calculateTimeForXPosition(
      canvasTimeStart,
      canvasTimeEnd,
      width * 3,
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
      dragGroupTitle: newGroup ? _get(newGroup, keys.groupTitleKey) : ''
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
  }

  resizedItem = (item, resizeTime, edge, timeDelta) => {
    this.setState({ resizingItem: null, resizingEdge: null, resizeTime: null })
    if (this.props.onItemResize && timeDelta !== 0) {
      this.props.onItemResize(item, resizeTime, edge)
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
    if (this.state.selectedItem) {
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
        horizontalLineClassNamesForGroup={this.props.horizontalLineClassNamesForGroup}
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
        topOffset={this.state.topOffset}
        itemSelect={this.selectItem}
        itemDrag={this.dragItem}
        itemDrop={this.dropItem}
        onItemDoubleClick={this.doubleClickItem}
        onItemContextMenu={this.contextMenuClickItem}
        itemResizing={this.resizingItem}
        itemResized={this.resizedItem}
        itemRenderer={this.props.itemRenderer}
        selected={this.props.selected}
      />
    )
  }

  infoLabel() {
    let label = null

    if (this.state.dragTime) {
      label = `${moment(this.state.dragTime).format('LLL')}, 
        ${this.state.dragGroupTitle}`
    } else if (this.state.resizeTime) {
      label = moment(this.state.resizeTime).format('LLL')
    }
    
    return label ? <InfoLabel label={label} /> : undefined
  }

  handleHeaderRef = el => {
    this.headerRef = el
    this.props.headerRef(el)
  }

  handleScrollHeaderRef = el => {
    this.scrollHeaderRef = el
  }

  header(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    minUnit,
    timeSteps,
    headerLabelGroupHeight,
    headerLabelHeight
  ) {
    return (
      <Header
        canvasTimeStart={canvasTimeStart}
        hasRightSidebar={this.props.rightSidebarWidth > 0}
        canvasTimeEnd={canvasTimeEnd}
        canvasWidth={canvasWidth}
        minUnit={minUnit}
        timeSteps={timeSteps}
        headerLabelGroupHeight={headerLabelGroupHeight}
        headerLabelHeight={headerLabelHeight}
        width={this.state.width}
        stickyOffset={this.props.stickyOffset}
        stickyHeader={this.props.stickyHeader}
        showPeriod={this.showPeriod}
        headerLabelFormats={this.props.headerLabelFormats}
        subHeaderLabelFormats={this.props.subHeaderLabelFormats}
        headerRef={this.handleHeaderRef}
        scrollHeaderRef={this.handleScrollHeaderRef}
        leftSidebarWidth={this.props.sidebarWidth}
        rightSidebarWidth={this.props.rightSidebarWidth}
        leftSidebarHeader={this.props.sidebarContent}
        rightSidebarHeader={this.props.rightSidebarContent}
      />
    )
  }

  sidebar(height, groupHeights) {
    const { sidebarWidth } = this.props
    return (
      sidebarWidth && 
      <Sidebar
        groups={this.props.groups}
        groupRenderer={this.props.groupRenderer}
        keys={this.props.keys}
        width={sidebarWidth}
        groupHeights={groupHeights}
        height={height}

      />
    )
  }

  rightSidebar(height, groupHeights) {
    const { rightSidebarWidth } = this.props
    return (
      rightSidebarWidth &&
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
  }

  childrenWithProps(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    dimensionItems,
    groupHeights,
    groupTops,
    height,
    headerHeight,
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
      selected:
        this.state.selectedItem && !this.props.selected
          ? [this.state.selectedItem]
          : this.props.selected || [],
      height: height,
      headerHeight: headerHeight,
      minUnit: minUnit,
      timeSteps: timeSteps
    }

    return React.Children.map(childArray, child =>
      React.cloneElement(child, childProps)
    )
  }

  render() {
    const {
      items,
      groups,
      headerLabelGroupHeight,
      headerLabelHeight,
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
      canvasTimeStart
    } = this.state
    let { dimensionItems, height, groupHeights, groupTops } = this.state

    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3
    const canvasWidth = width * 3
    const minUnit = getMinUnit(zoom, width, timeSteps)
    const headerHeight = headerLabelGroupHeight + headerLabelHeight

    const isInteractingWithItem = !!draggingItem || !!resizingItem

    if (isInteractingWithItem) {
      const stackResults = stackItems(
        items,
        groups,
        canvasTimeStart,
        visibleTimeStart,
        visibleTimeEnd,
        width,
        this.props,
        this.state
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
      >
        <TimelineMarkersProvider>
          <div
            style={this.props.style}
            ref={el => (this.container = el)}
            className="react-calendar-timeline"
          >
            {this.header(
              canvasTimeStart,
              canvasTimeEnd,
              canvasWidth,
              minUnit,
              timeSteps,
              headerLabelGroupHeight,
              headerLabelHeight
            )}
            {sidebarWidth > 0 && this.sidebar(height, groupHeights, headerHeight)}
            <div style={{display: 'inline-block'}}>

              <div style={outerComponentStyle} className="rct-outer">
              <ScrollElement
              scrollRef={el => {
                this.props.scrollRef(el);
                this.scrollComponent = el
              }}
                width={width}
                height={height}
                onZoom={this.changeZoom}
                onWheelZoom={this.handleWheelZoom}
                traditionalZoom={traditionalZoom}
                onScroll={this.onScroll}
                isInteractingWithItem={isInteractingWithItem}
              >
              <MarkerCanvas>
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
                {this.columns(
                    canvasTimeStart,
                    canvasTimeEnd,
                    canvasWidth,
                    minUnit,
                    timeSteps,
                    height,
                    headerHeight
                  )}
                {this.rows(canvasWidth, groupHeights, groups)}
                  {this.infoLabel()}
                  {this.childrenWithProps(
                    canvasTimeStart,
                    canvasTimeEnd,
                    canvasWidth,
                    dimensionItems,
                    groupHeights,
                    groupTops,
                    height,
                    headerHeight,
                    visibleTimeStart,
                    visibleTimeEnd,
                    minUnit,
                    timeSteps
                  )}
              </MarkerCanvas>
              </ScrollElement>
              </div>
            </div>
            {rightSidebarWidth > 0 && this.rightSidebar(height, groupHeights, headerHeight)}
          </div>
        </TimelineMarkersProvider>
      </TimelineStateProvider>
    )
  }
}
