import { calculateDimensions } from 'lib/utility/calendar'

describe('calculateDimensions', () => {
  it('the item is full on a canvas no draging no resizing', () => {
    const dimension = calculateDimensions({
      itemTimeStart: 200,
      itemTimeEnd: 300,
      isDragging: false,
      isResizing: false,
      canvasTimeStart: 0,
      canvasTimeEnd: 500,
      canvasWidth: 500,
      dragSnap: 0,
      dragTime: false, // we are not draging right now
      resizingItem: false,
      resizingEdge: false,
      resizeTime: false, // we are not resizing right now
      visibleTimeStart: 0,
      visibleTimeEnd: 500
    })

    expect(dimension).toMatchObject({
      collisionLeft: 200,
      collisionWidth: 100,
      left: 200,
      width: 100
    })
  })

  it('items timeStart is less than canvasTimeStart', () => {
    let example = {
      itemTimeStart: 0,
      itemTimeEnd: 300,
      canvasTimeStart: 100,
      canvasTimeEnd: 500,
      visibleTimeStart: 100,
      visibleTimeEnd: 500,
      canvasWidth: 400,
    }

    expect(calculateDimensions(example)).toMatchObject({
      collisionLeft: 0,
      collisionWidth: 300,
      left: 0,
      width: 200
    })
  })

  it('items timeEnd is greater than canvasTimeEnd', () => {
    let example = {
      itemTimeStart: 400,
      itemTimeEnd: 700,
      canvasTimeStart: 100,
      canvasTimeEnd: 500,
      visibleTimeStart: 100,
      visibleTimeEnd: 500,
      canvasWidth: 400,
    }

    expect(calculateDimensions(example)).toMatchObject({
      collisionLeft: 400,
      collisionWidth: 300,
      left: 300,
      width: 100
    })
  })
  it('item time range completely overlaps canvas time range', () => {
    let example = {
      itemTimeStart: 0, // item range extends before and after canvas
      itemTimeEnd: 600,
      canvasTimeStart: 100,
      canvasTimeEnd: 500,
      canvasWidth: 400,
      visibleTimeStart: 100,
      visibleTimeEnd: 500,
    }

    expect(calculateDimensions(example)).toMatchObject({
      collisionLeft: 0,
      collisionWidth: 600,
      left: 0,
      width: 400
    })
  })
})
