import { calculateInteractionNewTimes } from "lib/utility/calendar";

describe("calculateInteractionNewTimes", () => {
  it("should return the original time start and end if no interaction", () => {
    expect(
      calculateInteractionNewTimes({
        itemTimeStart: 200,
        itemTimeEnd: 300,
        dragTime: null,
        isDragging: false,
        isResizing: false,
        resizingEdge: null,
        resizeTime: null,
      })
    ).toMatchObject([200, 300]);
  });
  it("should calculate new time start and end if being moved", () => {
    expect(
      calculateInteractionNewTimes({
        itemTimeStart: 200,
        itemTimeEnd: 300,
        dragTime: 192,
        isDragging: true,
        isResizing: false,
        resizingEdge: null,
        resizeTime: null,
      })
    ).toMatchObject([192, 292]);
  });
  it("should calculate new time start and end if being resized right", () => {
    expect(
      calculateInteractionNewTimes({
        itemTimeStart: 200,
        itemTimeEnd: 300,
        dragTime: null,
        isDragging: false,
        isResizing: true,
        resizingEdge: "right",
        resizeTime: 250,
      })
    ).toMatchObject([200, 250]);
  });
  it("should calculate new time start and end if being resized left", () => {
    expect(
      calculateInteractionNewTimes({
        itemTimeStart: 200,
        itemTimeEnd: 300,
        dragTime: null,
        isDragging: false,
        isResizing: true,
        resizingEdge: "left",
        resizeTime: 210,
      })
    ).toMatchObject([210, 300]);
  });
  it("preserves item duration when moved to a snapped drag time", () => {
    // dragTime would already be snapped by the caller (e.g., dragTimeSnap)
    // This test verifies the function preserves the original range
    const itemTimeStart = 1000;
    const itemTimeEnd = 1500;
    const snappedDragTime = 2000; // pre-snapped value

    const [newStart, newEnd] = calculateInteractionNewTimes({
      itemTimeStart,
      itemTimeEnd,
      dragTime: snappedDragTime,
      isDragging: true,
      isResizing: false,
      resizingEdge: null,
      resizeTime: null,
    });

    expect(newStart).toBe(2000);
    expect(newEnd).toBe(2500); // 2000 + (1500 - 1000) = 2500
    expect(newEnd - newStart).toBe(itemTimeEnd - itemTimeStart);
  });
});
