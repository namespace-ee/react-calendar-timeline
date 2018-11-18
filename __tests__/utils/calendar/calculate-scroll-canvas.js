import { calculateScrollCanvas } from 'lib/utility/calendar'
import {defaultKeys} from 'lib/default-config'
import moment from 'moment'
import {items, groups} from '../../../__fixtures__/itemsAndGroups'
import {props, state, visibleTimeStart, visibleTimeEnd} from '../../../__fixtures__/stateAndProps'


describe('calculateScrollCanvas', () => {
  it('should calculate new scroll state', () => {
    const newStartTime = visibleTimeStart.clone().add(13, 'h')
    const newEndTime = visibleTimeEnd.clone().add(13, 'h')
    const result = calculateScrollCanvas(
      newStartTime.valueOf(),
      newEndTime.valueOf(),
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
  it('should skip new calculation if new visible start and visible end in canvas', () => {
    const newStartTime = visibleTimeStart.clone().add(1, 'h')
    const newEndTime = visibleTimeEnd.clone().add(1, 'h')
    const result = calculateScrollCanvas(
      newStartTime.valueOf(),
      newEndTime.valueOf(),
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
    const newStartTime = visibleTimeStart.clone().add(1, 'h')
    const newEndTime = visibleTimeEnd.clone().add(1, 'h')
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
  it('should calculate new state if zoom changed ', () => {
    const newStartTime = visibleTimeStart.clone()
    const newEndTime = visibleTimeEnd.clone().add(1, 'h')
    const result = calculateScrollCanvas(
      newStartTime.valueOf(),
      newEndTime.valueOf(),
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
})
