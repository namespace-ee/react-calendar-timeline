import React from 'react'
import { mount } from 'enzyme'
import { sel, noop } from '../../../test-utility'
import ScrollElement from '../../../scroll/ScrollElement'

const defaultProps = {
  width: 1000,
  height: 800,
  clickTolerance: 0,
  onScrollAreaClick: noop,
  onWheelZoom: noop,
  onScroll: noop,
  traditionalZoom: false,
  scrollRef: noop,
  isInteractingWithItem: false
}

const createMouseEvent = pageX => ({
  button: 0,
  pageX,
  preventDefault: noop
})

const scrollElementSelector = sel('scroll-element')

describe('ScrollElement', () => {
  describe('mouse drag', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <ScrollElement {...defaultProps}>
          <div />
        </ScrollElement>
      )
    })
    it('scrolls left', () => {
      const originX = 100
      const destinationX = 200

      const scrollDifference = -(destinationX - originX)

      const mouseDownEvent = createMouseEvent(originX)
      const mouseOverEvent = createMouseEvent(destinationX)

      wrapper.instance().scrollComponent.scrollLeft = originX

      wrapper
        .find(scrollElementSelector)
        .simulate('mousedown', mouseDownEvent)
        .simulate('mousemove', mouseOverEvent)

      expect(wrapper.instance().scrollComponent.scrollLeft).toBe(
        originX + scrollDifference
      )
    })

    it('scrolls right', () => {
      const originX = 300
      const destinationX = 100

      const scrollDifference = -(destinationX - originX)

      const mouseDownEvent = createMouseEvent(originX)
      const mouseOverEvent = createMouseEvent(destinationX)

      wrapper.instance().scrollComponent.scrollLeft = originX

      wrapper
        .find(scrollElementSelector)
        .simulate('mousedown', mouseDownEvent)
        .simulate('mousemove', mouseOverEvent)

      expect(wrapper.instance().scrollComponent.scrollLeft).toBe(
        originX + scrollDifference
      )
    })
  })

  describe('mouse leave', () => {
    // guard against bug where dragging persisted after mouse leave
    it('cancels dragging on mouse leave', () => {
      const wrapper = mount(
        <ScrollElement {...defaultProps}>
          <div />
        </ScrollElement>
      )

      const initialScrollLeft = wrapper.instance().scrollComponent.scrollLeft
      const mouseDownEvent = createMouseEvent(100)
      const mouseLeaveEvent = createMouseEvent(100)
      const mouseMoveEvent = createMouseEvent(200)

      wrapper
        .find(scrollElementSelector)
        .simulate('mousedown', mouseDownEvent)
        .simulate('mouseleave', mouseLeaveEvent)
        .simulate('mousemove', mouseMoveEvent)

      // scrollLeft doesnt move
      expect(wrapper.instance().scrollComponent.scrollLeft).toBe(
        initialScrollLeft
      )
    })
  })

  describe('mouse up', () => {
    const clickTolerance = 10
    let onScrollAreaClickMock, wrapper

    beforeEach(() => {
      onScrollAreaClickMock = jest.fn()
      const props = {
        ...defaultProps,
        clickTolerance,
        onScrollAreaClick: onScrollAreaClickMock
      }

      wrapper = mount(
        <ScrollElement {...props}>
          <div />
        </ScrollElement>
      )
    })
    it('calls onScrollAreaClick if click resulted in a drag less than clickTolerance', () => {
      const originX = 100
      const mouseDownEvent = createMouseEvent(originX)
      const mouseUpEvent = createMouseEvent(originX + clickTolerance - 1)

      wrapper
        .find(scrollElementSelector)
        .simulate('mousedown', mouseDownEvent)
        .simulate('mouseup', mouseUpEvent)

      expect(onScrollAreaClickMock).toHaveBeenCalledTimes(1)
    })

    it('calls onScrollAreaClick if click resulted in a drag equal to clickTolerance', () => {
      const originX = 100
      const mouseDownEvent = createMouseEvent(originX)
      const mouseUpEvent = createMouseEvent(originX + clickTolerance)

      wrapper
        .find(scrollElementSelector)
        .simulate('mousedown', mouseDownEvent)
        .simulate('mouseup', mouseUpEvent)

      expect(onScrollAreaClickMock).toHaveBeenCalledTimes(1)
    })
    it('does not call onScrollAreaClick if mouse event resulted in drag greated than clickTolerance', () => {
      const originX = 100
      const mouseDownEvent = createMouseEvent(originX)
      const mouseUpEvent = createMouseEvent(originX + clickTolerance + 1)

      wrapper
        .find(scrollElementSelector)
        .simulate('mousedown', mouseDownEvent)
        .simulate('mouseup', mouseUpEvent)

      expect(onScrollAreaClickMock).not.toHaveBeenCalled()
    })
  })
})
