import { Dayjs } from 'dayjs'
import * as React from 'react'
import reactCalendarTimeline from '../../../index'
import { Dimension, ItemDimension } from './dimension'
import { number } from 'prop-types'

export type Id = number | string

export interface TimelineGroupBase {
  id: Id
  title: React.ReactNode
  rightTitle?: React.ReactNode | undefined
  height?: number | undefined
  stackItems?: boolean | undefined
  dimensions?: Dimension | undefined
}
export type GroupOrders = Record<
  Id,
  { index: number; group: TimelineGroupBase }
>

export type GroupedItem = {
  index: number
  group: TimelineGroupBase
  items: ItemDimension[]
}

export interface TimelineItemBase<DateType> {
  id: Id
  group: Id
  title?: React.ReactNode | undefined
  start_time: DateType
  end_time: DateType
  canMove?: boolean | undefined
  canResize?: boolean | 'left' | 'right' | 'both' | undefined
  canChangeGroup?: boolean | undefined
  className?: string | undefined
  style?: React.CSSProperties | undefined
  itemProps?: React.HTMLAttributes<HTMLDivElement> | undefined
  isOverlay?: boolean | undefined
  dimensions?: Dimension | undefined
}

export type TimelineItem<
  CustomItemFields,
  DateType = number,
> = TimelineItemBase<DateType> & CustomItemFields
export type TimelineGroup<CustomGroupFields> = TimelineGroupBase &
  CustomGroupFields

export interface TimelineContext {
  timelineWidth: number
  visibleTimeStart: number
  visibleTimeEnd: number
  canvasTimeStart: number
  canvasTimeEnd: number
  canvasWidth: number
  timelineUnit: string
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
    order: {
      group: {
        id: string
      }
      index: number
    }
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
  }
  dragTime: number
  dragGroupDelta: number
  resizing: boolean
  resizeEdge: 'left' | 'right'
  resizeStart: number
  resizeTime: number
  width: boolean
}

export interface TimeFormat {
  long: string
  mediumLong: string
  medium: string
  short: string
}

export interface LabelFormat {
  year: TimeFormat
  month: TimeFormat
  week: TimeFormat
  day: TimeFormat
  hour: TimeFormat
  minute: TimeFormat
}

export interface ItemRendererGetItemPropsReturnType {
  key: Id
  ref: React.Ref<any>
  className: string
  onMouseDown: React.MouseEventHandler
  onMouseUp: React.MouseEventHandler
  onTouchStart: React.TouchEventHandler
  onTouchEnd: React.TouchEventHandler
  onDoubleClick: React.MouseEventHandler
  onContextMenu: React.ReactEventHandler
  style: React.CSSProperties
}

export type GetItemsProps = Partial<
  Omit<ItemRendererGetItemPropsReturnType, 'key' | 'ref'>
>

export interface ItemRendererGetResizePropsReturnType {
  left?:
    | {
        ref: React.Ref<any>
        className: string
        style: React.CSSProperties
      }
    | undefined
  right?:
    | {
        ref: React.Ref<any>
        className: string
        style: React.CSSProperties
      }
    | undefined
}

export type GetResizeProps = {
  leftStyle?: React.CSSProperties | undefined
  rightStyle?: React.CSSProperties | undefined
  leftClassName?: string | undefined
  rightClassName?: string | undefined
}

export interface ReactCalendarItemRendererProps<
  CustomItem extends TimelineItemBase<any> = TimelineItemBase<number>,
> {
  item: CustomItem
  itemContext: ItemContext
  getItemProps: (props: GetItemsProps) => {
    key: Id
    ref: React.Ref<any>
    className: string
    onMouseDown: React.MouseEventHandler
    onMouseUp: React.MouseEventHandler
    onTouchStart: React.TouchEventHandler
    onTouchEnd: React.TouchEventHandler
    onDoubleClick: React.MouseEventHandler
    onContextMenu: React.ReactEventHandler
    style: React.CSSProperties
  }
  getResizeProps: (
    propsOverride?: GetResizeProps,
  ) => ItemRendererGetResizePropsReturnType
}

export interface ReactCalendarGroupRendererProps<
  CustomGroup extends TimelineGroupBase = TimelineGroupBase,
> {
  group: CustomGroup
  isRightSidebar?: boolean | undefined
}

export interface OnItemDragObjectBase {
  eventType: 'move' | 'resize'
  itemId: Id
  time: number
}

export interface OnItemDragObjectMove extends OnItemDragObjectBase {
  eventType: 'move'
  newGroupOrder: number
}

export interface OnItemDragObjectResize extends OnItemDragObjectBase {
  eventType: 'resize'
  edge?: 'left' | 'right' | undefined
}

export interface TimelineKeys {
  groupIdKey: string
  groupTitleKey: string
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

export class TimelineMarkers extends React.Component {}

export interface CustomMarkerChildrenProps {
  styles: React.CSSProperties
  date: number
}
export interface MarkerProps {
  date: Date | number
  children?: ((props: CustomMarkerChildrenProps) => React.ReactNode) | undefined
}

export class CustomMarker extends React.Component<MarkerProps> {}

export interface TodayMarkerProps extends MarkerProps {
  interval?: number | undefined
}
export class TodayMarker extends React.Component<TodayMarkerProps> {}

export type CursorMarkerProps = Omit<MarkerProps, 'date'>
export class CursorMarker extends React.Component<CursorMarkerProps> {}

export interface TimelineHeadersProps {
  children?: React.ReactNode
  style?: React.CSSProperties | undefined
  className?: string | undefined
  calendarHeaderStyle?: React.CSSProperties | undefined
  calendarHeaderClassName?: string | undefined
  headerRef?: React.Ref<any> | undefined
}
export class TimelineHeaders extends React.Component<TimelineHeadersProps> {}

export type TimelineHeaderProps = TimelineHeadersProps

export interface SidebarHeaderChildrenFnProps<Data> {
  getRootProps: (propsToOverride?: { style: React.CSSProperties }) => {
    style: React.CSSProperties
  }
  data: Data
}

export interface SidebarHeaderProps<Data> {
  variant?: 'left' | 'right' | undefined
  headerData?: Data | undefined
  children: (props: SidebarHeaderChildrenFnProps<Data>) => React.ReactNode
}
export class SidebarHeader<Data = any> extends React.Component<
  SidebarHeaderProps<Data>
> {}

export type Unit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'isoWeek'
  | 'month'
  | 'year'

export interface IntervalContext {
  interval: {
    startTime: number
    endTime: number
    labelWidth: number
    left: number
  }
  intervalText: string
}
export interface GetIntervalProps {
  interval?: Interval | undefined
  style?: React.CSSProperties | undefined
  onClick?: React.MouseEventHandler | undefined
}
export interface IntervalRenderer<Data> {
  intervalContext: IntervalContext
  getIntervalProps: (
    props?: GetIntervalProps,
  ) => Required<GetIntervalProps> & { key: string | number }
  data?: Data | undefined
}
export interface DateHeaderProps<Data> {
  style?: React.CSSProperties | undefined
  className?: string | undefined
  unit?: Unit | 'primaryHeader' | undefined
  labelFormat?:
    | string
    | ((
        [startTime, endTime]: [Dayjs, Dayjs],
        unit: Unit,
        labelWidth: number,
      ) => string)
    | undefined
  intervalRenderer?:
    | ((props?: IntervalRenderer<Data>) => React.ReactNode)
    | undefined
  headerData?: Data | undefined
  children?:
    | ((props: SidebarHeaderChildrenFnProps<Data>) => React.ReactNode)
    | undefined
  height?: number | undefined
}
export class DateHeader<Data = any> extends React.Component<
  DateHeaderProps<Data>
> {}
export interface Interval {
  startTime: Dayjs
  endTime: Dayjs
}
export interface HeaderContext {
  intervals: Array<{ startTime: Dayjs; endTime: Dayjs }>
  unit: string
}
export interface CustomHeaderPropsChildrenFnProps<Data> {
  timelineContext: TimelineContext
  headerContext: HeaderContext
  getIntervalProps: (
    props?: GetIntervalProps,
  ) => Required<GetIntervalProps> & { key: string | number }
  getRootProps: (propsToOverride?: { style: React.CSSProperties }) => {
    style: React.CSSProperties
  }
  showPeriod: (startDate: Dayjs | number, endDate: Dayjs | number) => void
  data: Data
}
export interface CustomHeaderProps<Data> {
  unit?: Unit | undefined
  headerData?: Data | undefined
  height?: number | undefined
  children: (props?: CustomHeaderPropsChildrenFnProps<Data>) => React.ReactNode
}
export class CustomHeader<Data = any> extends React.Component<
  CustomHeaderProps<Data>
> {}

// export const defaultKeys: TimelineKeys;
// export const defaultTimeSteps: TimelineTimeSteps;
// export const defaultHeaderFormats: LabelFormat;

// export default class ReactCalendarTimeline<
//       CustomItem extends TimelineItemBase<any> = TimelineItemBase<number>,
//       CustomGroup extends TimelineGroupBase = TimelineGroupBase,
//   > extends React.Component<ReactCalendarTimelineProps<CustomItem, CustomGroup>> {}
