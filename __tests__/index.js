import React from 'react'
import { mount } from 'enzyme'
import Timeline from 'lib/Timeline'

import moment from 'moment'

const groups = [
  { id: 2, title: 'group 2' },
  { id: 1, title: 'group 1' },
  { id: 3, title: 'group 3' }
]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment('1995-12-25'),
    end_time: moment('1995-12-25').add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment('1995-12-25').add(-0.5, 'hour'),
    end_time: moment('1995-12-25').add(0.5, 'hour')
  },
  {
    id: 3,
    group: 3,
    title: 'item 3',
    start_time: moment('1995-12-25').add(2, 'hour'),
    end_time: moment('1995-12-25').add(3, 'hour')
  }
]

xdescribe('Timeline', () => {
  it('shows grouping no matter of the group order', () => {
    const wrapper = mount(
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment('1995-12-25').add(-12, 'hour')}
        defaultTimeEnd={moment('1995-12-25').add(12, 'hour')}
      />
    )

    // get the items parent
    const itemsRendered = wrapper.find('.rct-items')

    // array will hold the title and top-position for each item
    var itemsOrder = []

    // read for every item the title and the top-value and push it to itemsOrder[]
    itemsRendered.props().children.forEach(itemRendered =>
      itemsOrder.push({
        title: itemRendered.props.item.title,
        top: itemRendered.props.dimensions.top
      })
    )

    // order the array by top-attribute
    itemsOrder = itemsOrder.sort((a, b) => a.top - b.top)
    expect(itemsOrder[0].title).toBe('item 2')
    expect(itemsOrder[1].title).toBe('item 1')
    expect(itemsOrder[2].title).toBe('item 3')
  })
  it('assigns top dimension to all items', () => {
    const wrapper = mount(
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment('1995-12-25').add(-12, 'hour')}
        defaultTimeEnd={moment('1995-12-25').add(12, 'hour')}
      />
    )

    // get the items parent
    const itemsRendered = wrapper.find('.rct-items')
    itemsRendered.props().children.forEach(item => {
      expect(item.props.dimensions.top).not.toBeNull()
    })
  })

  it('renders component with empty groups', () => {
    let allCorrect = true
    try {
      mount(
        <Timeline
          groups={[]}
          items={items}
          defaultTimeStart={moment('1995-12-25').add(-12, 'hour')}
          defaultTimeEnd={moment('1995-12-25').add(12, 'hour')}
        />
      )
    } catch (err) {
      allCorrect = false
    }
    expect(allCorrect).toBe(true)
  })

  it('renders items without corresponding group', () => {
    let itemsNoValidGroup = [
      {
        start_time: moment('1995-12-25').add(-2, 'hour'),
        end_time: moment('1995-12-25').add(2, 'hour'),
        group: -1, // this ID is not found in groups!
        id: 1,
        title: 'Title'
      }
    ]

    let allCorrect = true
    try {
      mount(
        <Timeline
          groups={groups}
          items={itemsNoValidGroup}
          defaultTimeStart={moment('1995-12-25').add(-12, 'hour')}
          defaultTimeEnd={moment('1995-12-25').add(12, 'hour')}
        />
      )
    } catch (err) {
      allCorrect = false
    }
    expect(allCorrect).toBe(true)
  })

  it('passes correct props to plugins', () => {
    let Plugin = () => <div className="test-plugin" />
    const wrapper = mount(
      <Timeline
        groups={[]}
        items={items}
        stackItems
        defaultTimeStart={moment('1995-12-25').add(-12, 'hour')}
        defaultTimeEnd={moment('1995-12-25').add(12, 'hour')}
      >
        <Plugin />
      </Timeline>
    )

    const pluginRendered = wrapper.find('Plugin')
    const pluginProps = pluginRendered.props()

    expect(typeof pluginProps.canvasTimeStart).toBe('number')
    expect(typeof pluginProps.canvasTimeEnd).toBe('number')
    expect(typeof pluginProps.canvasWidth).toBe('number')
    expect(typeof pluginProps.visibleTimeStart).toBe('number')
    expect(typeof pluginProps.visibleTimeEnd).toBe('number')
    expect(typeof pluginProps.height).toBe('number')
    expect(typeof pluginProps.headerHeight).toBe('number')

    expect(typeof pluginProps.minUnit).toBe('string')

    expect(typeof pluginProps.dimensionItems).toBe('object')
    expect(typeof pluginProps.items).toBe('object')
    expect(typeof pluginProps.groups).toBe('object')
    expect(typeof pluginProps.keys).toBe('object')
    expect(typeof pluginProps.timeSteps).toBe('object')

    expect(pluginProps.selected).toBeInstanceOf(Array)
    expect(pluginProps.groupHeights).toBeInstanceOf(Array)
    expect(pluginProps.groupTops).toBeInstanceOf(Array)
  })
})
