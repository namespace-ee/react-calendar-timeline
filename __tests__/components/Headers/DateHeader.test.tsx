import React, { type CSSProperties, type ReactNode } from "react";
import { render, cleanup, within, fireEvent } from "@testing-library/react";
import DateHeader from "lib/headers/DateHeader";
import SidebarHeader from "lib/headers/SidebarHeader";
import TimelineHeaders from "lib/headers/TimelineHeaders";
import { RenderHeadersWrapper } from "../../test-utility/header-renderer";
import type { IntervalRenderer, TimelineTimeSteps } from "lib/types/main";
import type { Dayjs } from "dayjs";
import type { defaultHeaderFormats } from "lib/default-config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(utc);
dayjs.extend(weekOfYear);

type FormatLabelFunction = (
  timeRange: [Dayjs, Dayjs],
  unit: keyof typeof defaultHeaderFormats,
  labelWidth?: number
) => string;

describe("Testing DateHeader Component", () => {
  afterEach(cleanup);

  const format = "MM/DD/YYYY hh:mm a";

  // Testing The Example In The Docs
  it("Given DateHeader When rendered Then it should be rendered correctly in the timeLine", () => {
    const { getAllByTestId } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
          <DateHeader
            unit="day"
            style={{ height: 50 }}
            intervalRenderer={({ getIntervalProps, intervalContext }) => {
              return <div {...getIntervalProps()}>{intervalContext.intervalText}</div>;
            }}
          />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    );

    expect(getAllByTestId("dateHeader")).toHaveLength(3);
  });

  describe("DateHeader labelFormat", () => {
    afterEach(cleanup);

    it("Given Dateheader When pass a string typed labelFormat Then it should render the intervals with the given format", () => {
      const { getAllByTestId } = render(dateHeaderComponent({ unit: "day", labelFormat: "MM/DD" }));
      expect(getAllByTestId("dateHeader")[1]).toHaveTextContent("10/25");
      expect(getAllByTestId("dateHeader")[1]).toHaveTextContent("10/26");
      expect(getAllByTestId("dateHeader")[1]).toHaveTextContent("10/27");
    });

    it("Given Dateheader When pass a function typed labelFormat Then it should render the intervals with the given format", () => {
      const formatlabel: FormatLabelFunction = vi.fn((interval: [Dayjs, Dayjs]) => interval[0].format("MM/DD/YYYY"));
      const { getAllByTestId } = render(dateHeaderComponent({ unit: "day", labelFormat: formatlabel }));

      expect(formatlabel).toHaveBeenCalled();

      expect(getAllByTestId("dateHeader")[1]).toHaveTextContent("10/25/2018");
      expect(getAllByTestId("dateHeader")[1]).toHaveTextContent("10/26/2018");
      expect(getAllByTestId("dateHeader")[1]).toHaveTextContent("10/27/2018");
    });

    it("Given Dateheader When pass a function typed labelFormat Then it should be called with an interval, label width and unit", () => {
      const formatlabel = vi.fn<FormatLabelFunction>((interval) => interval[0].format("MM/DD/YYYY"));
      render(dateHeaderComponent({ unit: "day", labelFormat: formatlabel }));

      expect(formatlabel).toHaveBeenCalled();

      formatlabel.mock.calls.forEach((param) => {
        const [[start, end], unit, labelWidth] = param;
        expect(dayjs.isDayjs(start)).toBeTruthy();
        expect(dayjs.isDayjs(end)).toBeTruthy();
        expect(end.diff(start, "d")).toBe(1);
        expect(unit).toBe("day");
        expect(labelWidth).toEqual(expect.any(Number));
      });
    });
  });

  it("Given Dateheader When click on the primary header Then it should change the unit", async () => {
    const formatlabel: FormatLabelFunction = vi.fn((interval: [Dayjs, Dayjs]) => interval[0].format("MM/DD/YYYY"));
    const showPeriod = vi.fn();
    const { getAllByTestId } = render(dateHeaderComponent({ unit: "day", labelFormat: formatlabel, showPeriod }));
    // Arrange
    const primaryHeader = getAllByTestId("dateHeader")[0];

    // Act
    const primaryFirstClick = within(primaryHeader).getByText("2018").parentElement;
    primaryFirstClick!.click();
    expect(showPeriod).toBeCalled();
    const [start, end] = showPeriod.mock.calls[0];
    expect(start.format("DD/MM/YYYY hh:mm a")).toBe("01/01/2018 12:00 am");
    expect(end.format("DD/MM/YYYY hh:mm a")).toBe("31/12/2018 11:59 pm");
  });

  it("Given Dateheader When pass a className Then it should be applied to DateHeader", () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({
        labelFormat: "MM/DD/YYYY",
        className: "test-class-name",
      })
    );
    expect(getAllByTestId("dateHeader")[1]).toHaveClass("test-class-name");
  });

  it("Given Interval When pass an override values for (width, left, position) it should not override the default values", () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({
        labelFormat: "MM/DD/YYYY",
        props: { style: { width: 100, position: "fixed", left: 2342 } },
      })
    );
    const { width, position, left } = getComputedStyle(getAllByTestId("interval")[0]);
    expect(width).not.toBe("100px");
    expect(position).not.toBe("fixed");
    expect(left).not.toBe("2342px");
  });

  it("Given Interval When pass an override (width, position) Then it should ignore these values", () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({
        labelFormat: "MM/DD/YYYY",
        props: { style: { width: 100, position: "fixed" } },
      })
    );
    const { width, position } = getComputedStyle(getAllByTestId("interval")[0]);
    expect(width).not.toBe("1000px");
    expect(position).toBe("absolute");
  });
  it("Given Interval When pass any style other than (position, width, left) through the Dateheader Then it should take it", () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({
        labelFormat: "MM/DD/YYYY",
        props: { style: { display: "flex" } },
      })
    );
    const { display } = getComputedStyle(getAllByTestId("interval")[0]);

    expect(display).toBe("flex");
  });

  it("Given DateHeader component When pass an intervalRenderer prop then it should be called with the right params", () => {
    const intervalRenderer = vi.fn(({ intervalContext }: IntervalRenderer<unknown>) => (
      <div data-testid="myAwesomeInterval">{intervalContext.intervalText}</div>
    ));
    const props = {
      title: "some title",
    };
    render(
      dateHeaderWithIntervalRenderer({
        intervalRenderer: intervalRenderer,
        props,
      })
    );
    expect(intervalRenderer).toBeCalled();
    expect(intervalRenderer).toReturn();
    expect(intervalRenderer.mock.calls[0][0].data).toBe(props);
    expect(intervalRenderer.mock.calls[0][0].getIntervalProps).toEqual(expect.any(Function));
    expect(intervalRenderer.mock.calls[0][0].intervalContext).toEqual(expect.any(Object));
  });

  describe("DateHeader Unit Values", () => {
    it("Given DateHeader When not passing a unit then the date header unit should be same as timeline unit", () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: "day" }}>
          <TimelineHeaders>
            <DateHeader labelFormat={(interval) => interval[0].format(format)} />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      );
      const intervals = getAllByTestId("dateHeaderInterval").map((interval) => interval.textContent);
      for (let index = 0; index < intervals.length - 1; index++) {
        const a = intervals[index];
        const b = intervals[index + 1];

        const timeStampA = dayjs(a, format);
        const timeStampB = dayjs(b, format);
        const diff = timeStampB.diff(timeStampA, "day");
        expect(diff).toBe(1);
      }
    });
    it("Given DateHeader When passing a unit then the date header unit should be same as unit passed", () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: "month" }}>
          <TimelineHeaders>
            <DateHeader unit="day" labelFormat={(interval) => interval[0].format(format)} />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      );
      const intervals = getAllByTestId("dateHeaderInterval").map((interval) => interval.textContent);
      for (let index = 0; index < intervals.length - 1; index++) {
        const a = intervals[index];
        const b = intervals[index + 1];

        const timeStampA = dayjs(a, format);
        const timeStampB = dayjs(b, format);
        const diff = timeStampB.diff(timeStampA, "day");
        expect(diff).toBe(1);
      }
    });

    it("Given DateHeader When passing primaryHeader Then the header unit should be bigger the timeline unit", () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: "day" }}>
          <TimelineHeaders>
            <DateHeader unit="primaryHeader" labelFormat={(interval) => interval[0].format(format)} />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      );
      const intervals = getAllByTestId("dateHeaderInterval").map((interval) => interval.textContent);
      for (let index = 0; index < intervals.length - 1; index++) {
        const a = intervals[index];
        const b = intervals[index + 1];

        const timeStampA = dayjs(a, format);
        const timeStampB = dayjs(b, format);
        const diff = timeStampB.diff(timeStampA, "month");
        expect(diff).toBe(1);
      }
    });

    it("Given DateHeader When not passing unit Then the header unit should be same as the timeline unit", () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: "day" }}>
          <TimelineHeaders>
            <DateHeader labelFormat={(interval) => interval[0].format(format)} />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      );
      const intervals = getAllByTestId("dateHeaderInterval").map((interval) => interval.textContent);
      for (let index = 0; index < intervals.length - 1; index++) {
        const a = intervals[index];
        const b = intervals[index + 1];

        const timeStampA = dayjs(a, format);
        const timeStampB = dayjs(b, format);
        const diff = timeStampB.diff(timeStampA, "day");
        expect(diff).toBe(1);
      }
    });
  });

  describe("DateHeader Interval", () => {
    it("Given DateHeader Interval When passing on click event to the prop getter Then it should trigger", () => {
      const onClick = vi.fn();
      const { getAllByTestId } = render(
        <RenderHeadersWrapper>
          <TimelineHeaders>
            <DateHeader
              intervalRenderer={({ getIntervalProps, intervalContext }) => {
                return (
                  <div data-testid="interval" {...getIntervalProps({ onClick: onClick })}>
                    {intervalContext.intervalText}
                  </div>
                );
              }}
            />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      );
      const intervals = getAllByTestId("interval");
      fireEvent.click(intervals[0]);
      expect(onClick).toHaveBeenCalled();
    });
    it("Given DateHeader When passing interval renderer Then it should be rendered", () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper>
          <TimelineHeaders>
            <DateHeader
              intervalRenderer={({ getIntervalProps, intervalContext }) => {
                return (
                  <div data-testid="interval" {...getIntervalProps()}>
                    {intervalContext.intervalText}
                  </div>
                );
              }}
            />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      );
      expect(getAllByTestId("interval")[0]).toBeInTheDocument();
    });
    it("Given DateHeader When passing interval renderer Then it should called with interval's context", () => {
      const renderer = vi.fn(({ getIntervalProps, intervalContext }: IntervalRenderer<unknown>) => {
        return (
          <div data-testid="interval" {...getIntervalProps()}>
            {intervalContext.intervalText}
          </div>
        );
      });
      render(
        <RenderHeadersWrapper>
          <TimelineHeaders>
            <DateHeader intervalRenderer={renderer} />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      );
      expect(renderer.mock.calls[0][0].intervalContext).toEqual(
        expect.objectContaining({
          interval: expect.objectContaining({
            startTime: expect.anything(),
            endTime: expect.anything(),
            labelWidth: expect.any(Number),
            left: expect.any(Number),
          }),
          intervalText: expect.any(String),
        })
      );
    });
  });
  it("Given DateHeader When passing a stateless react component to interval renderer Then it should render", () => {
    const Renderer = ({ getIntervalProps, intervalContext }: IntervalRenderer<unknown>) => {
      return (
        <div data-testid="interval-a" {...getIntervalProps()}>
          {intervalContext.intervalText}
        </div>
      );
    };
    const { getAllByTestId } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
          <DateHeader unit="day" style={{ height: 50 }} intervalRenderer={Renderer} />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    );

    expect(getAllByTestId("interval-a")[0]).toBeInTheDocument();
  });
  it("Given DateHeader When passing a react component to interval renderer Then it should render", () => {
    class Renderer extends React.Component<IntervalRenderer<unknown>> {
      render() {
        const { getIntervalProps, intervalContext } = this.props;
        return (
          <div data-testid="interval-a" {...getIntervalProps()}>
            {intervalContext.intervalText}
          </div>
        );
      }
    }
    const { getAllByTestId } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
          <DateHeader
            unit="day"
            style={{ height: 50 }}
            intervalRenderer={Renderer as unknown as (props: IntervalRenderer<unknown>) => ReactNode}
          />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    );

    expect(getAllByTestId("interval-a")[0]).toBeInTheDocument();
  });
  it("#562 Given DateHeader when passing week as a unit then header should render without error", () => {
    const { container } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <DateHeader unit={"week" as keyof TimelineTimeSteps} />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    );
    expect(container).toBeInTheDocument();
  });
});

type DateHeaderComponentOptions = {
  labelFormat?: FormatLabelFunction | string;
  unit?: keyof TimelineTimeSteps | "primaryHeader";
  props?: Record<string, unknown>;
  className?: string;
  style?: CSSProperties;
  showPeriod?: (...args: unknown[]) => void;
};

function dateHeaderComponent({
  labelFormat,
  unit,
  props,
  className,
  style,
  showPeriod,
}: DateHeaderComponentOptions = {}) {
  return (
    <RenderHeadersWrapper showPeriod={showPeriod} timelineState={{ timelineUnit: "month" }}>
      <TimelineHeaders>
        <SidebarHeader>
          {({ getRootProps }) => {
            return <div {...getRootProps()}>Left</div>;
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader
          unit={unit}
          labelFormat={labelFormat as FormatLabelFunction | undefined}
          headerData={props}
          style={style}
          className={className}
          intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
            return (
              <div data-testid="interval" {...getIntervalProps(data)}>
                {intervalContext.intervalText}
              </div>
            );
          }}
        />
        <DateHeader />
      </TimelineHeaders>
    </RenderHeadersWrapper>
  );
}

type DateHeaderWithIntervalRendererOptions = {
  intervalRenderer?: (props: IntervalRenderer<unknown>) => ReactNode;
  props?: Record<string, unknown>;
};

function dateHeaderWithIntervalRenderer({ intervalRenderer, props }: DateHeaderWithIntervalRendererOptions = {}) {
  return (
    <RenderHeadersWrapper timelineState={{ timelineUnit: "month" }}>
      <TimelineHeaders>
        <SidebarHeader>
          {({ getRootProps }) => {
            return <div {...getRootProps()}>Left</div>;
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader unit={"day"} headerData={props} intervalRenderer={intervalRenderer} />
        <DateHeader />
      </TimelineHeaders>
    </RenderHeadersWrapper>
  );
}
