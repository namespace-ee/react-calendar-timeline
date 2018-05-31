import React from 'react'
import moment from 'moment'
import { mount } from 'enzyme'
import Timeline from 'lib/Timeline'

const defaultProps = {
  ...Timeline.defaultProps,
  items: [],
  groups: []
}

const defaultTimeStart = moment('2018-01-01')
const defaultTimeEnd = moment('2018-03-01')

const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment('2018-02-01'),
    end_time: moment('2018-02-01').add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment('2018-01-01').add(-0.5, 'hour'),
    end_time: moment('2018-01-01').add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]

describe('Timeline', () => {
  describe('initialiation', () => {
    it('sets the visibleTime properties to defaultTime props', () => {
      const props = {
        ...defaultProps,
        defaultTimeStart,
        defaultTimeEnd
      }

      const wrapper = mount(<Timeline {...props} />)

      expect(wrapper.state()).toMatchObject({
        visibleTimeStart: defaultTimeStart.valueOf(),
        visibleTimeEnd: defaultTimeEnd.valueOf()
      })
    })
    it('sets the visibleTime properties to visibleTime props', () => {
      const visibleTimeStart = moment('2018-01-01').valueOf()
      const visibleTimeEnd = moment('2018-03-01').valueOf()

      const props = {
        ...defaultProps,
        visibleTimeStart,
        visibleTimeEnd
      }

      const wrapper = mount(<Timeline {...props} />)

      expect(wrapper.state()).toMatchObject({
        visibleTimeStart,
        visibleTimeEnd
      })
    })
    it('throws error if neither visibleTime or defaultTime props are passed', () => {
      const props = {
        ...defaultProps,
        visibleTimeStart: undefined,
        visibleTimeEnd: undefined,
        defaultTimeStart: undefined,
        defaultTimeEnd: undefined
      }
      expect(() => mount(<Timeline {...props} />)).toThrow(
        'You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline'
      )
    })
    it('should render items', () => {
      const props = {
        ...defaultProps,
        items: items,
        groups: groups,
        defaultTimeStart,
        defaultTimeEnd,
      }

      const wrapper = mount(<Timeline {...props} />)
      expect(wrapper.find('div.rct-item')).toHaveLength(2)
    })
    it('should render custom elements using itemRenderer with title', () => {
      const props = {
        ...defaultProps,
        items: items,
        groups: groups,
        defaultTimeStart,
        defaultTimeEnd,
        itemRenderer: ({
          item,
          timelineContext,
          itemContext,
          getItemProps,
          getResizeProps,
        }) => {
          const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()

          return (
            <h1
              {...getItemProps(item.itemProps) }
            >
                {itemContext.title}
            </h1>
          )
        }
      }

      const wrapper = mount(<Timeline {...props} />)
      const wrapperItems = wrapper.find('h1.rct-item')
      expect(wrapperItems).toHaveLength(2)
      wrapperItems.forEach((item, index) => {
        expect(item.text()).toEqual(items[index].title)
      });
    })
  })
})
