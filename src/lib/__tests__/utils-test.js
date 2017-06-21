import { calculateDimensions } from '../utils.js'

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
      fullUpdate: true,
      visibleTimeStart: 0,
      visibleTimeEnd: 500
    })

    expect(dimension).toMatchObject({
      clippedLeft: false,
      clippedRight: false,
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
      fullUpdate: true,
      visibleTimeStart: 0,
      visibleTimeEnd: 500
    })

    expect(dimension).toMatchObject({
      clippedLeft: false,
      clippedRight: false,
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
      fullUpdate: true,
      visibleTimeStart: 100,
      visibleTimeEnd: 500
    }
    expect(calculateDimensions(example)).toMatchObject({
      clippedLeft: true,
      clippedRight: false,
      collisionLeft: 0,
      collisionWidth: 300,
      left: 0,
      originalLeft: 0,
      width: 200
    })
    // if we don't do the fullUpdate we don't get correct
    // clipping informations
    example.fullUpdate = false
    expect(calculateDimensions(example)).toMatchObject({
      clippedLeft: false,
      clippedRight: false,
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
      fullUpdate: true,
      visibleTimeStart: 500,
      visibleTimeEnd: 900
    }
    expect(calculateDimensions(example)).toMatchObject({
      clippedLeft: false,
      clippedRight: true,
      collisionLeft: 700,
      collisionWidth: 300,
      left: 200,
      originalLeft: 700,
      width: 200
    })
    // if we don't do the fullUpdate we don't get correct
    // clipping informations
    example.fullUpdate = false
    expect(calculateDimensions(example)).toMatchObject({
      clippedLeft: false,
      clippedRight: false,
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
      fullUpdate: true,
      visibleTimeStart: 0,
      visibleTimeEnd: 500
    })

    expect(dimension).toMatchObject({
      clippedLeft: false,
      clippedRight: false,
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
      resizeTime: 250,
      fullUpdate: true,
      visibleTimeStart: 0,
      visibleTimeEnd: 500
    })

    expect(dimension).toMatchObject({
      clippedLeft: false,
      clippedRight: false,
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
      fullUpdate: true,
      visibleTimeStart: 0,
      visibleTimeEnd: 500
    })

    expect(dimension).toMatchObject({
      clippedLeft: false,
      clippedRight: false,
      collisionLeft: 210,
      collisionWidth: 90,
      left: 210,
      originalLeft: 200,
      width: 90
    })
  })
})
