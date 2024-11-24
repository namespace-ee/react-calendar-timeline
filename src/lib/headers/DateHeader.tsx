import React, { CSSProperties, ReactNode } from 'react'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import CustomHeader from './CustomHeader'
import { getNextUnit, SelectUnits } from '../utility/calendar'
import { defaultHeaderFormats } from '../default-config'
import memoize from 'memoize-one'
import { CustomDateHeader } from './CustomDateHeader'
import { IntervalRenderer, SidebarHeaderChildrenFnProps, TimelineTimeSteps } from '../types/main'
import { Dayjs, UnitType } from 'dayjs'

type GetHeaderData<Data> = (
  intervalRenderer: (p: IntervalRenderer<Data>) => ReactNode,
  style: React.CSSProperties,
  className: string | undefined,
  getLabelFormat: (interval: [Dayjs, Dayjs], unit: keyof typeof defaultHeaderFormats, labelWidth: number) => string,
  unitProp: UnitType | 'primaryHeader' | undefined,
  headerData: Data | undefined,
) => {
  intervalRenderer?: IntervalRenderer<Data>
  style: React.CSSProperties
  className: string
  getLabelFormat: (interval: [Dayjs, Dayjs], unit: keyof typeof defaultHeaderFormats, labelWidth: number) => string
  unitProp: UnitType | 'primaryHeader' | undefined
  headerData: Data
}
export interface DateHeaderProps<Data> {
  style?: CSSProperties | undefined
  className?: string | undefined
  unit?: keyof TimelineTimeSteps | 'primaryHeader' | undefined
  timelineUnit: SelectUnits
  labelFormat?:
    | string
    | FormatLabelFunction
    | undefined
  intervalRenderer?: (props: IntervalRenderer<Data>) => ReactNode
  headerData?: Data | undefined
  children?: ((props: SidebarHeaderChildrenFnProps<Data>) => ReactNode) | undefined
  height?: number | undefined
}

class DateHeaderInner<Data> extends React.Component<DateHeaderProps<Data>> {
  getHeaderUnit = (): keyof TimelineTimeSteps => {
    if (this.props.unit === 'primaryHeader') {
      return getNextUnit(this.props.timelineUnit)
    } else if (this.props.unit) {
      return this.props.unit
    }
    return this.props.timelineUnit
  }

  getRootStyle = memoize((style) => {
    return {
      height: 30,
      ...style,
    }
  })

  getLabelFormat = (interval: [Dayjs, Dayjs], unit: keyof typeof defaultHeaderFormats, labelWidth: number) => {
    const { labelFormat } = this.props
    if (typeof labelFormat === 'string') {
      const startTime = interval[0]
      return startTime.format(labelFormat)
    } else if (typeof labelFormat === 'function') {
      return labelFormat(interval, unit as UnitType, labelWidth)
    } else {
      throw new Error('labelFormat should be function or string')
    }
  }

  getHeaderData: GetHeaderData<Data> = memoize(
    (intervalRenderer, style, className, getLabelFormat, unitProp, headerData) => {
      return {
        intervalRenderer,
        style,
        className,
        getLabelFormat,
        unitProp,
        headerData,
      }
    },
  )

  render() {
    const unit = this.getHeaderUnit()
    const { height } = this.props
    return (
      <CustomHeader
        children={CustomDateHeader}
        unit={unit}
        height={height}
        headerData={this.getHeaderData(
          this.props.intervalRenderer!,
          this.getRootStyle(this.props.style),
          this.props.className,
          this.getLabelFormat,
          this.props.unit,
          this.props.headerData,
        )}
      />
    )
  }
}

export type DateHeaderWrapper<Data> = {
  unit?: keyof TimelineTimeSteps | 'primaryHeader'
  labelFormat?: FormatLabelFunction
  style?: CSSProperties
  className?: string
  intervalRenderer?: (props: IntervalRenderer<Data>) => ReactNode
  headerData?: Data
  height?: number
}

export function DateHeader<Data>({
  labelFormat,
  unit,
  style,
  className,
  intervalRenderer,
  headerData,
  height,
}: DateHeaderWrapper<Data>) {
  return (
    <TimelineStateConsumer>
      {({ getTimelineState }) => {
        const timelineState = getTimelineState()
        return (
          <DateHeaderInner
            timelineUnit={timelineState.timelineUnit}
            unit={unit}
            labelFormat={labelFormat || formatLabel}
            style={style}
            className={className}
            intervalRenderer={intervalRenderer}
            headerData={headerData}
            height={height}
          />
        )
      }}
    </TimelineStateConsumer>
  )
}
type FormatLabelFunction = (
  timeRange: [Dayjs, Dayjs],
  unit: keyof typeof defaultHeaderFormats,
  labelWidth?: number,
  formatOptions?: typeof defaultHeaderFormats
) => string;

const formatLabel:FormatLabelFunction = (
  [timeStart],
  unit,
  labelWidth =150,
  formatOptions = defaultHeaderFormats,
) =>{
  let format
  if (labelWidth >= 150) {
    format = formatOptions[unit]['long']
  } else if (labelWidth >= 100) {
    format = formatOptions[unit]['mediumLong']
  } else if (labelWidth >= 50) {
    format = formatOptions[unit]['medium']
  } else {
    format = formatOptions[unit]['short']
  }
  return timeStart.format(format)
}

export default DateHeader
