import {groupStack} from 'lib/utility/calendar'
import {orderedGroups, dimensionItems} from '../../../__fixtures__/groupOrderAndItemDimentions'

describe('groupStack', ()=>{
    it('works as expected', ()=>{
        const groupHeight = 0;
        const totalHeight = 0;
        const index = 0;
        expect(groupStack(60, dimensionItems[index], dimensionItems, groupHeight, totalHeight, index)).toMatchSnapshot()
    })
})
