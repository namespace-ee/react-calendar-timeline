import { calculateInteractionNewTimes } from 'lib/utility/calendar'

describe('calculateInteractionNewTimes', () => {
  it('should return the original time start and end if no interaction', () => {
    expect(
      calculateInteractionNewTimes({
        itemTimeStart: 200,
        itemTimeEnd: 300,
        dragTime: false,
        isDragging: false,
        isResizing: false,
        resizingEdge: false,
        resizeTime: false
      })
    ).toMatchObject([200, 300])
  })
  it('should calculate new time start and end if being moved', () => {
    expect(
      calculateInteractionNewTimes({
        itemTimeStart: 200,
        itemTimeEnd: 300,
        dragTime: 192,
        isDragging: true,
        isResizing: false,
        resizingEdge: false,
        resizeTime: false
      })
    ).toMatchObject([192, 292])
  })
  it('should calculate new time start and end if being resized right', () => {
    expect(
      calculateInteractionNewTimes({
        itemTimeStart: 200,
        itemTimeEnd: 300,
        dragTime: false,
        isDragging: false,
        isResizing: true,
        resizingEdge: 'right',
        resizeTime: 250
      })
    ).toMatchObject([200, 250])
  })
  it('should calculate new time start and end if being resized left', () => {
    expect(
      calculateInteractionNewTimes({
        itemTimeStart: 200,
        itemTimeEnd: 300,
        dragTime: false,
        isDragging: false,
        isResizing: true,
        resizingEdge: 'left',
        resizeTime: 210
      })
    ).toMatchObject([210, 300])
  })
  xit('the item is moved and snapped to the grid', () => {})
})
