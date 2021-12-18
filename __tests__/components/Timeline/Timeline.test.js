import React from 'react'
import moment from 'moment'
import { mount } from 'enzyme'
import Timeline from 'lib/Timeline'
import { noop, sel } from 'test-utility'

const defaultProps = {
  ...Timeline.defaultProps,
  items: [],
  groups: []
}

describe('Timeline', () => {
  describe('initialization', () => {
    it('sets the visibleTime properties to defaultTime props', () => {
      const defaultTimeStart = moment('2018-01-01')
      const defaultTimeEnd = moment('2018-03-01')

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
      jest.spyOn(global.console, 'error').mockImplementation(noop)
      expect(() => mount(<Timeline {...props} />)).toThrow(
        'You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline'
      )
      jest.restoreAllMocks()
    })
  })

  describe('scrolling', () => {
    const visibleTimeStart = moment('2018-01-01').valueOf()
    const visibleTimeEnd = moment('2018-03-01').valueOf()
    const mockOnEndTimeChange = jest.fn();

    afterEach(() => {
      mockOnEndTimeChange.mockReset()
    })

    it('calls onEndScroll', () => {
      const props = {
        ...defaultProps,
        visibleTimeStart,
        visibleTimeEnd,
        onEndTimeChange: mockOnEndTimeChange
      }
      const wrapper = mount(<Timeline {...props} />)

      const scrollElement = wrapper.find(sel('scroll-element'))
      wrapper.instance().scrollComponent.scrollLeft = 200
      scrollElement.simulate('scroll');
      scrollElement.simulate('mouseUp');

      expect(mockOnEndTimeChange).toHaveBeenCalledTimes(1);
    })

    it('does not call onEndScroll if not scrolled', () => {
      const props = {
        ...defaultProps,
        visibleTimeStart,
        visibleTimeEnd,
        onEndTimeChange: mockOnEndTimeChange
      }
      const wrapper = mount(<Timeline {...props} />)

      const scrollElement = wrapper.find(sel('scroll-element'))
      scrollElement.simulate('scroll');
      scrollElement.simulate('mouseUp');

      expect(mockOnEndTimeChange).not.toHaveBeenCalled();
    })
  })
})
