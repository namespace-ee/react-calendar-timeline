import { getGroupOrders } from 'lib/utility/calendar'
import { groups} from '../../../__fixtures__/itemsAndGroups'
import {defaultKeys} from 'lib/default-config'
describe('getGroupOrders', () => {
  it('works as expected', () => {
    expect(getGroupOrders(groups, defaultKeys)).toMatchSnapshot()
  })
})
