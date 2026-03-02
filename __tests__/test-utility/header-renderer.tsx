import { ReactNode } from "react";
import { TimelineStateProvider, type TimelineStartProps } from "lib/timeline/TimelineStateContext";
import { state } from "../../__fixtures__/stateAndProps";
import { defaultTimeSteps } from "../../src/lib/default-config";
import { TimelineHeadersProvider, type TimelineHeadersProviderProps } from "../../src/lib/headers/HeadersContext";
import type { SelectUnits } from "lib/utility/calendar";

type RenderHeadersWrapperProps = {
  children?: ReactNode;
  timelineState?: Partial<TimelineStartProps>;
  headersState?: Partial<TimelineHeadersProviderProps>;
  showPeriod?: TimelineStartProps["showPeriod"];
  registerScroll?: (e: HTMLDivElement) => void;
};

export const RenderHeadersWrapper = ({
  children,
  timelineState = {},
  headersState = {},
  showPeriod = () => {},
  registerScroll = () => {},
}: RenderHeadersWrapperProps) => {
  const defaultTimelineState: TimelineStartProps = {
    visibleTimeStart: state.visibleTimeStart,
    visibleTimeEnd: state.visibleTimeEnd,
    canvasTimeStart: state.canvasTimeStart,
    canvasTimeEnd: state.canvasTimeEnd,
    canvasWidth: 2000,
    showPeriod: showPeriod,
    timelineUnit: "day" as SelectUnits,
    timelineWidth: 1000,
  };

  const timelineStateProps: TimelineStartProps = {
    ...defaultTimelineState,
    ...timelineState,
  };

  const headersStateProps: TimelineHeadersProviderProps = {
    children,
    registerScroll: registerScroll,
    timeSteps: defaultTimeSteps,
    leftSidebarWidth: 150,
    rightSidebarWidth: 0,
    scrollOffset: 0,
    ...headersState,
  };

  return (
    <div>
      <TimelineStateProvider {...timelineStateProps}>
        <div>
          <TimelineHeadersProvider {...headersStateProps}>{children}</TimelineHeadersProvider>
        </div>
      </TimelineStateProvider>
    </div>
  );
};
