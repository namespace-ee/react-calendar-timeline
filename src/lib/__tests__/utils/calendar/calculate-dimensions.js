import { calculateDimensions } from '../../../utility/calendar'

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
      originalLeft: 200,
      width: 100
    })
  })

  it('the item is moved and snapped to the grid', () => {
    const dimension = calculateDimensions({
      itemTimeStart: 200,
      itemTimeEnd: 300,
      isDragging: true,
      isResizing: false,
      canvasTimeStart: 0,
      canvasTimeEnd: 500,
      canvasWidth: 500,
      dragSnap: 10,
      dragTime: 192,
      resizingItem: false,
      resizingEdge: false,
      resizeTime: false, // we are not resizing right now
      visibleTimeStart: 0,
      visibleTimeEnd: 500
    })

    expect(dimension).toMatchObject({
      collisionLeft: 192,
      collisionWidth: 108,
      left: 192,
      originalLeft: 200,
      width: 100
    })
  })

  it('the item is on the left side clipped', () => {
    let example = {
      itemTimeStart: 0,
      itemTimeEnd: 300,
      isDragging: false,
      isResizing: false,
      canvasTimeStart: 100,
      canvasTimeEnd: 500,
      canvasWidth: 400,
      dragSnap: 0,
      dragTime: false, // we are not draging right now
      resizingItem: false,
      resizingEdge: false,
      resizeTime: false, // we are not resizing right now
      visibleTimeStart: 100,
      visibleTimeEnd: 500
    }

    expect(calculateDimensions(example)).toMatchObject({
      collisionLeft: 0,
      collisionWidth: 300,
      left: -100,
      originalLeft: 0,
      width: 300
    })
  })

  it('the item is on the right side clipped', () => {
    let example = {
      itemTimeStart: 700,
      itemTimeEnd: 1000,
      isDragging: false,
      isResizing: false,
      canvasTimeStart: 500,
      canvasTimeEnd: 900,
      canvasWidth: 400,
      dragSnap: 0,
      dragTime: false, // we are not draging right now
      resizingItem: false,
      resizingEdge: false,
      resizeTime: false, // we are not resizing right now
      visibleTimeStart: 500,
      visibleTimeEnd: 900
    }

    expect(calculateDimensions(example)).toMatchObject({
      collisionLeft: 700,
      collisionWidth: 300,
      left: 200,
      originalLeft: 700,
      width: 300
    })
  })

  it('the item is draged', () => {
    const dimension = calculateDimensions({
      itemTimeStart: 200,
      itemTimeEnd: 300,
      isDragging: true,
      isResizing: false,
      canvasTimeStart: 0,
      canvasTimeEnd: 500,
      canvasWidth: 500,
      dragSnap: 0,
      dragTime: 300,
      resizingItem: false,
      resizingEdge: false,
      resizeTime: false, // we are not resizing right now
      visibleTimeStart: 0,
      visibleTimeEnd: 500
    })

    expect(dimension).toMatchObject({
      collisionLeft: 200,
      collisionWidth: 200,
      left: 300,
      originalLeft: 200,
      width: 100
    })
  })

  it('the item is resized right', () => {
    const dimension = calculateDimensions({
      itemTimeStart: 200,
      itemTimeEnd: 300,
      isDragging: false,
      isResizing: true,
      canvasTimeStart: 0,
      canvasTimeEnd: 500,
      canvasWidth: 500,
      dragSnap: 0,
      dragTime: false, // we are not draging right now
      resizingItem: true,
      resizingEdge: 'right',
      resizeTime: 250
    })

    expect(dimension).toMatchObject({
      collisionLeft: 200,
      collisionWidth: 50,
      left: 200,
      originalLeft: 200,
      width: 50
    })
  })

  it('the item is resized left', () => {
    const dimension = calculateDimensions({
      itemTimeStart: 200,
      itemTimeEnd: 300,
      isDragging: false,
      isResizing: true,
      canvasTimeStart: 0,
      canvasTimeEnd: 500,
      canvasWidth: 500,
      dragSnap: 0,
      dragTime: false, // we are not draging right now
      resizingItem: true,
      resizingEdge: 'left',
      resizeTime: 210,
      visibleTimeStart: 0,
      visibleTimeEnd: 500
    })

    expect(dimension).toMatchObject({
      collisionLeft: 210,
      collisionWidth: 90,
      left: 210,
      originalLeft: 200,
      width: 90
    })
  })
})
