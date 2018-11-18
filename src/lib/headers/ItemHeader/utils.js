import { calculateXPositionForTime } from '../../utility/calendar'
export function calculateItemDimensions({
  itemTimeStart,
  itemTimeEnd,
  canvasTimeStart,
  canvasTimeEnd,
  canvasWidth
}) {
  const itemTimeRange = itemTimeEnd - itemTimeStart
  const left = calculateXPositionForTime(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    itemTimeStart
  )
  const right = calculateXPositionForTime(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    itemTimeEnd
  )
  const dimensions = {
    left: left,
    width: Math.max(right - left, 3),
    collisionLeft: itemTimeStart,
    collisionWidth: itemTimeRange
  }

  return dimensions
}
