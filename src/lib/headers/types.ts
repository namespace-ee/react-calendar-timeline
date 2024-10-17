import { HTMLAttributes } from 'react'
import { Interval } from '../types/main'

export type GetIntervalPropsParams = {
  interval: Interval
} & HTMLAttributes<HTMLDivElement>
export type GetIntervalPropsType = (props?: GetIntervalPropsParams) => HTMLAttributes<HTMLDivElement> & {
  key: string
}
