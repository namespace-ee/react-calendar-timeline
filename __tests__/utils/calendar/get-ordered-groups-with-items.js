import {getOrderedGroupsWithItems} from 'lib/utility/calendar'
import {items, groups} from '../../../__fixtures__/itemsAndGroups'
import {props} from '../../../__fixtures__/stateAndProps'


describe('getGroupWithItemDimensions', ()=>{
    it('should work as expected', ()=>{
        expect(getOrderedGroupsWithItems(groups, items, props.keys)).toMatchSnapshot()
    })
    it('should have all groups indexed', ()=>{
        const result = getOrderedGroupsWithItems(groups, items, props.keys)
        expect(Object.keys(result)).toHaveLength(groups.length)
    })
    it('should index all items into corresponding groups', ()=>{
        const result = getOrderedGroupsWithItems(groups, items, props.keys)
        let itemSum = 0;
        Object.keys(result).forEach((id)=>{
            itemSum += result[id].items.length
        })
        expect(itemSum).toBe(items.length)
    })
    it('should have an empty array of items if no items exist for group', ()=>{
        const itemsWithNoGroupId2 = items.filter(item => {
            return item.group !== '2'
        })
        const result = getOrderedGroupsWithItems(groups, itemsWithNoGroupId2, props.keys)
        expect(Array.isArray(result['2'].items)).toBeTruthy();
        expect(result['2'].items).toHaveLength(0);
    })
})