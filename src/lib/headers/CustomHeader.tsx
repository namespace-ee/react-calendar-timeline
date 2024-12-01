import React, { CSSProperties, ReactNode } from 'react'
import { useTimelineHeadersContext } from './HeadersContext'
import { useTimelineState } from '../timeline/TimelineStateContext'
import { iterateTimes } from '../utility/calendar'
import { Interval, TimelineTimeSteps } from '../types/main'
import { Dayjs } from 'dayjs'
import { CustomDateHeaderProps } from './CustomDateHeader'
import isEqual from 'lodash/isEqual'
import { GetIntervalPropsType } from './types'

export type CustomHeaderProps<Data> = {
  children: (p: CustomDateHeaderProps<Data>) => ReactNode
  unit: keyof TimelineTimeSteps
  timeSteps: any
  visibleTimeStart: number
  visibleTimeEnd: number
  canvasTimeStart: number
  canvasTimeEnd: number
  canvasWidth: number
  showPeriod: (start: Dayjs, end: Dayjs) => void
  headerData?: Data
  getLeftOffsetFromDate: (date: any) => number
  height: number
  timelineWidth: number
}

type GetHeaderIntervalsParams = {
  canvasTimeStart: number
  canvasTimeEnd: number
  unit: keyof TimelineTimeSteps
  timeSteps: any
  getLeftOffsetFromDate: (date: any) => number
}

type GetHeaderIntervalsFn = (params: GetHeaderIntervalsParams) => Interval[]

type State = {
  intervals: Interval[]
}

class CustomHeader<Data> extends React.Component<CustomHeaderProps<Data>, State> {
  constructor(props: CustomHeaderProps<Data>) {
    super(props)
    const { canvasTimeStart, canvasTimeEnd, unit, timeSteps, getLeftOffsetFromDate } = props

    const intervals = this.getHeaderIntervals({
      canvasTimeStart,
      canvasTimeEnd,
      unit,
      timeSteps,
      getLeftOffsetFromDate,
    })

    this.state = {
      intervals,
    }
  }

  static defaultProps = {
    height: 30,
  }

  /*shouldComponentUpdate(nextProps: CustomHeaderProps<Data>) {
    if (
      nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
      nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
      nextProps.canvasWidth !== this.props.canvasWidth ||
      nextProps.unit !== this.props.unit ||
      nextProps.timeSteps !== this.props.timeSteps ||
      nextProps.showPeriod !== this.props.showPeriod ||
      nextProps.children !== this.props.children ||
      nextProps.headerData !== this.props.headerData
    ) {
      return true
    }
    return false
  }*/
  componentDidUpdate(prevProps: CustomHeaderProps<Data>) {
    if (
      !isEqual(prevProps, this.props)
      //prevProps.canvasTimeStart !== this.props.canvasTimeStart ||
      //prevProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
      //prevProps.canvasWidth !== this.props.canvasWidth ||
      //prevProps.unit !== this.props.unit ||
      //prevProps.timeSteps !== this.props.timeSteps ||
      //prevProps.showPeriod !== this.props.showPeriod
    ) {
      const { canvasTimeStart, canvasTimeEnd, unit, timeSteps, getLeftOffsetFromDate } = this.props

      const intervals = this.getHeaderIntervals({
        canvasTimeStart,
        canvasTimeEnd,
        unit,
        timeSteps,
        getLeftOffsetFromDate,
      })

      this.setState({ intervals })
    }
  }

  getHeaderIntervals: GetHeaderIntervalsFn = ({
    canvasTimeStart,
    canvasTimeEnd,
    unit,
    timeSteps,
    getLeftOffsetFromDate,
  }) => {
    const intervals: Interval[] = []
    iterateTimes(canvasTimeStart, canvasTimeEnd, unit, timeSteps, (startTime, endTime) => {
      const left = getLeftOffsetFromDate(startTime.valueOf())
      const right = getLeftOffsetFromDate(endTime.valueOf())
      const width = right - left
      intervals.push({
        startTime,
        endTime,
        labelWidth: width,
        left,
      })
    })
    return intervals
  }

  getRootProps = (props: { style?: CSSProperties } = {}) => {
    const { style } = props
    return {
      style: Object.assign({}, style ? style : {}, {
        position: 'relative',
        width: this.props.canvasWidth,
        height: this.props.height,
      }),
    }
  }

  getIntervalProps: GetIntervalPropsType = (props: { interval?: Interval; style?: CSSProperties } = {}) => {
    const { interval, style } = props
    if (!interval) throw new Error('you should provide interval to the prop getter')
    const { startTime, labelWidth, left } = interval
    return {
      style: {
        ...style,
        left,
        width: labelWidth,
        position: 'absolute',
      },
      key: `label-${startTime.valueOf()}`,
    }
  }

  getStateAndHelpers = (): CustomDateHeaderProps<Data> => {
    const {
      /*canvasTimeStart,
      canvasTimeEnd,
      timelineWidth,
      visibleTimeStart,
      visibleTimeEnd,*/
      unit,
      showPeriod,
      headerData,
    } = this.props
    //TODO: only evaluate on changing params

    return {
      /*timelineContext: {
        timelineWidth,
        visibleTimeStart,
        visibleTimeEnd,
        canvasTimeStart,
        canvasTimeEnd,
      },*/
      headerContext: {
        unit,
        intervals: this.state.intervals,
      },
      getRootProps: this.getRootProps,
      getIntervalProps: this.getIntervalProps,
      showPeriod,
      data: headerData as any,
    }
  }

  render() {
    const props = this.getStateAndHelpers()
    return this.props.children(props)
  }
}

export type CustomHeaderWrapperProps<Data> = {
  children: (p: CustomDateHeaderProps<Data>) => ReactNode
  unit?: keyof TimelineTimeSteps
  headerData?: Data
  height?: number | undefined
}

function CustomHeaderWrapper<Data>({ children, unit, headerData, height }: CustomHeaderWrapperProps<Data>) {
  const { getTimelineState, showPeriod, getLeftOffsetFromDate } = useTimelineState()
  const timelineState = getTimelineState()
  const { timeSteps } = useTimelineHeadersContext()
  return (
    <CustomHeader
      children={children}
      timeSteps={timeSteps}
      showPeriod={showPeriod}
      unit={unit ? unit : timelineState.timelineUnit}
      {...timelineState}
      headerData={headerData}
      getLeftOffsetFromDate={getLeftOffsetFromDate}
      height={height}
    />
  )
}

export default CustomHeaderWrapper
