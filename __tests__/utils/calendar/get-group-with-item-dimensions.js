import {getGroupWithItemDimensions} from 'lib/utility/calendar'
import {items} from '../../../__fixtures__/itemsAndGroups'
import {props, state} from '../../../__fixtures__/stateAndProps'


describe('getGroupWithItemDimensions', ()=>{
    it('should work as expected', ()=>{
        const groupWithItems = {
            items,
        }
        expect(getGroupWithItemDimensions(
            groupWithItems,
            props.keys,
            state.canvasTimeStart,
            state.canvasTimeEnd,
            state.width*3,
            props.lineHeight,
            props.itemHeightRatio,
            props.stackItems
        )).toMatchSnapshot()
    })
    it("should pass along group's data with item", ()=>{
        const groupWithItems = {
            items,
            passThrough: '2323'
        }
        expect(getGroupWithItemDimensions(
            groupWithItems,
            props.keys,
            state.canvasTimeStart,
            state.canvasTimeEnd,
            state.width*3,
            props.lineHeight,
            props.itemHeightRatio,
            props.stackItems
        )).toEqual(expect.objectContaining({
            passThrough: expect.any(String)
        }))
    })
    it('should pass new reference of groupWithItems', ()=>{
        const groupWithItems = {
            items,
        }
        expect(getGroupWithItemDimensions(
            groupWithItems,
            props.keys,
            state.canvasTimeStart,
            state.canvasTimeEnd,
            state.width*3,
            props.lineHeight,
            props.itemHeightRatio,
            props.stackItems
        )).not.toBe(groupWithItems)
    })
})

