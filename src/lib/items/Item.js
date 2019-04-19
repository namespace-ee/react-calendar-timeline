import { Component } from 'react'
import PropTypes from 'prop-types'
import interact from 'interactjs'
import moment from 'moment'

import { _get, deepObjectCompare } from '../utility/generic'
import { composeEvents } from '../utility/events'
import { defaultItemRenderer } from './defaultItemRenderer'
import { coordinateToTimeRatio } from '../utility/calendar'
import { getSumScroll, getSumOffset } from '../utility/dom-helpers'
import {
  overridableStyles,
  selectedStyle,
  selectedAndCanMove,
  selectedAndCanResizeLeft,
  selectedAndCanResizeLeftAndDragLeft,
  selectedAndCanResizeRight,
  selectedAndCanResizeRightAndDragRight,
  leftResizeStyle,
  rightResizeStyle
} from './styles'
export default class Item extends Component {
  // removed prop type check for SPEED!
  // they are coming from a trusted component anyway
  // (this complicates performance debugging otherwise)
  static propTypes = {
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    order: PropTypes.object,

    dragSnap: PropTypes.number,
    minResizeWidth: PropTypes.number,
    selected: PropTypes.bool,

    canChangeGroup: PropTypes.bool.isRequired,
    canMove: PropTypes.bool.isRequired,
    canResizeLeft: PropTypes.bool.isRequired,
    canResizeRight: PropTypes.bool.isRequired,

    keys: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,

    onSelect: PropTypes.func,
    onDrag: PropTypes.func,
    onDrop: PropTypes.func,
    onResizing: PropTypes.func,
    onResized: PropTypes.func,
    onContextMenu: PropTypes.func,
    itemRenderer: PropTypes.func,

    itemProps: PropTypes.object,
    canSelect: PropTypes.bool,
    dimensions: PropTypes.object,
    groupTops: PropTypes.array,
    useResizeHandle: PropTypes.bool,
    moveResizeValidator: PropTypes.func,
    onItemDoubleClick: PropTypes.func,

    scrollRef: PropTypes.object
  }

  static defaultProps = {
    selected: false,
    itemRenderer: defaultItemRenderer
  }

  static contextTypes = {
    getTimelineContext: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.cacheDataFromProps(props)

    this.state = {
      interactMounted: false,

      dragging: null,
      dragStart: null,
      preDragPosition: null,
      dragTime: null,
      dragGroupDelta: null,

      resizing: null,
      resizeEdge: null,
      resizeStart: null,
      resizeTime: null
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    var shouldUpdate =
      nextState.dragging !== this.state.dragging ||
      nextState.dragTime !== this.state.dragTime ||
      nextState.dragGroupDelta !== this.state.dragGroupDelta ||
      nextState.resizing !== this.state.resizing ||
      nextState.resizeTime !== this.state.resizeTime ||
      nextProps.keys !== this.props.keys ||
      !deepObjectCompare(nextProps.itemProps, this.props.itemProps) ||
      nextProps.selected !== this.props.selected ||
      nextProps.item !== this.props.item ||
      nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
      nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
      nextProps.canvasWidth !== this.props.canvasWidth ||
      (nextProps.order ? nextProps.order.index : undefined) !== 
        (this.props.order ? this.props.order.index : undefined) ||
      nextProps.dragSnap !== this.props.dragSnap ||
      nextProps.minResizeWidth !== this.props.minResizeWidth ||
      nextProps.canChangeGroup !== this.props.canChangeGroup ||
      nextProps.canSelect !== this.props.canSelect ||
      nextProps.canMove !== this.props.canMove ||
      nextProps.canResizeLeft !== this.props.canResizeLeft ||
      nextProps.canResizeRight !== this.props.canResizeRight ||
      nextProps.dimensions !== this.props.dimensions
    return shouldUpdate
  }

  cacheDataFromProps(props) {
    this.itemId = _get(props.item, props.keys.itemIdKey)
    this.itemTitle = _get(props.item, props.keys.itemTitleKey)
    this.itemDivTitle = props.keys.itemDivTitleKey
      ? _get(props.item, props.keys.itemDivTitleKey)
      : this.itemTitle
    this.itemTimeStart = _get(props.item, props.keys.itemTimeStartKey)
    this.itemTimeEnd = _get(props.item, props.keys.itemTimeEndKey)
  }

  getTimeRatio() {
    const { canvasTimeStart, canvasTimeEnd, canvasWidth } = this.props
    return coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth)
  }

  dragTimeSnap(dragTime, considerOffset) {
    const { dragSnap } = this.props
    if (dragSnap) {
      const offset = considerOffset ? moment().utcOffset() * 60 * 1000 : 0
      return Math.round(dragTime / dragSnap) * dragSnap - offset % dragSnap
    } else {
      return dragTime
    }
  }

  resizeTimeSnap(dragTime) {
    const { dragSnap } = this.props
    if (dragSnap) {
      const endTime = this.itemTimeEnd % dragSnap
      return Math.round((dragTime - endTime) / dragSnap) * dragSnap + endTime
    } else {
      return dragTime
    }
  }

  dragTime(e) {
    const startTime = moment(this.itemTimeStart)

    if (this.state.dragging) {
      return this.dragTimeSnap(this.timeFor(e) + this.state.dragStart.offset, true)
    } else {
      return startTime
    }
  }

  timeFor(e) {
    const ratio = coordinateToTimeRatio(this.props.canvasTimeStart, this.props.canvasTimeEnd, this.props.canvasWidth)

    const offset = getSumOffset(this.props.scrollRef).offsetLeft
    const scrolls = getSumScroll(this.props.scrollRef)
      
    return (e.pageX - offset + scrolls.scrollLeft) * ratio + this.props.canvasTimeStart;
  }

  dragGroupDelta(e) {
    const { groupTops, order } = this.props
    if (this.state.dragging) {
      if (!this.props.canChangeGroup) {
        return 0
      }
      let groupDelta = 0

      const offset = getSumOffset(this.props.scrollRef).offsetTop
      const scrolls = getSumScroll(this.props.scrollRef)
      
      for (var key of Object.keys(groupTops)) {
        var groupTop = groupTops[key]
        if (e.pageY - offset + scrolls.scrollTop > groupTop) {
          groupDelta = parseInt(key, 10) - order.index
        } else {
          break
        }
      }

      if (this.props.order.index + groupDelta < 0) {
        return 0 - this.props.order.index
      } else {
        return groupDelta
      }
    } else {
      return 0
    }
  }

  resizeTimeDelta(e, resizeEdge) {
    const length = this.itemTimeEnd - this.itemTimeStart
    const timeDelta = this.dragTimeSnap(
      (e.pageX - this.state.resizeStart) * this.getTimeRatio()
    )

    if (
      length + (resizeEdge === 'left' ? -timeDelta : timeDelta) <
      (this.props.dragSnap || 1000)
    ) {
      if (resizeEdge === 'left') {
        return length - (this.props.dragSnap || 1000)
      } else {
        return (this.props.dragSnap || 1000) - length
      }
    } else {
      return timeDelta
    }
  }

  mountInteract() {
    const leftResize = this.props.useResizeHandle ? ".rct-item-handler-resize-left" : true
    const rightResize = this.props.useResizeHandle ? ".rct-item-handler-resize-right" : true

    interact(this.item)
      .resizable({
        edges: {
          left: this.canResizeLeft() && leftResize,
          right: this.canResizeRight() && rightResize,
          top: false,
          bottom: false
        },
        enabled:
          this.props.selected && (this.canResizeLeft() || this.canResizeRight())
      })
      .draggable({
        enabled: this.props.selected && this.canMove()
      })
      .styleCursor(false)
      .on('dragstart', e => {
        if (this.props.selected) {
          const clickTime = this.timeFor(e);
          this.setState({
            dragging: true,
            dragStart: { 
              x: e.pageX,
              y: e.pageY,
            offset: this.itemTimeStart - clickTime },
            preDragPosition: { x: e.target.offsetLeft, y: e.target.offsetTop },
            dragTime: this.itemTimeStart,
            dragGroupDelta: 0
          })
        } else {
          return false
        }
      })
      .on('dragmove', e => {
        if (this.state.dragging) {
          let dragTime = this.dragTime(e)
          let dragGroupDelta = this.dragGroupDelta(e)
          if (this.props.moveResizeValidator) {
            dragTime = this.props.moveResizeValidator(
              'move',
              this.props.item,
              dragTime
            )
          }

          if (this.props.onDrag) {
            this.props.onDrag(
              this.itemId,
              dragTime,
              this.props.order.index + dragGroupDelta
            )
          }

          this.setState({
            dragTime: dragTime,
            dragGroupDelta: dragGroupDelta
          })
        }
      })
      .on('dragend', e => {
        if (this.state.dragging) {
          if (this.props.onDrop) {
            let dragTime = this.dragTime(e)

            if (this.props.moveResizeValidator) {
              dragTime = this.props.moveResizeValidator(
                'move',
                this.props.item,
                dragTime
              )
            }

            this.props.onDrop(
              this.itemId,
              dragTime,
              this.props.order.index + this.dragGroupDelta(e)
            )
          }

          this.setState({
            dragging: false,
            dragStart: null,
            preDragPosition: null,
            dragTime: null,
            dragGroupDelta: null
          })
        }
      })
      .on('resizestart', e => {
        if (this.props.selected) {
          this.setState({
            resizing: true,
            resizeEdge: null, // we don't know yet
            resizeStart: e.pageX,
            resizeTime: 0
          })
        } else {
          return false
        }
      })
      .on('resizemove', e => {
        if (this.state.resizing) {
          let resizeEdge = this.state.resizeEdge

          if (!resizeEdge) {
            resizeEdge = e.deltaRect.left !== 0 ? 'left' : 'right'
            this.setState({ resizeEdge })
          }
          let resizeTime = this.resizeTimeSnap(this.timeFor(e))

          if (this.props.moveResizeValidator) {
            resizeTime = this.props.moveResizeValidator(
              'resize',
              this.props.item,
              resizeTime,
              resizeEdge
            )
          }

          if (this.props.onResizing) {
            this.props.onResizing(this.itemId, resizeTime, resizeEdge)
          }

          this.setState({
            resizeTime
          })
        }
      })
      .on('resizeend', e => {
        if (this.state.resizing) {
          const { resizeEdge } = this.state
          let resizeTime = this.resizeTimeSnap(this.timeFor(e))

          if (this.props.moveResizeValidator) {
            resizeTime = this.props.moveResizeValidator(
              'resize',
              this.props.item,
              resizeTime,
              resizeEdge
            )
          }

          if (this.props.onResized) {
            this.props.onResized(
              this.itemId,
              resizeTime,
              resizeEdge,
              this.resizeTimeDelta(e, resizeEdge)
            )
          }
          this.setState({
            resizing: null,
            resizeStart: null,
            resizeEdge: null,
            resizeTime: null
          })
        }
      })
      .on('tap', e => {
        this.actualClick(e, e.pointerType === 'mouse' ? 'click' : 'touch')
      })

    this.setState({
      interactMounted: true
    })
  }

  canResizeLeft(props = this.props) {
    if (!props.canResizeLeft) {
      return false
    }
    let width = parseInt(props.dimensions.width, 10)
    return width >= props.minResizeWidth
  }

  canResizeRight(props = this.props) {
    if (!props.canResizeRight) {
      return false
    }
    let width = parseInt(props.dimensions.width, 10)
    return width >= props.minResizeWidth
  }

  canMove(props = this.props) {
    return !!props.canMove
  }

  componentDidUpdate(prevProps) {
    this.cacheDataFromProps(this.props)
    let { interactMounted } = this.state
    const couldDrag = prevProps.selected && this.canMove(prevProps)
    const couldResizeLeft =
      prevProps.selected && this.canResizeLeft(prevProps)
    const couldResizeRight =
      prevProps.selected && this.canResizeRight(prevProps)
    const willBeAbleToDrag = this.props.selected && this.canMove(this.props)
    const willBeAbleToResizeLeft =
      this.props.selected && this.canResizeLeft(this.props)
    const willBeAbleToResizeRight =
      this.props.selected && this.canResizeRight(this.props)

    if(!!this.item){
      if (this.props.selected && !interactMounted) {
        this.mountInteract()
        interactMounted = true
      }
      if (
        interactMounted &&
        (couldResizeLeft !== willBeAbleToResizeLeft ||
          couldResizeRight !== willBeAbleToResizeRight)
      ) {
        const leftResize = this.props.useResizeHandle ? this.dragLeft : true
        const rightResize = this.props.useResizeHandle ? this.dragRight : true
  
        interact(this.item).resizable({
          enabled: willBeAbleToResizeLeft || willBeAbleToResizeRight,
          edges: {
            top: false,
            bottom: false,
            left: willBeAbleToResizeLeft && leftResize,
            right: willBeAbleToResizeRight && rightResize
          }
        })
      }
      if (interactMounted && couldDrag !== willBeAbleToDrag) {
        interact(this.item).draggable({ enabled: willBeAbleToDrag })
      }
    }
    else{
      interactMounted= false;
    }
    this.setState({
      interactMounted,
    })

  }

  onMouseDown = e => {
    if (!this.state.interactMounted) {
      e.preventDefault()
      this.startedClicking = true
    }
  }

  onMouseUp = e => {
    if (!this.state.interactMounted && this.startedClicking) {
      this.startedClicking = false
      this.actualClick(e, 'click')
    }
  }

  onTouchStart = e => {
    if (!this.state.interactMounted) {
      e.preventDefault()
      this.startedTouching = true
    }
  }

  onTouchEnd = e => {
    if (!this.state.interactMounted && this.startedTouching) {
      this.startedTouching = false
      this.actualClick(e, 'touch')
    }
  }

  handleDoubleClick = e => {
    e.stopPropagation()
    if (this.props.onItemDoubleClick) {
      this.props.onItemDoubleClick(this.itemId, e)
    }
  }

  handleContextMenu = e => {
    if (this.props.onContextMenu) {
      e.preventDefault()
      e.stopPropagation()
      this.props.onContextMenu(this.itemId, e)
    }
  }

  actualClick(e, clickType) {
    if (this.props.canSelect && this.props.onSelect) {
      this.props.onSelect(this.itemId, clickType, e)
    }
  }

  getItemRef = el => (this.item = el)
  getDragLeftRef = el => (this.dragLeft = el)
  getDragRightRef = el => (this.dragRight = el)

  getItemProps = (props = {}) => {
    //TODO: maybe shouldnt include all of these classes
    const classNames =
      'rct-item' +
      (this.props.item.className ? ` ${this.props.item.className}` : '')

    return {
      key: this.itemId,
      ref: this.getItemRef,
      title: this.itemDivTitle,
      className: classNames + ` ${props.className ? props.className : ''}`,
      onMouseDown: composeEvents(this.onMouseDown, props.onMouseDown),
      onMouseUp: composeEvents(this.onMouseUp, props.onMouseUp),
      onTouchStart: composeEvents(this.onTouchStart, props.onTouchStart),
      onTouchEnd: composeEvents(this.onTouchEnd, props.onTouchEnd),
      onDoubleClick: composeEvents(this.handleDoubleClick, props.onDoubleClick),
      onContextMenu: composeEvents(this.handleContextMenu, props.onContextMenu),
      style: Object.assign({}, this.getItemStyle(props))
    }
  }

  getResizeProps = (props = {}) => {
    let leftName = "rct-item-handler rct-item-handler-left rct-item-handler-resize-left"
    if (props.leftClassName) {
      leftName += ` ${props.leftClassName}`
    }

    let rightName = "rct-item-handler rct-item-handler-right rct-item-handler-resize-right"
    if (props.rightClassName) {
      rightName += ` ${props.rightClassName}`
    }
    return {
      left: {
        ref: this.getDragLeftRef,
        className: leftName,
        style: Object.assign({}, leftResizeStyle, props.leftStyle)
      },
      right: {
        ref: this.getDragRightRef,
        className: rightName,
        style: Object.assign({}, rightResizeStyle, props.rightStyle)
      }
    }
  }

  getItemStyle(props) {
    const dimensions = this.props.dimensions

    const baseStyles = {
      position: 'absolute',
      boxSizing: 'border-box',
      left: `${dimensions.left}px`,
      top: `${dimensions.top}px`,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      lineHeight: `${dimensions.height}px`
    }

    const finalStyle = Object.assign(
      {},
      overridableStyles,
      this.props.selected ? selectedStyle : {},
      this.props.selected & this.canMove(this.props) ? selectedAndCanMove : {},
      this.props.selected & this.canResizeLeft(this.props)
        ? selectedAndCanResizeLeft
        : {},
      this.props.selected & this.canResizeLeft(this.props) & this.state.dragging
        ? selectedAndCanResizeLeftAndDragLeft
        : {},
      this.props.selected & this.canResizeRight(this.props)
        ? selectedAndCanResizeRight
        : {},
      this.props.selected &
      this.canResizeRight(this.props) &
      this.state.dragging
        ? selectedAndCanResizeRightAndDragRight
        : {},
      props.style,
      baseStyles
    )
    return finalStyle
  }

  render() {
    if (typeof this.props.order === 'undefined' || this.props.order === null) {
      return null
    }

    const timelineContext = this.context.getTimelineContext()
    const itemContext = {
      dimensions: this.props.dimensions,
      useResizeHandle: this.props.useResizeHandle,
      title: this.itemTitle,
      canMove: this.canMove(this.props),
      canResizeLeft: this.canResizeLeft(this.props),
      canResizeRight: this.canResizeRight(this.props),
      selected: this.props.selected,
      dragging: this.state.dragging,
      dragStart: this.state.dragStart,
      dragTime: this.state.dragTime,
      dragGroupDelta: this.state.dragGroupDelta,
      resizing: this.state.resizing,
      resizeEdge: this.state.resizeEdge,
      resizeStart: this.state.resizeStart,
      resizeTime: this.state.resizeTime,
      width: this.props.dimensions.width
    }

    return this.props.itemRenderer({
      item: this.props.item,
      timelineContext,
      itemContext,
      getItemProps: this.getItemProps,
      getResizeProps: this.getResizeProps
    })
  }
}
