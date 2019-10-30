import { stackGroup } from 'lib/utility/calendar'
import { dimensionItems } from '../../../__fixtures__/groupOrderAndItemDimentions'

describe('stackGroup', ()=>{
    it('should stack list of items', ()=>{
        expect(stackGroup(dimensionItems, true, 30)).toMatchSnapshot()
    })
    it('should not stack list of items', ()=>{
        expect(stackGroup(dimensionItems, false, 30)).toMatchSnapshot()
    })
})