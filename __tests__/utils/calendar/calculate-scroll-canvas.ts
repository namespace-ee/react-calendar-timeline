import { calculateScrollCanvas } from 'lib/utility/calendar'
import type { ReactCalendarTimelineProps, ReactCalendarTimelineState } from 'lib/Timeline'
import type { TimelineItemBase, TimelineGroupBase } from 'lib/types/main'
import {items, groups} from '../../../__fixtures__/itemsAndGroups'
import {props as rawProps, state as rawState, visibleTimeStart, visibleTimeEnd} from '../../../__fixtures__/stateAndProps'

const props = rawProps as unknown as ReactCalendarTimelineProps<TimelineItemBase<number>, TimelineGroupBase>
const state = rawState as unknown as ReactCalendarTimelineState<TimelineItemBase<number>, TimelineGroupBase>


describe('calculateScrollCanvas', () => {
  it('should calculate new scroll state', () => {
    const newStartTime = visibleTimeStart + 13 * 60 * 60 * 1000
    const newEndTime = visibleTimeEnd + visibleTimeStart + 13 * 60 * 60 * 1000
    const result = calculateScrollCanvas(
      newStartTime,
      newEndTime,
      false,
      items,
      groups,
      props,
      state
    )
    expect(result).toHaveProperty('visibleTimeStart')
    expect(result).toHaveProperty('visibleTimeEnd')
    expect(result).toHaveProperty('dimensionItems')
  })
  it('should calculate new scroll state correctly', () => {
    const newStartTime = visibleTimeStart + 13 * 60 * 60 * 1000
    const newEndTime = visibleTimeEnd + 13 * 60 * 60 * 1000
    const result = calculateScrollCanvas(
      newStartTime,
      newEndTime,
      false,
      items,
      groups,
      props,
      state
    )
    expect(result).toMatchSnapshot()
  })
  it('should skip new calculation if new visible start and visible end in canvas', () => {
    const newStartTime = visibleTimeStart +  1 * 60 * 60 * 1000
    const newEndTime = visibleTimeEnd +  1 * 60 * 60 * 1000
    const result = calculateScrollCanvas(
      newStartTime,
      newEndTime,
      false,
      items,
      groups,
      props,
      state
    )
    expect(result).toHaveProperty('visibleTimeStart')
    expect(result).toHaveProperty('visibleTimeEnd')
    expect(result).not.toHaveProperty('dimensionItems')
  })
  it('should force new calculation', () => {
    const newStartTime = visibleTimeStart +   1 * 60 * 60 * 1000
    const newEndTime = visibleTimeEnd +   1 * 60 * 60 * 1000
    const result = calculateScrollCanvas(
      newStartTime.valueOf(),
      newEndTime.valueOf(),
      true,
      items,
      groups,
      props,
      state
    )
    expect(result).toHaveProperty('visibleTimeStart')
    expect(result).toHaveProperty('visibleTimeEnd')
    expect(result).toHaveProperty('dimensionItems')
  })
  it('should calculate new state if zoom changed', () => {
    const newStartTime = visibleTimeStart
    const newEndTime = visibleTimeEnd +  1 * 60 * 60 * 1000
    const result = calculateScrollCanvas(
      newStartTime,
      newEndTime,
      false,
      items,
      groups,
      props,
      state
    )
    expect(result).toHaveProperty('visibleTimeStart')
    expect(result).toHaveProperty('visibleTimeEnd')
    expect(result).toHaveProperty('dimensionItems')
  })
  it('should calculate new state if zoom changed correctly', () => {
    const newStartTime = visibleTimeStart
    const newEndTime = visibleTimeEnd +  1 * 60 * 60 * 1000
    const result = calculateScrollCanvas(
      newStartTime,
      newEndTime,
      false,
      items,
      groups,
      props,
      state
    )
    expect(result).toMatchSnapshot()
  })
})
