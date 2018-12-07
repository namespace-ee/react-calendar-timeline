import {groupNoStack} from 'lib/utility/calendar'
import {orderedGroups, dimensionItems} from '../../../__fixtures__/groupOrderAndItemDimentions'

describe('groupNoStack', ()=>{
    it('works as expected', ()=>{
        const groupHeight = 0;
        const totalHeight = 0;
        const index = 0;
        expect(groupNoStack(60, dimensionItems[index], groupHeight, totalHeight, index)).toMatchSnapshot()
    })
})
