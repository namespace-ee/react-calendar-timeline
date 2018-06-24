import React from 'react'
import { mount } from 'enzyme'
import { sel, noop } from 'test-utility'
import TimelineElementsHeader from 'lib/layout/TimelineElementsHeader'

const defaultProps = {
  hasRightSidebar: false,
  showPeriod: noop,
  canvasTimeStart: 0,
  canvasTimeEnd: 0,
  canvasWidth: 1000,
  minUnit: 'day',
  timeSteps: {},
  width: 0,
  headerLabelFormats: {},
  subHeaderLabelFormats: {},
  headerLabelGroupHeight: 0,
  headerLabelHeight: 0,
  registerScroll: () => {}
}

describe('Header', () => {
  it('renders', () => {
    mount(<TimelineElementsHeader {...defaultProps} />)
  })

  it('prevents mouse down from bubbling', () => {
    const mouseDownMock = jest.fn()
    const wrapper = mount(
      <div onMouseDown={mouseDownMock}>
        <TimelineElementsHeader {...defaultProps} />
      </div>
    )

    wrapper.find(sel('header')).simulate('mousedown')

    expect(mouseDownMock).not.toHaveBeenCalled()
  })

  describe('scroll sync', () => {
    it('call to registerScroll listener updates scrollLeft of root element', () => {
      const registerScrollMock = jest.fn()
      const props = {
        ...defaultProps,
        registerScroll: registerScrollMock
      }

      const wrapper = mount(<TimelineElementsHeader {...props} />)

      expect(wrapper.getDOMNode().scrollLeft).toBe(0)

      const scrollListener = registerScrollMock.mock.calls[0][0]

      const scrollX = 100

      scrollListener(scrollX)

      expect(wrapper.getDOMNode().scrollLeft).toBe(scrollX)
    })
    it('scrollLeft is not set if scrollX is null', () => {
      const registerScrollMock = jest.fn()
      const props = {
        ...defaultProps,
        registerScroll: registerScrollMock
      }

      const wrapper = mount(<TimelineElementsHeader {...props} />)

      expect(wrapper.getDOMNode().scrollLeft).toBe(0)

      const scrollListener = registerScrollMock.mock.calls[0][0]

      scrollListener(undefined)

      expect(wrapper.getDOMNode().scrollLeft).toBe(0)
    })
  })
})
