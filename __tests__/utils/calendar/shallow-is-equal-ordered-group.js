import { shallowIsEqualOrderedGroup } from 'lib/utility/calendar'
import { groups, items } from '../../../__fixtures__/itemsAndGroups'

describe('shallowIsEqualOrderedGroup', () => {
  it('should return true if passing same group', ()=>{
    const newGroupOrder = {
      group: groups[0],
      index: 0,
      items: [items[0], items[1], items[2]]
    }
    const oldGroupOrder = {
      group: groups[0],
      index: 0,
      items: [items[0], items[1], items[2]]
    }
    expect(shallowIsEqualOrderedGroup(newGroupOrder, oldGroupOrder)).toBeTruthy()
  })
  it('should return false if group reference is different', ()=>{
    const newGroupOrder = {
      group: Object.assign({},groups[0]),
      index: 0,
      items: [items[0], items[1], items[2]]
    }
    const oldGroupOrder = {
      group: groups[0],
      index: 0,
      items: [items[0], items[1], items[2]]
    }
    expect(shallowIsEqualOrderedGroup(newGroupOrder, oldGroupOrder)).toBeFalsy()
  })
  it('should return false if different index', ()=>{
    const newGroupOrder = {
      group: groups[0],
      index: 1,
      items: [items[0], items[1], items[2]]
    }
    const oldGroupOrder = {
      group: groups[0],
      index: 0,
      items: [items[0], items[1], items[2]]
    }
    expect(shallowIsEqualOrderedGroup(newGroupOrder, oldGroupOrder)).toBeFalsy()
  })
  it('should return false if one of the items has different reference', ()=>{
    const newGroupOrder = {
      group: groups[0],
      index: 0,
      items: [items[0], items[1], items[2]]
    }
    const oldGroupOrder = {
      group: groups[0],
      index: 0,
      items: [items[0], Object.assign({},items[1]), items[2]]
    }
    expect(shallowIsEqualOrderedGroup(newGroupOrder, oldGroupOrder)).toBeFalsy()
  })
})
