import { Dayjs } from 'dayjs'
import { ReactNode, CSSProperties, HTMLProps, MouseEventHandler, Ref, Component, ReactElement } from 'react'
import { Dimension, ItemDimension } from './dimension'
import { ResizeEdge } from '../items/Item'
import { SelectUnits } from '../utility/calendar'

export type Id = number | string

export interface TimelineGroupBase {
  id: Id
  title: ReactNode
  rightTitle?: ReactNode | undefined
  height?: number | undefined
  stackItems?: boolean | undefined
  dimensions?: Dimension | undefined
}

export type GroupOrder = { index: number; group: TimelineGroupBase }
export type GroupOrders = Record<Id, GroupOrder>

export type GroupedItem = {
  index: number
  group: TimelineGroupBase
  items: ItemDimension[]
}

export interface TimelineItemBase<DateType> {
  id: Id
  group: Id
  title?: ReactNode | undefined
  start_time: DateType
  end_time: DateType
  canMove?: boolean | undefined
  canResize?: boolean | 'left' | 'right' | 'both' | undefined
  canChangeGroup?: boolean | undefined
  className?: string | undefined
  style?: CSSProperties | undefined
  itemProps?: HTMLProps<HTMLDivElement>
  isOverlay?: boolean | undefined
  dimensions?: Dimension | undefined
}

export interface TimelineContext {
  timelineWidth: number
  visibleTimeStart: number
  visibleTimeEnd: number
  canvasTimeStart: number
  canvasTimeEnd: number
  canvasWidth: number
  timelineUnit: SelectUnits
}

export type GroupStack = {
  groupHeight: number
  verticalMargin: number
  itemTop: number
}

export interface ItemContext {
  dimensions: {
    collisionLeft: number
    collisionWidth: number
    height: number
    isDragging: boolean
    left: number
    order: GroupOrder
    originalLeft: number
    stack: boolean
    top: number | null
    width: number
  }
  useResizeHandle: boolean
  title: string
  canMove: boolean
  canResizeLeft: boolean
  canResizeRight: boolean
  selected: boolean
  dragging: boolean
  dragStart: {
    x: number
    y: number
  } | null
  dragTime: number | null
  dragGroupDelta: number | null
  resizing: boolean
  resizeEdge: 'left' | 'right' | null
  resizeStart: number | null
  resizeTime: number | null
}

export interface ReactCalendarGroupRendererProps<CustomGroup extends TimelineGroupBase = TimelineGroupBase> {
  group: CustomGroup
  isRightSidebar?: boolean | undefined
}

export interface OnItemDragObjectBase {
  itemId: Id
  time: number
}

export interface OnItemDragObjectMove extends OnItemDragObjectBase {
  eventType: 'move'
  newGroupOrder: number
}

export interface OnItemDragObjectResize extends OnItemDragObjectBase {
  eventType: 'resize'
  edge?: ResizeEdge | undefined
}

export interface TimelineKeys {
  groupIdKey: string
  groupTitleKey: string
  groupLabelKey: string
  groupRightTitleKey: string
  itemIdKey: string
  itemTitleKey: string
  itemDivTitleKey: string
  itemGroupKey: string
  itemTimeStartKey: string
  itemTimeEndKey: string
}

export type dateType = number //| undefined;

export interface TimelineTimeSteps {
  second: number
  minute: number
  hour: number
  day: number
  month: number
  year: number
}

export class TimelineMarkers extends Component {}

export interface CustomMarkerChildrenProps {
  styles: CSSProperties
  date: number
}

export interface MarkerProps {
  date: Date | number
  children?: ((props: CustomMarkerChildrenProps) => ReactNode) | undefined
}

export class CustomMarker extends Component<MarkerProps> {}

export interface TodayMarkerProps extends MarkerProps {
  interval?: number | undefined
}

export class TodayMarker extends Component<TodayMarkerProps> {}

export type CursorMarkerProps = Omit<MarkerProps, 'date'>

export class CursorMarker extends Component<CursorMarkerProps> {}

export interface TimelineHeadersProps {
  children?: ReactNode
  style?: CSSProperties | undefined
  className?: string | undefined
  calendarHeaderStyle?: CSSProperties | undefined
  calendarHeaderClassName?: string | undefined
  headerRef?: Ref<any> | undefined
}

export class TimelineHeaders extends Component<TimelineHeadersProps> {}

export interface SidebarHeaderChildrenFnProps<Data> {
  getRootProps: (propsToOverride?: { style: CSSProperties }) => {
    style: CSSProperties
  }
  data: Data
}

export interface SidebarHeaderProps<Data> {
  variant?: 'left' | 'right' | undefined
  headerData?: Data | undefined
  children: (props: SidebarHeaderChildrenFnProps<Data>) => ReactNode
}

export class SidebarHeader<Data = any> extends Component<SidebarHeaderProps<Data>> {}

export type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'isoWeek' | 'month' | 'year'

export interface IntervalContext {
  interval: Interval
  intervalText: string
}

export interface GetIntervalProps {
  interval?: Interval | undefined
  style?: CSSProperties | undefined
  onClick?: MouseEventHandler | undefined
}

export interface IntervalRenderer<Data> {
  intervalContext: IntervalContext
  getIntervalProps: (props?: GetIntervalProps) => HTMLProps<HTMLDivElement>
  data?: Data | undefined
}

export interface Interval {
  startTime: Dayjs
  endTime: Dayjs
  labelWidth: number
  left: number
}

export interface HeaderContext {
  intervals: Array<{ startTime: Dayjs; endTime: Dayjs }>
  unit: string
}

export interface CustomHeaderPropsChildrenFnProps<Data> {
  timelineContext: TimelineContext
  headerContext: HeaderContext
  getIntervalProps: (props?: GetIntervalProps) => Required<GetIntervalProps> & { key: string | number }
  getRootProps: (propsToOverride?: { style: CSSProperties }) => {
    style: CSSProperties
  }
  showPeriod: (startDate: Dayjs | number, endDate: Dayjs | number) => void
  data: Data
}

export interface CustomHeaderProps<Data> {
  unit?: Unit | undefined
  headerData?: Data | undefined
  height?: number | undefined
  children: (props?: CustomHeaderPropsChildrenFnProps<Data>) => ReactNode
}

export class CustomHeader<Data = any> extends Component<CustomHeaderProps<Data>> {}

// export const defaultKeys: TimelineKeys;
// export const defaultTimeSteps: TimelineTimeSteps;
// export const defaultHeaderFormats: LabelFormat;

// export default class ReactCalendarTimeline<
//       CustomItem extends TimelineItemBase<any> = TimelineItemBase<number>,
//       CustomGroup extends TimelineGroupBase = TimelineGroupBase,
//   > extends Component<ReactCalendarTimelineProps<CustomItem, CustomGroup>> {}

export type ElementWithSecret = ReactElement & {
  props: {
    variant: string
  }
  type: {
    secretKey: string
  }
}
