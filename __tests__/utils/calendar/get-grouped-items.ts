import { getGroupedItems } from 'lib/utility/calendar'
import {orderedGroups, dimensionItems} from '../../../__fixtures__/groupOrderAndItemDimentions'

describe('getGroupedItems', () => {
  it('works as expected', () => {
    expect(getGroupedItems(dimensionItems,orderedGroups)).toMatchSnapshot()
  })
})
