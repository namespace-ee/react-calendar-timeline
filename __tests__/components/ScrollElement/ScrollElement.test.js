import React from 'react'
import { mount } from 'enzyme'
import { sel, noop } from 'test-utility'
import ScrollElement from 'lib/scroll/ScrollElement'

const defaultProps = {
  width: 1000,
  height: 800,
  onZoom: noop,
  onWheelZoom: noop,
  onScroll: noop,
  traditionalZoom: false,
  scrollRef: noop,
  isInteractingWithItem: false,
  onMouseLeave: noop,
  onMouseMove: noop,
  onMouseEnter: noop,
  onContextMenu: noop
}

const createMouseEvent = pageX => ({
  button: 0,
  pageX,
  preventDefault: noop
})

const scrollElementSelector = sel('scroll-element')

xdescribe('ScrollElement', () => {
  describe('mouse event delegates', () => {
    let onDoubleClickMock,
      onMouseLeaveMock,
      onMouseMoveMock,
      onMouseEnterMock,
      onContextMenuMock,
      wrapper

    beforeEach(() => {
      onDoubleClickMock = jest.fn()
      onMouseLeaveMock = jest.fn()
      onMouseMoveMock = jest.fn()
      onMouseEnterMock = jest.fn()
      onContextMenuMock = jest.fn()

      const props = {
        ...defaultProps,
        onDoubleClick: onDoubleClickMock,
        onMouseLeave: onMouseLeaveMock,
        onMouseMove: onMouseMoveMock,
        onMouseEnter: onMouseEnterMock,
        onContextMenu: onContextMenuMock
      }

      wrapper = mount(
        <ScrollElement {...props}>
          <div />
        </ScrollElement>
      )
    })

    it('scroll element onMouseLeave calls passed in onMouseLeave', () => {
      wrapper.find(scrollElementSelector).simulate('mouseleave')
      expect(onMouseLeaveMock).toHaveBeenCalledTimes(1)
    })
    it('scroll element onMouseMove calls passed in onMouseMove', () => {
      wrapper.find(scrollElementSelector).simulate('mousemove')
      expect(onMouseMoveMock).toHaveBeenCalledTimes(1)
    })
    it('scroll element onMouseEnter calls passed in onMouseEnter', () => {
      wrapper.find(scrollElementSelector).simulate('mouseenter')
      expect(onMouseEnterMock).toHaveBeenCalledTimes(1)
    })
    it('scroll element onContextMenu calls passed in onContextMenu', () => {
      wrapper.find(scrollElementSelector).simulate('contextmenu')
      expect(onContextMenuMock).toHaveBeenCalledTimes(1)
    })
  })
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

  describe('scroll', () => {
    it('calls onScroll with current scrollLeft', () => {
      const onScrollMock = jest.fn()
      const props = {
        ...defaultProps,
        onScroll: onScrollMock
      }

      const wrapper = mount(
        <ScrollElement {...props}>
          <div />
        </ScrollElement>
      )
      const scrollLeft = 200
      wrapper.instance().scrollComponent.scrollLeft = scrollLeft

      wrapper.find(scrollElementSelector).simulate('scroll')

      expect(onScrollMock).toHaveBeenCalledTimes(1)
    })
    it('adds width to scrollLeft if scrollLeft is less than half of width', () => {
      const width = 800
      const props = {
        ...defaultProps,
        width
      }

      const wrapper = mount(
        <ScrollElement {...props}>
          <div />
        </ScrollElement>
      )

      const currentScrollLeft = 300
      wrapper.instance().scrollComponent.scrollLeft = currentScrollLeft

      wrapper.simulate('scroll')

      expect(wrapper.instance().scrollComponent.scrollLeft).toBe(
        currentScrollLeft + width
      )
    })
    it('subtracts width from scrollLeft if scrollLeft is greater than one and a half of width', () => {
      const width = 800
      const props = {
        ...defaultProps,
        width
      }

      const wrapper = mount(
        <ScrollElement {...props}>
          <div />
        </ScrollElement>
      )

      const currentScrollLeft = 1300
      wrapper.instance().scrollComponent.scrollLeft = currentScrollLeft

      wrapper.simulate('scroll')

      expect(wrapper.instance().scrollComponent.scrollLeft).toBe(
        currentScrollLeft - width
      )
    })

    it('does not alter scrollLeft if scrollLeft is between 0.5 and 1.5 of width', () => {
      const width = 800
      const props = {
        ...defaultProps,
        width
      }

      const wrapper = mount(
        <ScrollElement {...props}>
          <div />
        </ScrollElement>
      )

      // three samples between this range
      const scrolls = [width * 0.5 + 1, width, width * 1.5 - 1]

      scrolls.forEach(scroll => {
        wrapper.instance().scrollComponent.scrollLeft = scroll

        wrapper.simulate('scroll')

        expect(wrapper.instance().scrollComponent.scrollLeft).toBe(scroll)
      })
    })
  })
})
