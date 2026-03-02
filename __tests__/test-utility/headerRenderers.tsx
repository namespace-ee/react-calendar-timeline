import { CSSProperties } from "react";
import { render } from "@testing-library/react";
import DateHeader from "lib/headers/DateHeader";
import SidebarHeader from "lib/headers/SidebarHeader";
import TimelineHeaders from "lib/headers/TimelineHeaders";
import CustomHeader from "lib/headers/CustomHeader";
import type { TimelineStartProps } from "lib/timeline/TimelineStateContext";
import type { TimelineHeadersProviderProps } from "../../src/lib/headers/HeadersContext";
import type { TimelineTimeSteps } from "lib/types/main";

import { RenderHeadersWrapper } from "./header-renderer";

type SidebarHeaderOptions = {
  variant?: "left" | "right";
  props?: { style: CSSProperties };
  timelineState?: Partial<TimelineStartProps>;
  headersState?: Partial<TimelineHeadersProviderProps>;
  extraProps?: Record<string, unknown>;
};

type TwoSidebarOptions = {
  props?: { style: CSSProperties };
  timelineState?: Partial<TimelineStartProps>;
  headersState?: Partial<TimelineHeadersProviderProps>;
};

type TimelineLayoutOptions = {
  calendarHeaderClassName?: string;
  calendarHeaderStyle?: CSSProperties;
  style?: CSSProperties;
  className?: string;
  timelineState?: Partial<TimelineStartProps>;
  headersState?: Partial<TimelineHeadersProviderProps>;
};

type VariantSidebarOptions = {
  variant?: "left" | "right";
  timelineState?: Partial<TimelineStartProps>;
  headersState?: Partial<TimelineHeadersProviderProps>;
};

type CustomHeaderOptions = {
  unit?: keyof TimelineTimeSteps;
  props?: Record<string, unknown>;
  intervalStyle?: CSSProperties;
  timelineState?: Partial<TimelineStartProps>;
  headersState?: Partial<TimelineHeadersProviderProps>;
};

export function renderSidebarHeaderWithCustomValues({
  variant = undefined,
  props,
  timelineState,
  headersState,
  extraProps,
}: SidebarHeaderOptions = {}) {
  return render(
    <RenderHeadersWrapper timelineState={timelineState} headersState={headersState}>
      <TimelineHeaders>
        <SidebarHeader variant={variant} headerData={extraProps}>
          {({ getRootProps }) => {
            return (
              <div data-testid="sidebarHeader" {...getRootProps(props)}>
                SidebarHeader
                <div>Should Be Rendred</div>
              </div>
            );
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    </RenderHeadersWrapper>
  );
}
export function renderTwoSidebarHeadersWithCustomValues({
  props,
  timelineState,
  headersState,
}: TwoSidebarOptions = {}) {
  return render(
    <RenderHeadersWrapper timelineState={timelineState} headersState={headersState}>
      <TimelineHeaders>
        <SidebarHeader variant={"left"} headerData={props}>
          {({ getRootProps }) => {
            return (
              <div {...getRootProps(props)}>
                LeftSideBar
                <div>Should Be Rendred</div>
              </div>
            );
          }}
        </SidebarHeader>
        <SidebarHeader variant={"right"} headerData={props}>
          {({ getRootProps }) => {
            return <div {...getRootProps()}>RightSideBar</div>;
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    </RenderHeadersWrapper>
  );
}

export function renderTimelineWithLeftAndRightSidebar({
  calendarHeaderClassName,
  calendarHeaderStyle,
  style,
  className,
  timelineState,
  headersState,
}: TimelineLayoutOptions = {}) {
  return render(
    <RenderHeadersWrapper timelineState={timelineState} headersState={headersState}>
      <TimelineHeaders
        style={style}
        className={className}
        calendarHeaderStyle={calendarHeaderStyle}
        calendarHeaderClassName={calendarHeaderClassName}
      >
        <SidebarHeader variant="right">
          {({ getRootProps }) => {
            return (
              <div data-testid="right-header" {...getRootProps()}>
                Right
              </div>
            );
          }}
        </SidebarHeader>
        <SidebarHeader variant="left">
          {({ getRootProps }) => {
            return (
              <div data-testid="left-header" {...getRootProps()}>
                Left
              </div>
            );
          }}
        </SidebarHeader>
      </TimelineHeaders>
    </RenderHeadersWrapper>
  );
}

export function renderTimelineWithVariantSidebar({ variant, timelineState, headersState }: VariantSidebarOptions = {}) {
  return render(
    <RenderHeadersWrapper timelineState={timelineState} headersState={headersState}>
      <TimelineHeaders>
        <SidebarHeader variant={variant}>
          {({ getRootProps }) => {
            return (
              <div data-testid="sidebarHeader" {...getRootProps()}>
                Header
              </div>
            );
          }}
        </SidebarHeader>
      </TimelineHeaders>
    </RenderHeadersWrapper>
  );
}

export function getCustomHeadersInTimeline({
  unit,
  props,
  intervalStyle,
  timelineState,
  headersState,
}: CustomHeaderOptions = {}) {
  return (
    <RenderHeadersWrapper timelineState={timelineState} headersState={headersState}>
      <TimelineHeaders>
        <CustomHeader unit={unit} headerData={props}>
          {({
            headerContext: { intervals },
            getRootProps,
            getIntervalProps,
            showPeriod,
            data = { style: { height: 30 } },
          }) => {
            return (
              <div data-testid="customHeader" {...getRootProps(data)}>
                {intervals.map((interval) => {
                  return (
                    <div
                      data-testid="customHeaderInterval"
                      onClick={() => {
                        showPeriod(interval.startTime, interval.endTime);
                      }}
                      {...getIntervalProps({
                        interval,
                        style: intervalStyle,
                      })}
                      key={interval.startTime.valueOf()}
                    >
                      <div className="sticky">{interval.startTime.format("DD/MM/YYYY")}</div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </CustomHeader>
      </TimelineHeaders>
    </RenderHeadersWrapper>
  );
}
