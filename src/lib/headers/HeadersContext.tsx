import React, { ReactNode } from 'react'
import { noop } from '../utility/generic'

const defaultContextState = {
  registerScroll: () => {
    // eslint-disable-next-line
    console.warn('default registerScroll header used')
    return noop
  },
  rightSidebarWidth: 0,
  leftSidebarWidth: 150,
  timeSteps: {},
}

const { Consumer, Provider } =
  React.createContext<typeof defaultContextState>(defaultContextState)

export type TimelineHeadersProviderProps = {
  children: ReactNode
  rightSidebarWidth?: number
  leftSidebarWidth: number
  //TODO: maybe this should be skipped?
  timeSteps: object
  registerScroll: (e: HTMLDivElement) => void
}
export class TimelineHeadersProvider extends React.Component<TimelineHeadersProviderProps> {
  static propTypes = {}

  render() {
    const contextValue = {
      rightSidebarWidth: this.props.rightSidebarWidth,
      leftSidebarWidth: this.props.leftSidebarWidth,
      timeSteps: this.props.timeSteps,
      registerScroll: this.props.registerScroll,
    } as typeof defaultContextState
    return <Provider value={contextValue}>{this.props.children}</Provider>
  }
}

export const TimelineHeadersConsumer = Consumer
