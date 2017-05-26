import React from 'react'
import { mount } from 'enzyme'
import Timeline from '../timeline'

import moment from 'moment'

const groups = [
  {id: 2, title: 'group 2'},
  {id: 1, title: 'group 1'},
  {id: 3, title: 'group 3'}
]

const items = [
  {id: 1, group: 1, title: 'item 1', start_time: moment('1995-12-25'), end_time: moment('1995-12-25').add(1, 'hour')},
  {id: 2, group: 2, title: 'item 2', start_time: moment('1995-12-25').add(-0.5, 'hour'), end_time: moment('1995-12-25').add(0.5, 'hour')},
  {id: 3, group: 3, title: 'item 3', start_time: moment('1995-12-25').add(2, 'hour'), end_time: moment('1995-12-25').add(3, 'hour')}
]

describe('Timeline', () => {
  it('shows grouping no matter of the group order', () => {
    const wrapper = mount(
      <Timeline groups={groups}
                items={items}
                defaultTimeStart={moment('1995-12-25').add(-12, 'hour')}
                defaultTimeEnd={moment('1995-12-25').add(12, 'hour')}
                />,
    )

    // get the items parent
    const itemsRendered = wrapper.find('.rct-items')

    // array will hold the title and top-position for each item
    var itemsOrder = []

    // read for every item the title and the top-value and push it to itemsOrder[]
    itemsRendered.props().children.forEach((itemRendered) => itemsOrder.push({
      title: itemRendered.props.item.title,
      top: itemRendered.props.dimensions.top
    }))

    // order the array by top-attribute
    itemsOrder = itemsOrder.sort((a, b) => a.top - b.top)
    expect(itemsOrder[0].title).toBe('item 2')
    expect(itemsOrder[1].title).toBe('item 1')
    expect(itemsOrder[2].title).toBe('item 3')
  })
})
