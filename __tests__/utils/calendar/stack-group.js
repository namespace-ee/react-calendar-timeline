import { stackGroup } from 'lib/utility/calendar'
import { dimensionItems } from '../../../__fixtures__/groupOrderAndItemDimentions'

describe('stackGroup', ()=>{
    it('should stack list of items space', ()=>{
        expect(stackGroup(dimensionItems, 'space', 30, 0)).toMatchSnapshot()
    })
    it('should stack list of items lines', ()=>{
        expect(stackGroup(dimensionItems, 'lines', 30, 0)).toMatchSnapshot()
    })
    it('should not stack list of items', ()=>{
        expect(stackGroup(dimensionItems, false, 30, 0)).toMatchSnapshot()
    })
})