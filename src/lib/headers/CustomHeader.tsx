import React, { ComponentType, CSSProperties, ReactNode } from 'react'
import PropTypes from 'prop-types'
import { TimelineHeadersConsumer } from './HeadersContext'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import { iterateTimes, SelectUnits } from '../utility/calendar'
import { Interval, TimelineContext } from '../types/main'
import { Dayjs, UnitType } from 'dayjs'
import { CustomDateHeaderProps } from './CustomDateHeader'

export type CustomHeaderProps<Data> = {
  children: (p: CustomDateHeaderProps<Data>) => ReactNode
  unit: UnitType
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
  unit: UnitType
  timeSteps: any
  getLeftOffsetFromDate: (date: any) => number
}

type GetHeaderIntervalsFn = (params: GetHeaderIntervalsParams) => Interval[]

type State = {
  intervals: Interval[]
}

type GetIntervalStyleParams = {
  left: number
  labelWidth: number
  style?: CSSProperties
}

export class CustomHeader<Data> extends React.Component<
  CustomHeaderProps<Data>,
  State
> {
  /*  static propTypes = {
      //component props
      children: PropTypes.func.isRequired,
      unit: PropTypes.string.isRequired,
      //Timeline context
      timeSteps: PropTypes.object.isRequired,
      visibleTimeStart: PropTypes.number.isRequired,
      visibleTimeEnd: PropTypes.number.isRequired,
      canvasTimeStart: PropTypes.number.isRequired,
      canvasTimeEnd: PropTypes.number.isRequired,
      canvasWidth: PropTypes.number.isRequired,
      showPeriod: PropTypes.func.isRequired,
      headerData: PropTypes.object,
      getLeftOffsetFromDate: PropTypes.func.isRequired,
      height: PropTypes.number.isRequired,
    }*/
  constructor(props: CustomHeaderProps<Data>) {
    super(props)
    const {
      canvasTimeStart,
      canvasTimeEnd,
      unit,
      timeSteps,
      getLeftOffsetFromDate,
    } = props

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

  shouldComponentUpdate(nextProps: CustomHeaderProps<Data>) {
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
  }

  // todo - rework with "gdsfp"
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: CustomHeaderProps<Data>) {
    if (
      nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
      nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
      nextProps.canvasWidth !== this.props.canvasWidth ||
      nextProps.unit !== this.props.unit ||
      nextProps.timeSteps !== this.props.timeSteps ||
      nextProps.showPeriod !== this.props.showPeriod
    ) {
      const {
        canvasTimeStart,
        canvasTimeEnd,
        unit,
        timeSteps,
        getLeftOffsetFromDate,
      } = nextProps

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
    iterateTimes(
      canvasTimeStart,
      canvasTimeEnd,
      unit,
      timeSteps,
      (startTime, endTime) => {
        const left = getLeftOffsetFromDate(startTime.valueOf())
        const right = getLeftOffsetFromDate(endTime.valueOf())
        const width = right - left
        intervals.push({
          startTime,
          endTime,
          labelWidth: width,
          left,
        })
      },
    )
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

  getIntervalProps = (
    props: { interval?: Interval; style?: CSSProperties } = {},
  ) => {
    const { interval, style } = props
    if (!interval)
      throw new Error('you should provide interval to the prop getter')
    const { startTime, labelWidth, left } = interval
    return {
      style: this.getIntervalStyle({
        style,
        labelWidth,
        left,
      }),
      key: `label-${startTime.valueOf()}`,
    }
  }

  getIntervalStyle = ({ left, labelWidth, style }: GetIntervalStyleParams) => {
    return {
      ...style,
      left,
      width: labelWidth,
      position: 'absolute',
    }
  }

  getStateAndHelpers = (): CustomHeaderWrapperChildrenParams => {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      unit,
      showPeriod,
      timelineWidth,
      visibleTimeStart,
      visibleTimeEnd,
      headerData,
    } = this.props
    //TODO: only evaluate on changing params

    return {
      timelineContext: {
        timelineWidth,
        visibleTimeStart,
        visibleTimeEnd,
        canvasTimeStart,
        canvasTimeEnd,
      },
      headerContext: {
        unit,
        intervals: this.state.intervals,
      },
      getRootProps: this.getRootProps,
      getIntervalProps: this.getIntervalProps,
      showPeriod,
      data: headerData,
    }
  }

  render() {
    const props = this.getStateAndHelpers()
    const Renderer = this.props.children
    return <Renderer {...props} />
  }
}

type CustomHeaderWrapperChildrenParams = {
  getTimelineState: () => TimelineContext
  showPeriod: (start: Dayjs, end: Dayjs) => void
  getLeftOffsetFromDate: (date: any) => number
}
export type CustomHeaderWrapperProps<Data> = {
  children: (p: CustomDateHeaderProps<Data>) => ReactNode
  unit?: UnitType
  headerData?: Data
  height: number
}

function CustomHeaderWrapper<Data>({
  children,
  unit,
  headerData,
  height,
}: CustomHeaderWrapperProps<Data>) {
  return (
    <TimelineStateConsumer>
      {({ getTimelineState, showPeriod, getLeftOffsetFromDate }) => {
        const timelineState = getTimelineState()
        return (
          <TimelineHeadersConsumer>
            {({ timeSteps }) => (
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
            )}
          </TimelineHeadersConsumer>
        )
      }}
    </TimelineStateConsumer>
  )
}

CustomHeaderWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  unit: PropTypes.string,
  headerData: PropTypes.object,
  height: PropTypes.number,
}

CustomHeaderWrapper.defaultProps = {
  height: 30,
}

export default CustomHeaderWrapper
