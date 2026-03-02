import React, { ReactNode, useContext } from "react";
import { noop } from "../utility/generic";
import type { TimelineTimeSteps } from "../types/main";

const defaultContextState: {
  registerScroll: () => () => void;
  rightSidebarWidth: number;
  leftSidebarWidth: number;
  timeSteps: TimelineTimeSteps;
  scrollOffset: number;
} = {
  registerScroll: () => {
    console.warn("default registerScroll header used");
    return noop;
  },
  rightSidebarWidth: 0,
  leftSidebarWidth: 150,
  timeSteps: { second: 1, minute: 1, hour: 1, day: 1, month: 1, year: 1 },
  scrollOffset: 0,
};

const HeaderContext = React.createContext<typeof defaultContextState>(defaultContextState);

export type TimelineHeadersProviderProps = {
  children: ReactNode;
  rightSidebarWidth?: number;
  leftSidebarWidth: number;
  timeSteps: TimelineTimeSteps;
  registerScroll: (e: HTMLDivElement) => void;
  scrollOffset: number;
};
export class TimelineHeadersProvider extends React.Component<TimelineHeadersProviderProps> {
  render() {
    const contextValue = {
      rightSidebarWidth: this.props.rightSidebarWidth,
      leftSidebarWidth: this.props.leftSidebarWidth,
      timeSteps: this.props.timeSteps,
      registerScroll: this.props.registerScroll,
      scrollOffset: this.props.scrollOffset,
    } as typeof defaultContextState;
    return <HeaderContext.Provider value={contextValue}>{this.props.children}</HeaderContext.Provider>;
  }
}

export const TimelineHeadersContext = HeaderContext;
export const useTimelineHeadersContext = () => useContext(TimelineHeadersContext);
