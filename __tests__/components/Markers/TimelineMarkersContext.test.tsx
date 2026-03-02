import { render, act } from "@testing-library/react";
import {
  TimelineMarkersProvider,
  TimelineMarkersConsumer,
  type TimelineMarkersContextValue,
  type SubscribeReturn,
} from "lib/markers/TimelineMarkersContext";
import { TimelineMarkerType } from "lib/markers/markerType";

describe("TimelineMarkersContext", () => {
  it("starts with empty markers array", () => {
    let markers;
    render(
      <TimelineMarkersProvider>
        <TimelineMarkersConsumer>
          {(ctx) => {
            markers = ctx.markers;
            return null;
          }}
        </TimelineMarkersConsumer>
      </TimelineMarkersProvider>
    );

    expect(markers).toEqual([]);
  });

  it("subscribeMarker adds a marker with unique id", () => {
    let ctx: TimelineMarkersContextValue | undefined;
    render(
      <TimelineMarkersProvider>
        <TimelineMarkersConsumer>
          {(value) => {
            ctx = value;
            return null;
          }}
        </TimelineMarkersConsumer>
      </TimelineMarkersProvider>
    );

    act(() => {
      ctx!.subscribeMarker({ type: TimelineMarkerType.Today, date: Date.now() });
    });

    expect(ctx!.markers).toHaveLength(1);
    expect(ctx!.markers[0].id).toBeDefined();
    expect(ctx!.markers[0].type).toBe("Today");
  });

  it("unsubscribe removes the marker", () => {
    let ctx: TimelineMarkersContextValue | undefined;
    let sub: SubscribeReturn | undefined;
    render(
      <TimelineMarkersProvider>
        <TimelineMarkersConsumer>
          {(value) => {
            ctx = value;
            return null;
          }}
        </TimelineMarkersConsumer>
      </TimelineMarkersProvider>
    );

    act(() => {
      sub = ctx!.subscribeMarker({ type: TimelineMarkerType.Custom, date: Date.now() });
    });

    expect(ctx!.markers).toHaveLength(1);

    act(() => {
      sub!.unsubscribe();
    });

    expect(ctx!.markers).toHaveLength(0);
  });

  it("getMarker returns the subscribed marker", () => {
    let ctx: TimelineMarkersContextValue | undefined;
    let sub: SubscribeReturn | undefined;
    render(
      <TimelineMarkersProvider>
        <TimelineMarkersConsumer>
          {(value) => {
            ctx = value;
            return null;
          }}
        </TimelineMarkersConsumer>
      </TimelineMarkersProvider>
    );

    act(() => {
      sub = ctx!.subscribeMarker({ type: TimelineMarkerType.Today, date: 12345 });
    });

    const marker = sub!.getMarker();
    expect(marker.type).toBe("Today");
    expect(marker.id).toBeDefined();
  });

  it("updateMarker updates an existing marker", () => {
    let ctx: TimelineMarkersContextValue | undefined;
    let sub: SubscribeReturn | undefined;
    render(
      <TimelineMarkersProvider>
        <TimelineMarkersConsumer>
          {(value) => {
            ctx = value;
            return null;
          }}
        </TimelineMarkersConsumer>
      </TimelineMarkersProvider>
    );

    act(() => {
      sub = ctx!.subscribeMarker({ type: TimelineMarkerType.Custom, date: 1000 });
    });

    const marker = sub!.getMarker();

    act(() => {
      ctx!.updateMarker({ ...marker, date: 2000 });
    });

    expect(ctx!.markers).toHaveLength(1);
    expect(ctx!.markers[0].date).toBe(2000);
  });

  it("multiple subscriptions get unique ids", () => {
    let ctx: TimelineMarkersContextValue | undefined;
    render(
      <TimelineMarkersProvider>
        <TimelineMarkersConsumer>
          {(value) => {
            ctx = value;
            return null;
          }}
        </TimelineMarkersConsumer>
      </TimelineMarkersProvider>
    );

    let sub1: SubscribeReturn | undefined;
    let sub2: SubscribeReturn | undefined;
    act(() => {
      sub1 = ctx!.subscribeMarker({ type: TimelineMarkerType.Today });
    });
    act(() => {
      sub2 = ctx!.subscribeMarker({ type: TimelineMarkerType.Custom, date: 1000 });
    });

    expect(sub1!.getMarker().id).not.toBe(sub2!.getMarker().id);
    expect(ctx!.markers).toHaveLength(2);
  });
});
