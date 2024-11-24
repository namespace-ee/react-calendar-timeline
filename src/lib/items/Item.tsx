import {
  Component, createRef,
  CSSProperties,
  HTMLAttributes,
  LegacyRef,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  TouchEvent,
  TouchEventHandler,
} from 'react'
import interact from 'interactjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { _get } from '../utility/generic'
import { composeEvents } from '../utility/events'
import { defaultItemRenderer } from './defaultItemRenderer'
import { coordinateToTimeRatio } from '../utility/calendar'
import { getSumOffset, getSumScroll } from '../utility/dom-helpers'
import {
  leftResizeStyle,
  overridableStyles,
  rightResizeStyle,
  selectedAndCanMove,
  selectedAndCanResizeLeft,
  selectedAndCanResizeLeftAndDragLeft,
  selectedAndCanResizeRight,
  selectedAndCanResizeRightAndDragRight,
  selectedStyle,
} from './styles'
import { Id, ItemContext, TimelineItemBase, TimelineKeys } from '../types/main'
import { TimelineContext, TimelineContextType } from '../timeline/TimelineStateContext'
import isEqual from 'lodash/isEqual'

dayjs.extend(utc)

export type ResizeEdge = 'left' | 'right'

type OnSelect = (
  itemId: string | null,
  clickType: 'click' | 'touch',
  event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>,
) => void

export type ItemProps<CustomItem extends TimelineItemBase<number>> = {
  canvasTimeStart: number
  canvasTimeEnd: number
  canvasWidth: number
  minResizeWidth?: number
  order: { index: number }
  dragSnap?: number
  itemProps?: HTMLAttributes<HTMLDivElement>
  onDrag: (itemId: string, dragTime: number, newGroupOrder: number) => void
  onDrop: (itemId: string, dragTime: number, newGroupOrder: number) => void
  onResizing: (itemId: string, time: number, resizeEdge: ResizeEdge | null) => void
  onResized: (itemId: string, time: number, resizeEdge: ResizeEdge | null, delta: number) => void
  moveResizeValidator?: (
    action: 'move' | 'resize',
    item: TimelineItemBase<any>,
    time: number,
    resizeEdge?: ResizeEdge | null,
  ) => number
  itemRenderer?: (props: ItemRendererProps<CustomItem>) => ReactNode
  selected: boolean
  canChangeGroup?: boolean
  canMove?: boolean
  canSelect?: boolean
  dimensions?: ItemContext['dimensions']
  useResizeHandle?: boolean
  canResizeLeft: any
  canResizeRight: any

  keys: TimelineKeys
  item: CustomItem

  onSelect: OnSelect
  onContextMenu?: (i: Id, e: MouseEvent<HTMLDivElement>) => void
  groupTops: any
  onItemDoubleClick: (i: Id, e: MouseEvent<HTMLDivElement>) => void
  scrollRef: HTMLElement | null
}

type DragProps = { offset: number; x: number; y: number }

interface ItemState {
  interactMounted: boolean
  dragging: boolean
  dragStart: null | DragProps
  preDragPosition: { x: number; y: number } | null
  dragTime: null | number
  dragGroupDelta: null | number
  resizing: boolean
  resizeEdge: null | 'left' | 'right'
  resizeStart: null | number
  resizeTime: null | number
}

export type GetItemPropsParams = HTMLAttributes<HTMLDivElement> & {
  leftClassName?: string
  rightClassName?: string
  leftStyle?: CSSProperties
  rightStyle?: CSSProperties
}

export interface ItemRendererProps<CustomItem extends TimelineItemBase<number>> {
  item: CustomItem
  timelineContext: TimelineContextType
  itemContext: ItemContext
  getItemProps: (params: GetItemPropsParams) => HTMLAttributes<HTMLDivElement> & { key:string, ref:LegacyRef<HTMLDivElement> }
  getResizeProps: GetResizeProps
}
type GetResizePropsDirection = {
  ref: LegacyRef<HTMLDivElement>
  className: string
  style: CSSProperties
}
export type GetResizeProps = (params?: GetItemPropsParams) => {
  right: GetResizePropsDirection
  left: GetResizePropsDirection
}

export default class Item<CustomItem extends TimelineItemBase<number>> extends Component<
  ItemProps<CustomItem>,
  ItemState
> {
  static defaultProps = {
    selected: false,
    itemRenderer: defaultItemRenderer,
  }
  declare context: TimelineContextType
  static contextType = TimelineContext

  state: ItemState = {
    interactMounted: false,

    dragging: false,
    dragStart: null,
    preDragPosition: null,
    dragTime: null,
    dragGroupDelta: null,

    resizing: false,
    resizeEdge: null,
    resizeStart: null,
    resizeTime: null,
  }
  private itemId: string = ''
  private itemTitle: string = ''
  private itemDivTitle?: string
  private itemTimeStart?: number
  private itemTimeEnd?: number
private itemRef  = createRef<HTMLDivElement>();
  private dragLeft?: HTMLElement
  private dragRight?: HTMLElement
  private startedClicking: boolean = false
  private startedTouching: boolean = false
  private dragInProgress: boolean = false

  constructor(props: ItemProps<CustomItem>) {
    super(props)

    this.cacheDataFromProps(props)
  }

  shouldComponentUpdate(nextProps: ItemProps<CustomItem>, nextState: ItemState) {
    /*const shouldUpdate =
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
      nextProps.dimensions !== this.props.dimensions*/
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
  }

  cacheDataFromProps(props: ItemProps<CustomItem>) {
    this.itemId = _get(props.item, props.keys.itemIdKey)
    this.itemTitle = _get(props.item, props.keys.itemTitleKey)
    this.itemDivTitle = props.keys.itemDivTitleKey ? _get(props.item, props.keys.itemDivTitleKey) : this.itemTitle
    this.itemTimeStart = _get(props.item, props.keys.itemTimeStartKey)
    this.itemTimeEnd = _get(props.item, props.keys.itemTimeEndKey)
  }

  getTimeRatio() {
    const { canvasTimeStart, canvasTimeEnd, canvasWidth } = this.props
    return coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth)
  }

  dragTimeSnap(dragTime: number, considerOffset?: boolean) {
    const { dragSnap } = this.props
    if (dragSnap) {
      const offset = considerOffset ? dayjs().utcOffset() * 60 * 1000 : 0
      return Math.round(dragTime / dragSnap) * dragSnap - (offset % dragSnap)
    } else {
      return dragTime
    }
  }

  resizeTimeSnap(dragTime: number) {
    const { dragSnap } = this.props
    if (dragSnap) {
      const endTime = this.itemTimeEnd! % dragSnap
      return Math.round((dragTime - endTime) / dragSnap) * dragSnap + endTime
    } else {
      return dragTime
    }
  }

  dragTime(e: MouseEvent) {
    const startTime = dayjs(this.itemTimeStart)

    if (this.state.dragging) {
      return this.dragTimeSnap(this.timeFor(e) + this.state.dragStart!.offset, true)
    } else {
      return startTime.valueOf()
    }
  }

  timeFor(e: MouseEvent) {
    const ratio = coordinateToTimeRatio(this.props.canvasTimeStart, this.props.canvasTimeEnd, this.props.canvasWidth)

    const offset = getSumOffset(this.props.scrollRef!).offsetLeft
    const scrolls = getSumScroll(this.props.scrollRef!)

    return (e.pageX - offset + scrolls.scrollLeft) * ratio + this.props.canvasTimeStart
  }

  dragGroupDelta(e: MouseEvent) {
    const { groupTops, order } = this.props
    if (this.state.dragging) {
      if (!this.props.canChangeGroup) {
        return 0
      }
      let groupDelta = 0

      const offset = getSumOffset(this.props.scrollRef!).offsetTop
      const scrolls = getSumScroll(this.props.scrollRef!)

      for (const key of Object.keys(groupTops)) {
        const groupTop = groupTops[key]
        if (e.pageY - offset + scrolls.scrollTop > groupTop) {
          groupDelta = parseInt(key, 10) - order!.index
        } else {
          break
        }
      }

      if (this.props.order!.index + groupDelta < 0) {
        return 0 - this.props.order.index
      } else {
        return groupDelta
      }
    } else {
      return 0
    }
  }

  resizeTimeDelta(e: MouseEvent, resizeEdge: ResizeEdge | null) {
    const length = this.itemTimeEnd! - this.itemTimeStart!
    const timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart!) * this.getTimeRatio())

    if (length + (resizeEdge === 'left' ? -timeDelta : timeDelta) < (this.props.dragSnap || 1000)) {
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
    const leftResize = this.props.useResizeHandle ? '.rct-item-handler-resize-left' : true
    const rightResize = this.props.useResizeHandle ? '.rct-item-handler-resize-right' : true

    interact(this.itemRef.current!)
      .resizable({
        edges: {
          left: this.canResizeLeft() && leftResize,
          right: this.canResizeRight() && rightResize,
          top: false,
          bottom: false,
        },
        enabled: this.props.selected && (this.canResizeLeft() || this.canResizeRight()),
      })
      .draggable({
        enabled: this.props.selected && this.canMove(),
      })
      .styleCursor(false)
      .on('dragstart', (e) => {
        if (this.props.selected) {
          this.dragInProgress = true
          this.fireInteractEvent(true)
          const clickTime = this.timeFor(e)
          this.setState({
            dragging: true,
            dragStart: {
              x: e.pageX,
              y: e.pageY,
              offset: this.itemTimeStart! - clickTime,
            },
            preDragPosition: { x: e.target.offsetLeft, y: e.target.offsetTop },
            dragTime: this.itemTimeStart!,
            dragGroupDelta: 0,
          })
        } else {
          return false
        }
      })
      .on('dragmove', (e) => {
        if (this.state.dragging) {
          this.setState((state) => {
            // stop updating when dropped already
            if (!this.dragInProgress) {
              return { ...state }
            }
            let dragTime = this.dragTime(e)
            const dragGroupDelta = this.dragGroupDelta(e)
            if (this.props.moveResizeValidator) {
              dragTime = this.props.moveResizeValidator('move', this.props.item, dragTime)
            }

            if (this.props.onDrag) {
              this.props.onDrag(this.itemId!, dragTime, this.props.order.index + dragGroupDelta)
            }

            return {
              dragTime: dragTime,
              dragGroupDelta: dragGroupDelta,
            }
          })
        }
      })
      .on('dragend', (e) => {
        if (this.state.dragging) {
          if (this.props.onDrop) {
            this.dragInProgress = false
            this.fireInteractEvent(false)
            let dragTime = this.dragTime(e)

            if (this.props.moveResizeValidator) {
              dragTime = this.props.moveResizeValidator('move', this.props.item, dragTime)
            }

            this.props.onDrop(this.itemId!, dragTime, this.props.order.index + this.dragGroupDelta(e))
          }

          this.setState({
            dragging: false,
            dragStart: null,
            preDragPosition: null,
            dragTime: null,
            dragGroupDelta: null,
          })
        }
      })
      .on('resizestart', (e) => {
        if (this.props.selected) {
          this.fireInteractEvent(true)
          this.setState({
            resizing: true,
            resizeEdge: null, // we don't know yet
            resizeStart: e.pageX,
            resizeTime: 0,
          })
        } else {
          return false
        }
      })
      .on('resizemove', (e) => {
        if (this.state.resizing) {
          let resizeEdge = this.state.resizeEdge

          if (!resizeEdge) {
            resizeEdge = e.deltaRect.left !== 0 ? 'left' : 'right'
            this.setState({ resizeEdge })
          }
          let resizeTime = this.resizeTimeSnap(this.timeFor(e))

          if (this.props.moveResizeValidator) {
            resizeTime = this.props.moveResizeValidator('resize', this.props.item, resizeTime, resizeEdge)
          }

          if (this.props.onResizing) {
            this.props.onResizing(this.itemId, resizeTime, resizeEdge)
          }

          this.setState({
            resizeTime,
          })
        }
      })
      .on('resizeend', (e) => {
        if (this.state.resizing) {
          this.fireInteractEvent(false)
          const { resizeEdge } = this.state
          let resizeTime = this.resizeTimeSnap(this.timeFor(e))

          if (this.props.moveResizeValidator) {
            resizeTime = this.props.moveResizeValidator('resize', this.props.item, resizeTime, resizeEdge)
          }

          if (this.props.onResized) {
            this.props.onResized(this.itemId, resizeTime, resizeEdge, this.resizeTimeDelta(e, resizeEdge))
          }
          this.setState({
            resizing: false,
            resizeStart: null,
            resizeEdge: null,
            resizeTime: null,
          })
        }
      })
      .on('tap', (e) => {
        this.actualClick(e, e.pointerType === 'mouse' ? 'click' : 'touch')
      })

    this.setState({
      interactMounted: true,
    })
  }

  canResizeLeft(props = this.props) {
    if (!props.canResizeLeft || props.minResizeWidth === undefined) {
      return false
    }
    const width = parseInt(props.dimensions!.width?.toString(), 10)
    return width >= props.minResizeWidth
  }

  canResizeRight(props = this.props) {
    if (!props.canResizeRight || props.minResizeWidth === undefined) {
      return false
    }
    const width = parseInt(props.dimensions!.width?.toString(), 10)
    return width >= props.minResizeWidth
  }

  canMove(props = this.props) {
    return !!props.canMove
  }
  fireInteractEvent = (itemInteraction: boolean) => {
    if (this.itemRef && this.itemRef.current) {
      const event = new CustomEvent('itemInteraction', {
        bubbles: true,
        detail: {
          itemInteraction,
        },
      })
      this.itemRef.current?.dispatchEvent(event)
    }
  }

  componentDidUpdate(prevProps: ItemProps<CustomItem>) {
    this.cacheDataFromProps(this.props)
    let { interactMounted } = this.state
    const couldDrag = prevProps.selected && this.canMove(prevProps)
    const couldResizeLeft = prevProps.selected && this.canResizeLeft(prevProps)
    const couldResizeRight = prevProps.selected && this.canResizeRight(prevProps)
    const willBeAbleToDrag = this.props.selected && this.canMove(this.props)
    const willBeAbleToResizeLeft = this.props.selected && this.canResizeLeft(this.props)
    const willBeAbleToResizeRight = this.props.selected && this.canResizeRight(this.props)

    if (this.itemRef && this.itemRef.current) {
      if (this.props.selected && !interactMounted) {
        this.mountInteract()
        interactMounted = true
      }
      if (
        interactMounted &&
        (couldResizeLeft !== willBeAbleToResizeLeft || couldResizeRight !== willBeAbleToResizeRight)
      ) {
        const leftResize = this.props.useResizeHandle ? this.dragLeft : true
        const rightResize = this.props.useResizeHandle ? this.dragRight : true

        interact(this.itemRef.current).resizable({
          enabled: willBeAbleToResizeLeft || willBeAbleToResizeRight,
          edges: {
            top: false,
            bottom: false,
            left: willBeAbleToResizeLeft && leftResize,
            right: willBeAbleToResizeRight && rightResize,
          },
        })
      }
      if (interactMounted && couldDrag !== willBeAbleToDrag) {
        interact(this.itemRef.current).draggable({ enabled: willBeAbleToDrag })
      }
    } else {
      interactMounted = false
    }
    if (interactMounted !== this.state.interactMounted) {
      this.setState({
        interactMounted,
      })
    }
  }

  onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!this.state.interactMounted) {
      e.preventDefault()
      this.startedClicking = true
    }
  }

  onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!this.state.interactMounted && this.startedClicking) {
      this.startedClicking = false
      this.actualClick(e, 'click')
    }
  }

  onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!this.state.interactMounted) {
      e.preventDefault()
      this.startedTouching = true
    }
  }

  onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!this.state.interactMounted && this.startedTouching) {
      this.startedTouching = false
      this.actualClick(e, 'touch')
    }
  }

  handleDoubleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    if (this.props.onItemDoubleClick) {
      this.props.onItemDoubleClick(this.itemId, e)
    }
  }

  handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    if (this.props.onContextMenu) {
      e.preventDefault()
      e.stopPropagation()
      this.props.onContextMenu(this.itemId, e)
    }
  }

  actualClick(e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>, clickType: 'click' | 'touch') {
    if (this.props.canSelect && this.props.onSelect) {
      this.props.onSelect(this.itemId!, clickType, e)
    }
  }


  //getItemRef = (el: HTMLElement) => (this.item = el)
  getDragLeftRef = (el: HTMLElement) => (this.dragLeft = el)
  getDragRightRef = (el: HTMLElement) => (this.dragRight = el)

  getItemProps = (props: GetItemPropsParams = {}) => {
    //TODO: maybe shouldnt include all of these classes
    const classNames = 'rct-item' + (this.props.item.className ? ` ${this.props.item.className}` : '')

    return {
      key: this.itemId,
      ref: this.itemRef,
      title: this.itemDivTitle,
      className: classNames + ` ${props.className ? props.className : ''}`,
      onMouseDown: composeEvents(this.onMouseDown, props.onMouseDown),
      onMouseUp: composeEvents(this.onMouseUp, props.onMouseUp),
      onTouchStart: composeEvents(this.onTouchStart, props.onTouchStart),
      onTouchEnd: composeEvents(this.onTouchEnd, props.onTouchEnd),
      onDoubleClick: composeEvents(this.handleDoubleClick, props.onDoubleClick),
      onContextMenu: composeEvents(this.handleContextMenu, props.onContextMenu),
      style: Object.assign({}, this.getItemStyle(props)),
    }
  }

  getResizeProps = (props: GetItemPropsParams = {} as GetItemPropsParams) => {
    let leftName = 'rct-item-handler rct-item-handler-left rct-item-handler-resize-left'
    if (props.leftClassName) {
      leftName += ` ${props.leftClassName}`
    }

    let rightName = 'rct-item-handler rct-item-handler-right rct-item-handler-resize-right'
    if (props.rightClassName) {
      rightName += ` ${props.rightClassName}`
    }
    return {
      left: {
        ref: this.getDragLeftRef,
        className: leftName,
        style: Object.assign({}, leftResizeStyle, props.leftStyle),
      },
      right: {
        ref: this.getDragRightRef,
        className: rightName,
        style: Object.assign({}, rightResizeStyle, props.rightStyle),
      },
    } as ReturnType<GetResizeProps>
  }

  getItemStyle(props: GetItemPropsParams) {
    const dimensions = this.props.dimensions!

    const baseStyles = {
      position: 'absolute',
      boxSizing: 'border-box',
      left: `${dimensions.left}px`,
      top: `${dimensions.top}px`,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      lineHeight: `${dimensions.height}px`,
    }

    const finalStyle = Object.assign(
      {},
      overridableStyles,
      this.props.selected ? selectedStyle : {},
      this.props.selected && this.canMove(this.props) ? selectedAndCanMove : {},
      this.props.selected && this.canResizeLeft(this.props) ? selectedAndCanResizeLeft : {},
      this.props.selected && this.canResizeLeft(this.props) && this.state.dragging
        ? selectedAndCanResizeLeftAndDragLeft
        : {},
      this.props.selected && this.canResizeRight(this.props) ? selectedAndCanResizeRight : {},
      this.props.selected && this.canResizeRight(this.props) && this.state.dragging
        ? selectedAndCanResizeRightAndDragRight
        : {},
      props.style,
      baseStyles,
    )
    return finalStyle
  }

  render() {
    if (typeof this.props.order === 'undefined' || this.props.order === null) {
      return null
    }

    const timelineContext = this.context
    const itemContext: ItemContext = {
      dimensions: this.props.dimensions!,
      useResizeHandle: !!this.props.useResizeHandle,
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
    }
    if(!this.props.itemRenderer){
      return defaultItemRenderer({
        item: this.props.item,
        timelineContext,
        itemContext,
        getItemProps: this.getItemProps,
        getResizeProps: this.getResizeProps,
      })
    } else return this.props.itemRenderer({
      item: this.props.item,
      timelineContext,
      itemContext,
      getItemProps: this.getItemProps,
      getResizeProps: this.getResizeProps,
    })
  }
}
