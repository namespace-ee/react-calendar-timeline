import React, {Component, MouseEvent} from 'react'
import {getSumOffset, getSumScroll} from './utility/dom-helpers'
import Items, {CanResize} from './items/Items'
import Sidebar from './layout/Sidebar'
import Columns from './columns/Columns'
import GroupRows, {RowClickEvent} from './row/GroupRows'
import ScrollElement from './scroll/ScrollElement'
import MarkerCanvas from './markers/MarkerCanvas'
import windowResizeDetector from '../resize-detector/window'
import {
  getMinUnit,
  calculateTimeForXPosition,
  calculateScrollCanvas,
  getCanvasBoundariesFromVisibleTime,
  getCanvasWidth,
  stackTimelineItems, coordinateToTimeRatio,
} from './utility/calendar'
import {_get} from './utility/generic'
import {defaultKeys, defaultTimeSteps} from './default-config'
import {TimelineStateProvider} from './timeline/TimelineStateContext'
import {TimelineMarkersProvider} from './markers/TimelineMarkersContext'
import {TimelineHeadersProvider} from './headers/HeadersContext'
import TimelineHeaders from './headers/TimelineHeaders'
import {DateHeader} from './headers/DateHeader'
import {
  dateType,
  ElementWithSecret,
  Id,
  OnItemDragObjectMove,
  OnItemDragObjectResize,
  ReactCalendarGroupRendererProps,
  TimelineContext,
  TimelineGroupBase,
  TimelineItemBase,
  TimelineKeys,
  TimelineTimeSteps,
  Unit,
} from './types/main'
import { ItemDimension } from './types/dimension'
import dayjs, { Dayjs } from 'dayjs'
import { ItemProps, ResizeEdge } from './items/Item'
// import './Timeline.scss'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

export interface ReactCalendarTimelineRef {
  // Add any methods or properties you want to expose
  getBoundingClientRect(): DOMRect;

  calculateDropCoordinatesToTimeAndGroup(x: number, y: number): { time: number, groupIndex: number };
}

export type OnTimeChange<CustomItem, CustomGroup> = (
  visibleTimeStart: number,
  visibleTimeEnd: number,
  updateScrollCanvas: (
    start: dateType,
    end: dateType,
    forceUpdateDimensions?: boolean,
    items?: CustomItem[],
    groups?: CustomGroup[],
  ) => void,
  unit: Unit,
) => any

export type ReactCalendarTimelineProps<
  CustomItem extends TimelineItemBase<number>,
  CustomGroup extends TimelineGroupBase = TimelineGroupBase,
> = {
  children?: React.ReactNode
  groups: CustomGroup[]
  items: CustomItem[]
  keys: TimelineKeys
  defaultTimeStart: number
  defaultTimeEnd: number
  visibleTimeStart?: dateType
  visibleTimeEnd?: dateType
  selected?: Id[] | undefined
  sidebarWidth: number
  sidebarContent?: React.ReactNode | undefined
  rightSidebarWidth: number
  rightSidebarContent?: React.ReactNode | undefined
  dragSnap?: number
  minResizeWidth?: number | undefined
  lineHeight: number
  itemHeightRatio: number
  minZoom: number
  maxZoom: number
  clickTolerance?: number | undefined
  canMove?: boolean | undefined
  canChangeGroup?: boolean | undefined
  canResize?: CanResize
  useResizeHandle?: boolean | undefined
  canSelect?: boolean
  stackItems: boolean
  traditionalZoom?: boolean | undefined
  itemTouchSendsClick?: boolean | undefined
  timeSteps: TimelineTimeSteps
  scrollRef?: (el: HTMLDivElement) => void
  onItemDrag?(itemDragObject: OnItemDragObjectMove | OnItemDragObjectResize): void
  onItemMove?(itemId: Id, dragTime: number, newGroupOrder: number): void
  onItemResize?(itemId: Id, endTimeOrStartTime: number, edge: ResizeEdge): void
  onItemSelect?(itemId: Id, e: React.SyntheticEvent, time: number): void
  onItemDeselect?(e: React.SyntheticEvent): void
  onItemClick?(itemId: Id, e: React.SyntheticEvent, time: number): void
  onItemDoubleClick?(itemId: Id, e: React.SyntheticEvent, time: number): void
  onItemContextMenu?(itemId: Id, e: React.SyntheticEvent, time: number): void
  onCanvasClick?(groupId: Id, time: number, e: React.SyntheticEvent): void
  onCanvasDoubleClick?(groupId: Id, time: number, e: React.SyntheticEvent): void
  onCanvasContextMenu?(groupId: Id, time: number, e: React.SyntheticEvent): void
  onZoom?(timelineContext: TimelineContext, unit: Unit): void
  moveResizeValidator?: ItemProps<CustomItem>['moveResizeValidator']
  onTimeChange?: OnTimeChange<CustomItem, CustomGroup>
  onBoundsChange?(canvasTimeStart: number, canvasTimeEnd: number): any
  itemRenderer?: ItemProps<CustomItem>['itemRenderer']
  groupRenderer?: ((props: ReactCalendarGroupRendererProps<CustomGroup>) => React.ReactNode) | undefined
  resizeDetector?:
    | {
        addListener?: (x: any) => void
        removeListener: (x: any) => void
      }
    | undefined
  verticalLineClassNamesForTime?: (start: number, end: number) => string[]
  horizontalLineClassNamesForGroup?: ((group: CustomGroup) => string[]) | undefined
  buffer?: number
  // Fields that are in propTypes but not documented
  headerRef?: (el: HTMLDivElement) => void
  className?: string
  style?: React.CSSProperties
  ref?: React.Ref<ReactCalendarTimelineRef>
}

export type ReactCalendarTimelineState<
  CustomItem extends TimelineItemBase<any> = TimelineItemBase<number>,
  CustomGroup extends TimelineGroupBase = TimelineGroupBase,
> = {
  width: number
  visibleTimeStart: number
  visibleTimeEnd: number
  canvasTimeStart: dateType
  canvasTimeEnd: dateType
  selectedItem: Id | null
  dragTime: number | null
  dragGroupTitle: string | null
  resizeTime: number | null
  resizingItem: Id | null
  resizingEdge: 'left' | 'right' | null
  items?: CustomItem[]
  groups?: CustomGroup[]
  draggingItem?: Id | null
  newGroupOrder: number
  dimensionItems: ItemDimension[]
  height: number
  groupHeights: number[]
  groupTops: number[]
}

export default class ReactCalendarTimeline<
  CustomItem extends TimelineItemBase<any> = TimelineItemBase<number>,
  CustomGroup extends TimelineGroupBase = TimelineGroupBase,
> extends Component<
  ReactCalendarTimelineProps<CustomItem, CustomGroup>,
  ReactCalendarTimelineState<CustomItem, CustomGroup>
> {
  static setDayjsLocale = dayjs.locale
  public static defaultProps = {
    sidebarWidth: 150,
    rightSidebarWidth: 0,
    dragSnap: 1000 * 60 * 15, // 15min
    minResizeWidth: 20,
    lineHeight: 30,
    itemHeightRatio: 0.65,
    buffer: 3,

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
    onTimeChange: function (
      visibleTimeStart: dateType,
      visibleTimeEnd: dateType,
      updateScrollCanvas: (visibleTimeStart: dateType, visibleTimeEnd: dateType) => void,
    ) {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
    },
    // called when the canvas area of the calendar changes
    onBoundsChange: null,
    children: null,

    selected: null,
  }

  getTimelineContext = (): TimelineContext => {
    const { width, visibleTimeStart, visibleTimeEnd, canvasTimeStart, canvasTimeEnd } = this.state
    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasWidth = getCanvasWidth(width, this.props.buffer!)
    const minUnit = getMinUnit(zoom, width, this.props.timeSteps)
    return {
      canvasWidth,
      timelineUnit: minUnit,
      timelineWidth: width,
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd,
    }
  }

  getTimelineUnit = () => {
    const { width, visibleTimeStart, visibleTimeEnd } = this.state

    const { timeSteps } = this.props

    const zoom = visibleTimeEnd - visibleTimeStart
    const minUnit = getMinUnit(zoom, width, timeSteps)

    return minUnit as Unit
  }

  state: ReactCalendarTimelineState<CustomItem, CustomGroup>

  constructor(props: ReactCalendarTimelineProps<CustomItem, CustomGroup>) {
    super(props)

    this.getSelected = this.getSelected.bind(this)
    this.hasSelectedItem = this.hasSelectedItem.bind(this)
    this.isItemSelected = this.isItemSelected.bind(this)

    let visibleTimeStart: number | null = null
    let visibleTimeEnd: number | null = null

    if (this.props.defaultTimeStart && this.props.defaultTimeEnd) {
      visibleTimeStart = this.props.defaultTimeStart //.valueOf()
      visibleTimeEnd = this.props.defaultTimeEnd //.valueOf()
    } else if (this.props.visibleTimeStart && this.props.visibleTimeEnd) {
      visibleTimeStart = this.props.visibleTimeStart
      visibleTimeEnd = this.props.visibleTimeEnd
    } else {
      //throwing an error because neither default or visible time props provided
      throw new Error(
        'You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline',
      )
    }

    const [canvasTimeStart, canvasTimeEnd] = getCanvasBoundariesFromVisibleTime(
      visibleTimeStart,
      visibleTimeEnd,
      props.buffer!,
    )
    const state: Partial<ReactCalendarTimelineState> = {
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
      resizingEdge: null,
      newGroupOrder: 0, //CHECK
    }
    const canvasWidth = getCanvasWidth(state.width!, props.buffer!)
    const { dimensionItems, height, groupHeights, groupTops } = stackTimelineItems(
      props.items,
      props.groups,
      canvasWidth,
      state.canvasTimeStart!,
      state.canvasTimeEnd!,
      props.keys,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems,
      state.draggingItem,
      state.resizingItem,
      state.dragTime!,
      state.resizingEdge!,
      state.resizeTime!,
      state.newGroupOrder!,
    )

    state.dimensionItems = dimensionItems
    state.height = height
    state.groupHeights = groupHeights
    state.groupTops = groupTops
    this.state = state as ReactCalendarTimelineState<CustomItem, CustomGroup>
  }

  componentDidMount() {
    this.resize(this.props)

    if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
      this.props.resizeDetector.addListener(this)
    }

    windowResizeDetector.addListener(this)

    //this.lastTouchDistance = null //TODO do we need this?
  }

  componentWillUnmount() {
    if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
      this.props.resizeDetector.removeListener(this)
    }

    windowResizeDetector.removeListener(this)
  }

  static getDerivedStateFromProps(nextProps: ReactCalendarTimelineProps<any>, prevState: ReactCalendarTimelineState) {
    const { visibleTimeStart, visibleTimeEnd, items, groups } = nextProps

    // This is a gross hack pushing items and groups in to state only to allow
    // For the forceUpdate check
    const derivedState = { items, groups }

    // if the items or groups have changed we must re-render
    const forceUpdate = items !== prevState.items || groups !== prevState.groups

    // We are a controlled component
    if (visibleTimeStart && visibleTimeEnd) {
      // Get the new canvas position
      Object.assign(
        derivedState,
        calculateScrollCanvas(visibleTimeStart, visibleTimeEnd, forceUpdate, items, groups, nextProps, prevState),
      )
    } else if (forceUpdate) {
      // Calculate new item stack position as canvas may have changed
      const canvasWidth = getCanvasWidth(prevState.width, nextProps.buffer!)
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
          prevState.newGroupOrder,
        ),
      )
    }

    return derivedState
  }

  scrollComponent: HTMLDivElement | null = null
  scrollHeaderRef: HTMLDivElement | null = null

  componentDidUpdate(_: ReactCalendarTimelineProps<CustomItem, CustomGroup>, prevState: ReactCalendarTimelineState) {
    const newZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const oldZoom = prevState.visibleTimeEnd - prevState.visibleTimeStart

    // are we changing zoom? Report it!
    if (this.props.onZoom && newZoom !== oldZoom) {
      this.props.onZoom(this.getTimelineContext(), this.getTimelineUnit())
    }

    // The bounds have changed? Report it!
    if (this.props.onBoundsChange && this.state.canvasTimeStart !== prevState.canvasTimeStart) {
      this.props.onBoundsChange(this.state.canvasTimeStart, this.state.canvasTimeStart + newZoom * 3)
    }

    // Check the scroll is correct
    const scrollLeft = Math.round(
      (this.state.width * (this.state.visibleTimeStart - this.state.canvasTimeStart)) / newZoom,
    )
    const componentScrollLeft = Math.round(
      (prevState.width * (prevState.visibleTimeStart - prevState.canvasTimeStart)) / oldZoom,
    )

    if (componentScrollLeft !== scrollLeft || this.scrollComponent!.scrollLeft !== scrollLeft) {
      this.scrollComponent!.scrollLeft = scrollLeft
      this.scrollHeaderRef!.scrollLeft = scrollLeft
    }
  }

  resize = (props = this.props) => {
    const { width: containerWidth } = this.container.current?.getBoundingClientRect() ?? { width: 0 }

    const width = containerWidth - props.sidebarWidth - props.rightSidebarWidth
    const canvasWidth = getCanvasWidth(width, props.buffer!)
    const { dimensionItems, height, groupHeights, groupTops } = stackTimelineItems(
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
      this.state.newGroupOrder,
    )

    // this is needed by dragItem since it uses pageY from the drag events
    // if this was in the context of the scrollElement, this would not be necessary

    this.setState({
      width,
      dimensionItems,
      height,
      groupHeights,
      groupTops,
    })
    //initial scroll left is the buffer - 1 (1 is visible area) divided by 2 (2 is the buffer split on the right and left of the timeline)
    const scrollLeft = width * ((props.buffer! - 1) / 2)
    if (this.scrollComponent) {
      this.scrollComponent.scrollLeft = scrollLeft
    }
    if (this.scrollHeaderRef) {
      this.scrollHeaderRef.scrollLeft = scrollLeft
    }
  }

  onScroll = (scrollX: number) => {
    const width = this.state.width

    const canvasTimeStart = this.state.canvasTimeStart

    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart

    const visibleTimeStart = canvasTimeStart + (zoom * scrollX) / width

    if (this.state.visibleTimeStart !== visibleTimeStart || this.state.visibleTimeEnd !== visibleTimeStart + zoom) {
      this.props.onTimeChange?.(
        visibleTimeStart,
        visibleTimeStart + zoom,
        this.updateScrollCanvas,
        this.getTimelineUnit(),
      )
    }
  }

  // called when the visible time changes
  updateScrollCanvas = (
    visibleTimeStart: dateType,
    visibleTimeEnd: dateType,
    forceUpdateDimensions: boolean = false,
    items = this.props.items,
    groups = this.props.groups,
  ) => {
    this.setState(
      calculateScrollCanvas(
        visibleTimeStart,
        visibleTimeEnd,
        forceUpdateDimensions,
        items,
        groups,
        this.props,
        this.state,
      ),
    )
  }

  handleWheelZoom = (speed: number, xPosition: number, deltaY: number) => {
    this.changeZoom(1.0 + (speed * deltaY) / 500, xPosition / this.state.width)
  }

  changeZoom = (scale: number, offset = 0.5) => {
    const { minZoom, maxZoom } = this.props
    const oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom) // min 1 min, max 20 years
    const newVisibleTimeStart = Math.round(this.state.visibleTimeStart + (oldZoom - newZoom) * offset)
    if (this.props.onTimeChange) {
      this.props.onTimeChange(
        newVisibleTimeStart,
        newVisibleTimeStart + newZoom,
        this.updateScrollCanvas,
        this.getTimelineUnit(),
      )
    }
  }

  showPeriod = (from: Dayjs, to: Dayjs) => {
    const visibleTimeStart = from.valueOf()
    const visibleTimeEnd = to.valueOf()

    const zoom = visibleTimeEnd - visibleTimeStart
    // can't zoom in more than to show one hour
    if (zoom < this.props.minZoom) {
      return
    }

    this.props.onTimeChange?.(
      visibleTimeStart,
      visibleTimeStart + zoom,
      this.updateScrollCanvas,
      this.getTimelineUnit(),
    )
  }

  selectItem: ItemProps<CustomItem>['onSelect'] = (item, clickType, e) => {
    if (this.isItemSelected(item) || (this.props.itemTouchSendsClick && clickType === 'touch')) {
      if (item && this.props.onItemClick) {
        const time = this.timeFromItemEvent(e as MouseEvent<HTMLDivElement>)
        this.props.onItemClick(item, e, time)
      }
    } else {
      this.setState({ selectedItem: item })
      if (item && this.props.onItemSelect) {
        const time = this.timeFromItemEvent(e as MouseEvent<HTMLDivElement>)
        this.props.onItemSelect(item, e, time)
      } else if (item === null && this.props.onItemDeselect) {
        this.props.onItemDeselect(e) // this isnt in the docs. Is this function even used?
      }
    }
  }

  doubleClickItem: ItemProps<CustomItem>['onItemDoubleClick'] = (item, e) => {
    if (this.props.onItemDoubleClick) {
      const time = this.timeFromItemEvent(e)
      this.props.onItemDoubleClick(item, e, time)
    }
  }

  contextMenuClickItem: ItemProps<CustomItem>['onContextMenu'] = (item, e) => {
    if (this.props.onItemContextMenu) {
      const time = this.timeFromItemEvent(e)
      this.props.onItemContextMenu(item, e, time)
    }
  }

  // TODO: this is very similar to timeFromItemEvent, aside from which element to get offsets
  // from.  Look to consolidate the logic for determining coordinate to time
  // as well as generalizing how we get time from click on the canvas
  getTimeFromRowClickEvent = (e: MouseEvent<HTMLDivElement>) => {
    const { dragSnap, buffer } = this.props
    const { width, canvasTimeStart, canvasTimeEnd } = this.state
    // this gives us distance from left of row element, so event is in
    // context of the row element, not client or page
    const { offsetX } = e.nativeEvent

    let time = calculateTimeForXPosition(
      canvasTimeStart,

      canvasTimeEnd,
      getCanvasWidth(width, buffer!),
      offsetX,
    )
    time = Math.floor(time / dragSnap!) * dragSnap!

    return time
  }

  timeFromItemEvent = (e: MouseEvent<HTMLDivElement>) => {
    const { width, visibleTimeStart, visibleTimeEnd } = this.state
    const dragSnap = this.props.dragSnap!

    const scrollComponent = this.scrollComponent!
    const { left: scrollX } = scrollComponent.getBoundingClientRect()

    const xRelativeToTimeline = e.clientX - scrollX

    const relativeItemPosition = xRelativeToTimeline / width
    const zoom = visibleTimeEnd - visibleTimeStart
    const timeOffset = relativeItemPosition * zoom

    let time = Math.round(visibleTimeStart + timeOffset)
    time = Math.floor(time / dragSnap) * dragSnap

    return time
  }

  dragItem: ItemProps<CustomItem>['onDrag'] = (item, dragTime, newGroupOrder) => {
    const newGroup = this.props.groups[newGroupOrder]
    const keys = this.props.keys

    this.setState({
      draggingItem: item,
      dragTime: dragTime,
      newGroupOrder: newGroupOrder,
      dragGroupTitle: newGroup ? _get(newGroup, keys.groupLabelKey) : '',
    })

    this.updatingItem({
      eventType: 'move',
      itemId: item,
      time: dragTime,
      newGroupOrder,
    })
  }

  dropItem: ItemProps<CustomItem>['onDrop'] = (item, dragTime, newGroupOrder) => {
    this.setState({ draggingItem: null, dragTime: null, dragGroupTitle: null })
    if (this.props.onItemMove) {
      this.props.onItemMove(item, dragTime, newGroupOrder)
    }
  }

  resizingItem: ItemProps<CustomItem>['onResizing'] = (item, resizeTime, edge) => {
    this.setState({
      resizingItem: item,
      resizingEdge: edge,
      resizeTime: resizeTime,
    })

    this.updatingItem({
      eventType: 'resize',
      itemId: item,
      time: resizeTime,
      edge: edge || undefined,
    })
  }

  resizedItem: ItemProps<CustomItem>['onResized'] = (item, resizeTime, edge, timeDelta) => {
    this.setState({ resizingItem: null, resizingEdge: null, resizeTime: null })
    if (this.props.onItemResize && timeDelta !== 0) {
      this.props.onItemResize(item, resizeTime, edge!)
    }
  }

  updatingItem = ({
    eventType,
    itemId,
    time,
    edge,
    newGroupOrder,
  }: {
    eventType: 'move' | 'resize'
    itemId: Id
    time: number
    edge?: ResizeEdge
    newGroupOrder?: number
  }) => {
    if (this.props.onItemDrag) {
      if (eventType === 'move') {
        this.props.onItemDrag({
          eventType,
          itemId,
          time,
          newGroupOrder: newGroupOrder!,
        })
      } else {
        this.props.onItemDrag({
          eventType,
          itemId,
          time,
          edge,
        })
      }
    }
  }

  columns(
    canvasTimeStart: number,
    canvasTimeEnd: number,
    canvasWidth: number,
    minUnit: keyof TimelineTimeSteps,
    timeSteps: TimelineTimeSteps,
    height: number,
  ) {
    return (
      <Columns
        canvasTimeStart={canvasTimeStart}
        canvasTimeEnd={canvasTimeEnd}
        canvasWidth={canvasWidth}
        lineCount={this.props.groups?.length || 0}
        minUnit={minUnit}
        timeSteps={timeSteps}
        height={height}
        verticalLineClassNamesForTime={this.props.verticalLineClassNamesForTime}
      />
    )
  }

  handleRowClick: RowClickEvent = (e, rowIndex) => {
    // shouldnt this be handled by the user, as far as when to deselect an item?
    if (this.hasSelectedItem()) {
      this.selectItem(null, 'click', e)
    }

    if (this.props.onCanvasClick == null) return

    const time = this.getTimeFromRowClickEvent(e)
    const groupId = _get(this.props.groups[rowIndex], this.props.keys.groupIdKey)
    this.props.onCanvasClick(groupId, time, e)
  }

  handleRowDoubleClick: RowClickEvent = (e, rowIndex) => {
    if (this.props.onCanvasDoubleClick == null) return

    const time = this.getTimeFromRowClickEvent(e)
    const groupId = _get(this.props.groups[rowIndex], this.props.keys.groupIdKey)
    this.props.onCanvasDoubleClick(groupId, time, e)
  }

  handleScrollContextMenu: RowClickEvent = (e, rowIndex) => {
    if (this.props.onCanvasContextMenu == null) return

    const timePosition = this.getTimeFromRowClickEvent(e)

    const groupId = _get(this.props.groups[rowIndex], this.props.keys.groupIdKey)

    if (this.props.onCanvasContextMenu) {
      e.preventDefault()
      this.props.onCanvasContextMenu(groupId, timePosition, e)
    }
  }

  rows(canvasWidth: number, groupHeights: number[], groups: typeof this.props.groups) {
    return (
      <GroupRows
        groups={groups}
        canvasWidth={canvasWidth}
        lineCount={this.props.groups?.length || 0}
        groupHeights={groupHeights}
        clickTolerance={this.props.clickTolerance}
        onRowClick={this.handleRowClick}
        onRowDoubleClick={this.handleRowDoubleClick}
        horizontalLineClassNamesForGroup={this.props.horizontalLineClassNamesForGroup}
        onRowContextClick={this.handleScrollContextMenu}
      />
    )
  }

  items({
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    dimensionItems,
    groupTops,
  }: {
    canvasTimeStart: number
    canvasTimeEnd: number
    canvasWidth: number
    dimensionItems: ItemDimension[]
    groupTops: number[]
  }) {
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
        selectedItem={this.state.selectedItem || undefined}
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
        onItemContextMenu={this.props.onItemContextMenu ? this.contextMenuClickItem : undefined}
        itemResizing={this.resizingItem}
        itemResized={this.resizedItem}
        itemRenderer={this.props.itemRenderer}
        selected={this.props.selected}
        scrollRef={this.scrollComponent}
      />
    )
  }

  handleHeaderRef = (el: HTMLDivElement) => {
    this.scrollHeaderRef = el
    if (this.props.headerRef) {
      this.props.headerRef(el)
    }
  }

  sidebar(height: number, groupHeights: number[]) {
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

  rightSidebar(height: number, groupHeights: number[]) {
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
  isTimelineHeader = (child: ElementWithSecret) => {
    if (child.type === undefined) return false
    return child.type.secretKey === TimelineHeaders.secretKey
  }

  childrenWithProps(
    canvasTimeStart: number,
    canvasTimeEnd: number,
    canvasWidth: number,
    dimensionItems: any[],
    groupHeights: number[],
    groupTops: number[],
    height: number,
    visibleTimeStart: number,
    visibleTimeEnd: number,
    minUnit: keyof TimelineTimeSteps,
    timeSteps: TimelineTimeSteps,
  ) {
    if (!this.props.children) {
      return null
    }

    // convert to an array and remove the nulls
    const childArray = Array.isArray(this.props.children) ? this.props.children.filter((c) => c) : [this.props.children]

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
      timeSteps: timeSteps,
    }

    return React.Children.map(childArray, (child) => {
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
      React.Children.map(this.props.children, (child) => {
        if (this.isTimelineHeader(child as ElementWithSecret)) {
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
    return this.state.selectedItem && !this.props.selected ? [this.state.selectedItem] : this.props.selected || []
  }

  hasSelectedItem() {
    if (!Array.isArray(this.props.selected)) return !!this.state.selectedItem
    return this.props.selected.length > 0
  }

  isItemSelected(itemId: string | null) {
    const selectedItems = this.getSelected()
    return selectedItems.some((i) => i === itemId)
  }

  getScrollElementRef = (el: HTMLDivElement) => {
    if (this.props.scrollRef) {
      this.props.scrollRef(el)
    }
    this.scrollComponent = el
  }

  container = React.createRef<HTMLDivElement>()
  getBoundingClientRect = () => this.scrollComponent!.getBoundingClientRect()
  calculateDropCoordinatesToTimeAndGroup = (x: number, y: number) => {
    const canvasWidth = getCanvasWidth(this.state.width, this.props.buffer!)
    const ratio = coordinateToTimeRatio(this.state.canvasTimeStart, this.state.canvasTimeEnd, canvasWidth)

    const offset = getSumOffset(this.scrollComponent!).offsetLeft
    const scrolls = getSumScroll(this.scrollComponent!)

    const dragTime = (x - offset + scrolls.scrollLeft) * ratio + this.state.canvasTimeStart;
    let groupDelta = 0;
    for (const key of this.state.groupTops) {

      if (y > Number(key)) {
        groupDelta = this.state.groupTops.indexOf(key)
      } else {
        break
      }
    }

    if (!this.props.dragSnap) return {time: dragTime, groupIndex: groupDelta};

    const consideredOffset = dayjs().utcOffset() * 60 * 1000;
    return {
      time: Math.round(dragTime / this.props.dragSnap) * this.props.dragSnap - (consideredOffset % this.props.dragSnap)
      , groupIndex: groupDelta
    }


  }

  render() {
    const { items, groups, sidebarWidth, rightSidebarWidth, timeSteps, traditionalZoom, buffer } = this.props
    const { draggingItem, resizingItem, width, visibleTimeStart, visibleTimeEnd, canvasTimeStart, canvasTimeEnd } =
      this.state
    let { dimensionItems, height, groupHeights, groupTops } = this.state

    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasWidth = getCanvasWidth(width, buffer!)
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
        this.state.newGroupOrder,
      )
      dimensionItems = stackResults.dimensionItems
      height = stackResults.height
      groupHeights = stackResults.groupHeights
      groupTops = stackResults.groupTops
    }

    const outerComponentStyle = {
      height: `${height}px`,
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
              ref={this.container}
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
                  traditionalZoom={!!traditionalZoom}
                  onScroll={this.onScroll}
                >
                  <MarkerCanvas>
                    {this.columns(canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height)}
                    {this.rows(canvasWidth, groupHeights, groups)}
                    {this.items({
                      canvasTimeStart,
                      canvasTimeEnd,
                      canvasWidth,
                      dimensionItems,
                      groupTops,
                    })}
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
                      timeSteps,
                    )}
                  </MarkerCanvas>
                </ScrollElement>
                {rightSidebarWidth > 0 ? this.rightSidebar(height, groupHeights) : null}
              </div>
            </div>
          </TimelineHeadersProvider>
        </TimelineMarkersProvider>
      </TimelineStateProvider>
    )
  }
}
