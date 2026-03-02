import { getItemDimensions } from 'lib/utility/calendar'
import {items} from '../../../__fixtures__/itemsAndGroups'
import {state} from '../../../__fixtures__/stateAndProps'
import { defaultKeys } from 'lib/default-config'
import {orderedGroups} from '../../../__fixtures__/groupOrderAndItemDimentions'

describe('getItemDimensions', () => {
    it("should evaluate dimensions for an item", ()=>{
        const item = items[0]
        const {canvasTimeStart, canvasTimeEnd} = state
        expect(getItemDimensions({
            item,
            keys: defaultKeys,
            canvasTimeStart,
            canvasTimeEnd,
            canvasWidth: 3000,
            groupOrders: orderedGroups,
            lineHeight: 60,
            itemHeightRatio: 1,
        })).toMatchSnapshot()
    })
})
