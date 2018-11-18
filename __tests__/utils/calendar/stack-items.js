import {stackItems} from 'lib/utility/calendar'
import {items, groups} from '../../../__fixtures__/itemsAndGroups'
import {props, state} from '../../../__fixtures__/stateAndProps'
describe('stackItems', ()=>{
    it('work as expected', ()=>{
        const result = stackItems(items, groups, state.canvasTimeStart, state.visibleTimeStart, state.visibleTimeEnd, 3000, props, state);
        expect(result).toMatchSnapshot()
    })
})
