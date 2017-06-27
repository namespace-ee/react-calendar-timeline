import PropTypes from 'prop-types'
import React, { Component } from 'react'
import moment from 'moment'
import './Timeline.scss'

import Items from './items/Items'
import InfoLabel from './layout/InfoLabel'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import VerticalLines from './lines/VerticalLines'
import HorizontalLines from './lines/HorizontalLines'
import TodayLine from './lines/TodayLine'
import CursorLine from './lines/CursorLine'

import windowResizeDetector from '../resize-detector/window'

import { getMinUnit, getNextUnit, getParentPosition, _get, _length, stack, nostack, calculateDimensions, getGroupOrders, getVisibleItems, hasSomeParentTheClass } from './utils.js'

export const defaultKeys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time'
}

export const defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1
}

export const defaultHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM/YY',
  monthMedium: 'MM/YYYY',
  monthMediumLong: 'MMM YYYY',
  monthLong: 'MMMM YYYY',
  dayShort: 'L',
  dayLong: 'dddd, LL',
  hourShort: 'HH',
  hourMedium: 'HH:00',
  hourMediumLong: 'L, HH:00',
  hourLong: 'dddd, LL, HH:00',
  time: 'LLL'
}

export const defaultSubHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM',
  monthMedium: 'MMM',
  monthLong: 'MMMM',
  dayShort: 'D',
  dayMedium: 'dd D',
  dayMediumLong: 'ddd, Do',
  dayLong: 'dddd, Do',
  hourShort: 'HH',
  hourLong: 'HH:00',
  minuteShort: 'mm',
  minuteLong: 'HH:mm'
}

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
    fixedHeader: PropTypes.oneOf(['fixed', 'absolute', 'none']),
    fullUpdate: PropTypes.bool,
    zIndexStart: PropTypes.number,
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
    showCursorLine: PropTypes.bool,

    itemTouchSendsClick: PropTypes.bool,

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
    onCanvasMouseEnter: PropTypes.func,
    onCanvasMouseLeave: PropTypes.func,
    onCanvasMouseMove: PropTypes.func,

    moveResizeValidator: PropTypes.func,
    itemRenderer: PropTypes.func,
    groupRenderer: PropTypes.func,

    dayBackground: PropTypes.func,

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
    onTimeInit: PropTypes.func,
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

    children: PropTypes.node
  }

  static defaultProps = {
    sidebarWidth: 150,
    rightSidebarWidth: 0,
    dragSnap: 1000 * 60 * 15, // 15min
    minResizeWidth: 20,
    fixedHeader: 'none', // fixed or absolute or none
    fullUpdate: true,
    zIndexStart: 10,
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
    showCursorLine: false,

    onItemMove: null,
    onItemResize: null,
    onItemClick: null,
    onItemSelect: null,
    onItemDeselect: null,
    onCanvasClick: null,
    onItemDoubleClick: null,
    onItemContextMenu: null,
    onCanvasMouseEnter: null,
    onCanvasMouseLeave: null,
    onCanvasMouseMove: null,

    moveResizeValidator: null,

    dayBackground: null,

    defaultTimeStart: null,
    defaultTimeEnd: null,

    itemTouchSendsClick: false,

    style: {},
    keys: defaultKeys,
    timeSteps: defaultTimeSteps,

    // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
    // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
    visibleTimeStart: null,
    visibleTimeEnd: null,
    onTimeChange: function (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
    },
    // called after the calendar loads and the visible time has been calculated
    onTimeInit: null,
    // called when the canvas area of the calendar changes
    onBoundsChange: null,
    children: null,

    headerLabelFormats: defaultHeaderLabelFormats,
    subHeaderLabelFormats: defaultSubHeaderLabelFormats,

    selected: null
  }

  constructor (props) {
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
      visibleTimeStart = Math.min(...this.props.items.map(item => _get(item, 'start').getTime()))
      visibleTimeEnd = Math.max(...this.props.items.map(item => _get(item, 'end').getTime()))

      if (!visibleTimeStart || !visibleTimeEnd) {
        visibleTimeStart = new Date().getTime() - 86400 * 7 * 1000
        visibleTimeEnd = new Date().getTime() + 86400 * 7 * 1000
      }

      if (this.props.onTimeInit) {
        this.props.onTimeInit(visibleTimeStart, visibleTimeEnd)
      }
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
      isDragging: false,
      topOffset: 0,
      resizingItem: null,
      resizingEdge: null
    }

    const {
      dimensionItems, height, groupHeights, groupTops
    } = this.stackItems(props.items, props.groups, this.state.canvasTimeStart, this.state.visibleTimeStart, this.state.visibleTimeEnd, this.state.width)

    this.state.dimensionItems = dimensionItems
    this.state.height = height
    this.state.groupHeights = groupHeights
    this.state.groupTops = groupTops
  }

  componentDidMount () {
    this.resize(this.props)

    if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
      this.props.resizeDetector.addListener(this)
    }

    windowResizeDetector.addListener(this)

    this.lastTouchDistance = null

    this.refs.scrollComponent.addEventListener('touchstart', this.touchStart)
    this.refs.scrollComponent.addEventListener('touchmove', this.touchMove)
    this.refs.scrollComponent.addEventListener('touchend', this.touchEnd)
  }

  componentWillUnmount () {
    if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
      this.props.resizeDetector.removeListener(this)
    }

    windowResizeDetector.removeListener(this)

    this.refs.scrollComponent.removeEventListener('touchstart', this.touchStart)
    this.refs.scrollComponent.removeEventListener('touchmove', this.touchMove)
    this.refs.scrollComponent.removeEventListener('touchend', this.touchEnd)
  }

  touchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault()

      this.lastTouchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX)
      this.singleTouchStart = null
      this.lastSingleTouch = null
    } else if (e.touches.length === 1 && this.props.fixedHeader === 'fixed') {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      this.lastTouchDistance = null
      this.singleTouchStart = {x: x, y: y, screenY: window.pageYOffset}
      this.lastSingleTouch = {x: x, y: y, screenY: window.pageYOffset}
    }
  }

  touchMove = (e) => {
    if (this.state.dragTime || this.state.resizeTime) {
      e.preventDefault()
      return
    }
    if (this.lastTouchDistance && e.touches.length === 2) {
      e.preventDefault()

      let touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX)

      let parentPosition = getParentPosition(e.currentTarget)
      let xPosition = (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x

      if (touchDistance !== 0 && this.lastTouchDistance !== 0) {
        this.changeZoom(this.lastTouchDistance / touchDistance, xPosition / this.state.width)
        this.lastTouchDistance = touchDistance
      }
    } else if (this.lastSingleTouch && e.touches.length === 1 && this.props.fixedHeader === 'fixed') {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      let deltaX = x - this.lastSingleTouch.x
      // let deltaY = y - this.lastSingleTouch.y

      let deltaX0 = x - this.singleTouchStart.x
      let deltaY0 = y - this.singleTouchStart.y

      this.lastSingleTouch = {x: x, y: y}

      let moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0)
      let moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0)

      if (deltaX !== 0 && moveX) {
        this.refs.scrollComponent.scrollLeft -= deltaX
      }
      if (moveY) {
        window.scrollTo(window.pageXOffset, this.singleTouchStart.screenY - deltaY0)
      }
    }
  }

  touchEnd = (e) => {
    if (this.lastTouchDistance) {
      e.preventDefault()

      this.lastTouchDistance = null
    }
    if (this.lastSingleTouch) {
      e.preventDefault()

      this.lastSingleTouch = null
      this.singleTouchStart = null
    }
  }

  resize = (props = this.props) => {
    const { width: containerWidth, top: containerTop } = this.refs.container.getBoundingClientRect()
    let width = containerWidth - props.sidebarWidth - props.rightSidebarWidth

    const {
      dimensionItems, height, groupHeights, groupTops
    } = this.stackItems(props.items, props.groups, this.state.canvasTimeStart, this.state.visibleTimeStart, this.state.visibleTimeEnd, width)

    this.setState({
      width: width,
      topOffset: containerTop + window.pageYOffset,
      dimensionItems: dimensionItems,
      height: height,
      groupHeights: groupHeights,
      groupTops: groupTops
    })
    this.refs.scrollComponent.scrollLeft = width
  }

  onScroll = () => {
    const scrollComponent = this.refs.scrollComponent
    const canvasTimeStart = this.state.canvasTimeStart
    const scrollX = scrollComponent.scrollLeft
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const width = this.state.width
    const visibleTimeStart = canvasTimeStart + (zoom * scrollX / width)

    // move the virtual canvas if needed
    if (scrollX < this.state.width * 0.5) {
      this.setState({
        canvasTimeStart: this.state.canvasTimeStart - zoom
      })
      scrollComponent.scrollLeft += this.state.width
    }
    if (scrollX > this.state.width * 1.5) {
      this.setState({
        canvasTimeStart: this.state.canvasTimeStart + zoom
      })
      scrollComponent.scrollLeft -= this.state.width
    }

    if (this.state.visibleTimeStart !== visibleTimeStart || this.state.visibleTimeEnd !== visibleTimeStart + zoom) {
      this.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, this.updateScrollCanvas)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { visibleTimeStart, visibleTimeEnd, items, groups, sidebarWidth } = nextProps

    if (visibleTimeStart && visibleTimeEnd) {
      this.updateScrollCanvas(visibleTimeStart, visibleTimeEnd, items !== this.props.items || groups !== this.props.groups, items, groups)
    } else if (items !== this.props.items || groups !== this.props.groups) {
      this.updateDimensions(items, groups)
    }

    // resize if the sidebar width changed
    if (sidebarWidth !== this.props.sidebarWidth && items && groups) {
      this.resize(nextProps)
    }
  }

  updateDimensions (items, groups) {
    const { canvasTimeStart, visibleTimeStart, visibleTimeEnd, width } = this.state
    const {
      dimensionItems, height, groupHeights, groupTops
    } = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width)

    this.setState({ dimensionItems, height, groupHeights, groupTops })
  }

  // called when the visible time changes
  updateScrollCanvas = (visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, updatedItems, updatedGroups) => {
    const oldCanvasTimeStart = this.state.canvasTimeStart
    const oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const newZoom = visibleTimeEnd - visibleTimeStart
    const items = updatedItems || this.props.items
    const groups = updatedGroups || this.props.groups
    const { fullUpdate } = this.props

    let newState = {
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd
    }

    let resetCanvas = false

    const canKeepCanvas = visibleTimeStart >= oldCanvasTimeStart + oldZoom * 0.5 &&
                          visibleTimeStart <= oldCanvasTimeStart + oldZoom * 1.5 &&
                          visibleTimeEnd >= oldCanvasTimeStart + oldZoom * 1.5 &&
                          visibleTimeEnd <= oldCanvasTimeStart + oldZoom * 2.5

    // if new visible time is in the right canvas area
    if (canKeepCanvas) {
      // but we need to update the scroll
      const newScrollLeft = Math.round(this.state.width * (visibleTimeStart - oldCanvasTimeStart) / newZoom)
      if (this.refs.scrollComponent.scrollLeft !== newScrollLeft) {
        resetCanvas = true
      }
    } else {
      resetCanvas = true
    }

    if (resetCanvas) {
      // Todo: need to calculate new dimensions
      newState.canvasTimeStart = visibleTimeStart - newZoom
      this.refs.scrollComponent.scrollLeft = this.state.width

      if (this.props.onBoundsChange) {
        this.props.onBoundsChange(newState.canvasTimeStart, newState.canvasTimeStart + newZoom * 3)
      }
    }

    if (resetCanvas || forceUpdateDimensions || fullUpdate) {
      const canvasTimeStart = newState.canvasTimeStart ? newState.canvasTimeStart : oldCanvasTimeStart
      const {
        dimensionItems, height, groupHeights, groupTops
      } = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, this.state.width, fullUpdate)
      newState.dimensionItems = dimensionItems
      newState.height = height
      newState.groupHeights = groupHeights
      newState.groupTops = groupTops
    }

    this.setState(newState)
  }

  zoomWithWheel = (speed, xPosition, deltaY) => {
    this.changeZoom(1.0 + speed * deltaY / 500, xPosition / this.state.width)
  }

  onWheel = (e) => {
    const { traditionalZoom } = this.props

    // prevent default scrolling if a modifier is pressed or the header is fixed
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || this.props.fixedHeader === 'fixed') {
      e.preventDefault()
    }

    // zoom in the time dimension
    if (e.ctrlKey || e.metaKey || e.altKey) {
      const parentPosition = getParentPosition(e.currentTarget)
      const xPosition = e.clientX - parentPosition.x

      this.zoomWithWheel(e.ctrlKey ? 10 : 1, xPosition, e.deltaY)

    // convert vertical zoom to horiziontal
    } else if (e.shiftKey) {
      const scrollComponent = this.refs.scrollComponent
      scrollComponent.scrollLeft += e.deltaY

    // no modifier pressed? we prevented the default in the case of a fixed header,
    // so adjust as needed and scroll or zoom the canvas
    } else if (this.props.fixedHeader === 'fixed') {
      if (e.deltaX !== 0) {
        if (!traditionalZoom) {
          this.refs.scrollComponent.scrollLeft += e.deltaX
        }
      }
      if (e.deltaY !== 0) {
        window.scrollTo(window.pageXOffset, window.pageYOffset + e.deltaY)
        if (traditionalZoom) {
          const parentPosition = getParentPosition(e.currentTarget)
          const xPosition = e.clientX - parentPosition.x

          this.zoomWithWheel(10, xPosition, e.deltaY)
        }
      }
    }
  }

  zoomIn (e) {
    e.preventDefault()

    this.changeZoom(0.75)
  }

  zoomOut (e) {
    e.preventDefault()

    this.changeZoom(1.25)
  }

  changeZoom (scale, offset = 0.5) {
    const { minZoom, maxZoom } = this.props
    const oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom) // min 1 min, max 20 years
    const newVisibleTimeStart = Math.round(this.state.visibleTimeStart + (oldZoom - newZoom) * offset)

    this.props.onTimeChange(newVisibleTimeStart, newVisibleTimeStart + newZoom, this.updateScrollCanvas)
  }

  showPeriod = (from, unit) => {
    let visibleTimeStart = from.valueOf()
    let visibleTimeEnd = moment(from).add(1, unit).valueOf()
    let zoom = visibleTimeEnd - visibleTimeStart

    // can't zoom in more than to show one hour
    if (zoom < 360000) {
      return
    }

    // clicked on the big header and already focused here, zoom out
    if (unit !== 'year' && this.state.visibleTimeStart === visibleTimeStart && this.state.visibleTimeEnd === visibleTimeEnd) {
      let nextUnit = getNextUnit(unit)

      visibleTimeStart = from.startOf(nextUnit).valueOf()
      visibleTimeEnd = moment(visibleTimeStart).add(1, nextUnit)
      zoom = visibleTimeEnd - visibleTimeStart
    }

    this.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, this.updateScrollCanvas)
  }

  selectItem = (item, clickType, e) => {
    if (this.state.selectedItem === item || (this.props.itemTouchSendsClick && clickType === 'touch')) {
      if (item && this.props.onItemClick) {
        this.props.onItemClick(item, e)
      }
    } else {
      this.setState({selectedItem: item})
      if (item && this.props.onItemSelect) {
        this.props.onItemSelect(item, e)
      } else if (item === null && this.props.onItemDeselect) {
        this.props.onItemDeselect(e)
      }
    }
  }

  rowAndTimeFromEvent = (e) => {
    const { headerLabelGroupHeight, headerLabelHeight, dragSnap } = this.props
    const { width, groupHeights, visibleTimeStart, visibleTimeEnd } = this.state
    const lineCount = _length(this.props.groups)

    // get coordinates relative to the component
    const parentPosition = getParentPosition(e.currentTarget)
    const x = e.clientX - parentPosition.x
    const y = e.clientY - parentPosition.y

    // calculate the y coordinate from `groupHeights` and header heights
    let row = 0
    let remainingHeight = y - headerLabelGroupHeight - headerLabelHeight

    while (row < lineCount && remainingHeight - groupHeights[row] > 0) {
      remainingHeight -= groupHeights[row]
      row += 1
    }

    // calculate the x (time) coordinate taking the dragSnap into account
    let time = Math.round(visibleTimeStart + x / width * (visibleTimeEnd - visibleTimeStart))
    time = Math.floor(time / dragSnap) * dragSnap

    return [row, time]
  }

  scrollAreaClick = (e) => {
    // if not clicking on an item

    if (!hasSomeParentTheClass(e.target, 'rct-item')) {
      if (this.state.selectedItem) {
        this.selectItem(null)
      } else if (this.props.onCanvasClick) {
        const [row, time] = this.rowAndTimeFromEvent(e)
        if (row >= 0 && row < this.props.groups.length) {
          const groupId = _get(this.props.groups[row], this.props.keys.groupIdKey)
          this.props.onCanvasClick(groupId, time, e)
        }
      }
    }
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
    this.setState({draggingItem: null, dragTime: null, dragGroupTitle: null})
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

  resizedItem = (item, resizeTime, edge) => {
    this.setState({resizingItem: null, resizingEdge: null, resizeTime: null})
    if (this.props.onItemResize) {
      this.props.onItemResize(item, resizeTime, edge)
    }
  }

  handleMouseDown = (e) => {
    const { topOffset } = this.state
    const { pageY } = e
    const { headerLabelGroupHeight, headerLabelHeight } = this.props
    const headerHeight = headerLabelGroupHeight + headerLabelHeight

    if (pageY - topOffset > headerHeight && e.button === 0) {
      this.setState({isDragging: true, dragStartPosition: e.pageX, dragLastPosition: e.pageX})
    }
  }

  handleMouseMove = (e) => {
    if (this.state.isDragging && !this.state.draggingItem && !this.state.resizingItem) {
      this.refs.scrollComponent.scrollLeft += this.state.dragLastPosition - e.pageX
      this.setState({dragLastPosition: e.pageX})
    }
  }

  handleMouseUp = (e) => {
    const { dragStartPosition } = this.state

    if (Math.abs(dragStartPosition - e.pageX) <= this.props.clickTolerance) {
      this.scrollAreaClick(e)
    }

    this.setState({isDragging: false, dragStartPosition: null, dragLastPosition: null})
  }

  handleCanvasMouseEnter = (e) => {
    const { showCursorLine } = this.props
    if (showCursorLine) {
      this.setState({mouseOverCanvas: true})
    }

    if (this.props.onCanvasMouseEnter) {
      this.props.onCanvasMouseEnter(e)
    }
  }

  handleCanvasMouseLeave = (e) => {
    const { showCursorLine } = this.props
    if (showCursorLine) {
      this.setState({mouseOverCanvas: false})
    }

    if (this.props.onCanvasMouseLeave) {
      this.props.onCanvasMouseLeave(e)
    }
  }

  handleCanvasMouseMove = (e) => {
    const { showCursorLine } = this.props
    const { canvasTimeStart, width, visibleTimeStart, visibleTimeEnd, cursorTime } = this.state
    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3
    const canvasWidth = width * 3
    const { pageX } = e
    const ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth
    const boundingRect = this.refs.scrollComponent.getBoundingClientRect()
    let timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left)

    if (this.props.dragSnap) {
      timePosition = Math.round(timePosition / this.props.dragSnap) * this.props.dragSnap
    }

    if (this.props.onCanvasMouseMove) {
      this.props.onCanvasMouseMove(e)
    }

    if (cursorTime !== timePosition && showCursorLine) {
      this.setState({cursorTime: timePosition, mouseOverCanvas: true})
    }
  }

  todayLine (canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) {
    return (
      <TodayLine canvasTimeStart={canvasTimeStart}
                 canvasTimeEnd={canvasTimeEnd}
                 canvasWidth={canvasWidth}
                 lineHeight={this.props.lineHeight}
                 lineCount={_length(this.props.groups)}
                 height={height}
                 headerHeight={headerHeight}
      />
    )
  }

  cursorLine (cursorTime, canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) {
    return (
      <CursorLine cursorTime={ cursorTime }
                  canvasTimeStart={canvasTimeStart}
                  canvasTimeEnd={canvasTimeEnd}
                  canvasWidth={canvasWidth}
                  lineHeight={this.props.lineHeight}
                  lineCount={_length(this.props.groups)}
                  height={height}
                  headerHeight={headerHeight}
      />
    )
  }

  verticalLines (canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight) {
    return (
      <VerticalLines canvasTimeStart={canvasTimeStart}
                     canvasTimeEnd={canvasTimeEnd}
                     canvasWidth={canvasWidth}
                     lineHeight={this.props.lineHeight}
                     lineCount={_length(this.props.groups)}
                     minUnit={minUnit}
                     timeSteps={timeSteps}
                     fixedHeader={this.props.fixedHeader}
                     height={height}
                     headerHeight={headerHeight}
      />
    )
  }

  horizontalLines (canvasWidth, groupHeights, headerHeight) {
    return (
      <HorizontalLines canvasWidth={canvasWidth}
                       lineCount={_length(this.props.groups)}
                       groupHeights={groupHeights}
                       headerHeight={headerHeight}
      />
    )
  }

  items (canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops) {
    return (
      <Items canvasTimeStart={canvasTimeStart}
             canvasTimeEnd={canvasTimeEnd}
             canvasWidth={canvasWidth}
             lineCount={_length(this.props.groups)}
             dimensionItems={dimensionItems}
             minUnit={minUnit}
             groupHeights={groupHeights}
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
             onItemDoubleClick={this.props.onItemDoubleClick}
             onItemContextMenu={this.props.onItemContextMenu}
             itemResizing={this.resizingItem}
             itemResized={this.resizedItem}
             itemRenderer={this.props.itemRenderer}
             selected={this.props.selected} />
    )
  }

  infoLabel () {
    let label = null

    if (this.state.dragTime) {
      label = `${moment(this.state.dragTime).format('LLL')}, ${this.state.dragGroupTitle}`
    } else if (this.state.resizeTime) {
      label = moment(this.state.resizeTime).format('LLL')
    }

    return label ? <InfoLabel label={label} /> : ''
  }

  header (canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, headerLabelGroupHeight, headerLabelHeight) {
    return (
      <Header canvasTimeStart={canvasTimeStart}
              hasRightSidebar={this.props.rightSidebarWidth > 0}
              canvasTimeEnd={canvasTimeEnd}
              canvasWidth={canvasWidth}
              lineHeight={this.props.lineHeight}
              minUnit={minUnit}
              timeSteps={timeSteps}
              headerLabelGroupHeight={headerLabelGroupHeight}
              headerLabelHeight={headerLabelHeight}
              width={this.state.width}
              zoom={zoom}
              visibleTimeStart={this.state.visibleTimeStart}
              visibleTimeEnd={this.state.visibleTimeEnd}
              fixedHeader={this.props.fixedHeader}
              zIndex={this.props.zIndexStart + 1}
              showPeriod={this.showPeriod}
              headerLabelFormats={this.props.headerLabelFormats}
              subHeaderLabelFormats={this.props.subHeaderLabelFormats} />
    )
  }

  sidebar (height, groupHeights, headerHeight) {
    return (
      <Sidebar groups={this.props.groups}
               groupRenderer={this.props.groupRenderer}
               keys={this.props.keys}

               width={this.props.sidebarWidth}
               lineHeight={this.props.lineHeight}
               groupHeights={groupHeights}
               height={height}
               headerHeight={headerHeight}

               fixedHeader={this.props.fixedHeader}
               zIndex={this.props.zIndexStart + 2}>
        {this.props.sidebarContent || this.props.children}
      </Sidebar>
    )
  }

  rightSidebar (height, groupHeights, headerHeight) {
    return (
      <Sidebar groups={this.props.groups}
               keys={this.props.keys}
               isRightSidebar

               width={this.props.rightSidebarWidth}
               lineHeight={this.props.lineHeight}
               groupHeights={groupHeights}
               height={height}
               headerHeight={headerHeight}

               fixedHeader={this.props.fixedHeader}
               zIndex={this.props.zIndexStart + 2}>
        {this.props.rightSidebarContent}
      </Sidebar>
    )
  }

  stackItems (items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width) {
    // if there are no groups return an empty array of dimensions
    if (groups.length === 0) {
      return {
        dimensionItems: [],
        height: 0,
        groupHeights: {},
        groupTops: 0
      }
    }

    const { keys, dragSnap, lineHeight, headerLabelGroupHeight, headerLabelHeight, stackItems, fullUpdate, itemHeightRatio } = this.props
    const { draggingItem, dragTime, resizingItem, resizingEdge, resizeTime, newGroupOrder } = this.state
    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3
    const canvasWidth = width * 3
    const headerHeight = headerLabelGroupHeight + headerLabelHeight

    const visibleItems = getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys)
    const groupOrders = getGroupOrders(groups, keys)

    let dimensionItems = visibleItems.reduce((memo, item) => {
      const itemId = _get(item, keys.itemIdKey)
      const isDragging = (itemId === draggingItem)
      const isResizing = (itemId === resizingItem)

      let dimension = calculateDimensions({
        itemTimeStart: _get(item, keys.itemTimeStartKey),
        itemTimeEnd: _get(item, keys.itemTimeEndKey),
        isDragging,
        isResizing,
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        dragSnap,
        dragTime,
        resizingItem,
        resizingEdge,
        resizeTime,
        fullUpdate,
        visibleTimeStart,
        visibleTimeEnd
      })

      if (dimension) {
        dimension.top = null
        dimension.order = isDragging ? newGroupOrder : groupOrders[_get(item, keys.itemGroupKey)]
        dimension.stack = !item.isOverlay
        dimension.height = lineHeight * itemHeightRatio
        dimension.isDragging = isDragging

        memo.push({
          id: itemId,
          dimensions: dimension
        })
      }

      return memo
    }, [])

    const stackingMethod = stackItems ? stack : nostack

    const { height, groupHeights, groupTops } = stackingMethod(
      dimensionItems,
      groupOrders,
      lineHeight,
      headerHeight
    )

    return {dimensionItems, height, groupHeights, groupTops}
  }

  handleDoubleClick = (e) => {
    const { canvasTimeStart, width, visibleTimeStart, visibleTimeEnd, groupTops, topOffset } = this.state
    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3
    const canvasWidth = width * 3
    const { pageX, pageY } = e
    const ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth
    const boundingRect = this.refs.scrollComponent.getBoundingClientRect()
    let timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left)
    if (this.props.dragSnap) {
      timePosition = Math.round(timePosition / this.props.dragSnap) * this.props.dragSnap
    }

    let groupIndex = 0
    for (var key of Object.keys(groupTops)) {
      var item = groupTops[key]
      if (pageY - topOffset > item) {
        groupIndex = parseInt(key, 10)
      } else {
        break
      }
    }

    if (this.props.onCanvasDoubleClick) {
      this.props.onCanvasDoubleClick(this.props.groups[groupIndex], timePosition, e)
    }
  }

  handleCanvasContextMenu = (e) => {
    const { canvasTimeStart, width, visibleTimeStart, visibleTimeEnd, groupTops, topOffset } = this.state
    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3
    const canvasWidth = width * 3
    const { pageX, pageY } = e
    const ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth
    const boundingRect = this.refs.scrollComponent.getBoundingClientRect()
    let timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left)
    if (this.props.dragSnap) {
      timePosition = Math.round(timePosition / this.props.dragSnap) * this.props.dragSnap
    }

    let groupIndex = 0
    for (var key of Object.keys(groupTops)) {
      var item = groupTops[key]
      if (pageY - topOffset > item) {
        groupIndex = parseInt(key, 10)
      } else {
        break
      }
    }

    if (this.props.onCanvasContextMenu) {
      e.preventDefault()
      this.props.onCanvasContextMenu(this.props.groups[groupIndex], timePosition, e)
    }
  }

  render () {
    const { items, groups, headerLabelGroupHeight, headerLabelHeight, sidebarWidth, rightSidebarWidth, timeSteps, showCursorLine } = this.props
    const { draggingItem, resizingItem, isDragging, width, visibleTimeStart, visibleTimeEnd, canvasTimeStart, mouseOverCanvas, cursorTime } = this.state
    let { dimensionItems, height, groupHeights, groupTops } = this.state

    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3
    const canvasWidth = width * 3
    const minUnit = getMinUnit(zoom, width, timeSteps)
    const headerHeight = headerLabelGroupHeight + headerLabelHeight

    if (draggingItem || resizingItem) {
      const stackResults = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width)
      dimensionItems = stackResults.dimensionItems
      height = stackResults.height
      groupHeights = stackResults.groupHeights
      groupTops = stackResults.groupTops
    }

    const outerComponentStyle = {
      height: `${height}px`
    }

    const scrollComponentStyle = {
      width: `${width}px`,
      height: `${height + 20}px`,
      cursor: isDragging ? 'move' : 'default'
    }

    const canvasComponentStyle = {
      width: `${canvasWidth}px`,
      height: `${height}px`
    }

    return (
      <div style={this.props.style} ref='container' className='react-calendar-timeline'>
        <div style={outerComponentStyle} className='rct-outer'>
          {sidebarWidth > 0 ? this.sidebar(height, groupHeights, headerHeight) : null}
          <div ref='scrollComponent'
               className='rct-scroll'
               style={scrollComponentStyle}
               onScroll={this.onScroll}
               onWheel={this.onWheel}
               onMouseDown={this.handleMouseDown}
               onMouseMove={this.handleMouseMove}
               onMouseUp={this.handleMouseUp}
          >
            <div ref='canvasComponent'
                 className='rct-canvas'
                 style={canvasComponentStyle}
                 onDoubleClick={ this.handleDoubleClick }
                 onMouseEnter={ this.handleCanvasMouseEnter }
                 onMouseLeave={ this.handleCanvasMouseLeave }
                 onMouseMove={ this.handleCanvasMouseMove }
                 onContextMenu={ this.handleCanvasContextMenu }
            >
              {this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops)}
              {this.verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight)}
              {this.horizontalLines(canvasWidth, groupHeights, headerHeight)}
              {this.todayLine(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight)}
              {mouseOverCanvas && showCursorLine
                ? this.cursorLine(cursorTime, canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight)
                : null}
              {this.infoLabel()}
              {this.header(
                canvasTimeStart,
                zoom,
                canvasTimeEnd,
                canvasWidth,
                minUnit,
                timeSteps,
                headerLabelGroupHeight,
                headerLabelHeight
                )
              }
            </div>
          </div>
          {rightSidebarWidth > 0 ? this.rightSidebar(height, groupHeights, headerHeight) : null}
        </div>
      </div>
    )
  }
}
