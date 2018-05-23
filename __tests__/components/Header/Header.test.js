import React from 'react'
import { shallow, mount } from 'enzyme'
import { sel } from 'test-utility'
import Header from 'lib/layout/Header'

const defaultProps = {
  hasRightSidebar: false,
  showPeriod: () => {},
  canvasTimeStart: 10000,
  canvasTimeEnd: 20000,
  canvasWidth: 1000,
  lineHeight: 35,
  minUnit: 'day',
  timeSteps: {},
  width: 400,
  headerLabelFormats: {},
  subHeaderLabelFormats: {},
  stickyOffset: 5,
  stickyHeader: true,
  headerLabelGroupHeight: 15,
  headerLabelHeight: 15,
  registerScroll: () => {},
  headerRef: () => {},
  leftSidebarHeader: ()=>{},
  rightSidebarHeader: ()=>{},
}

const selectors = {
  headerElementsContainer: sel('timeline-elements-header-container'),
  headerElements: sel('timeline-elements-header')
}

describe('Header', () => {
  describe('timeline-elements-header', () => {
    it('accepts headerRef callback', () => {
      const headerRefMock = jest.fn()

      const props = {
        ...defaultProps,
        headerRef: headerRefMock
      }

      mount(<Header {...props} />)

      expect(headerRefMock).toHaveBeenCalledTimes(1)

      const mockCallParam = headerRefMock.mock.calls[0][0]

      expect(mockCallParam.dataset.testId).toBe('timeline-elements-container')
    })

    it('container recieves width property', () => {
      const props = {
        ...defaultProps,
        width: 1500
      }

      const wrapper = shallow(<Header {...props} />)

      expect(
        wrapper.find(selectors.headerElementsContainer).props().style.width
      ).toBe(props.width)
    })

    it('elements header receives all props', () => {
      const wrapper = shallow(<Header {...defaultProps} />)

      expect(wrapper.find(selectors.headerElements).props()).toMatchObject(
        defaultProps
      )
    })
  })
  describe('sticky header', () => {
    it('sets "header-sticky" class if stickyHeader is true', () => {
      const props = {
        ...defaultProps,
        stickyHeader: true
      }

      const wrapper = shallow(<Header {...props} />)

      expect(wrapper.props().className).toMatch('header-sticky')
    })
    it('does not set "header-sticky" class if stickyHeader is false', () => {
      const props = {
        ...defaultProps,
        stickyHeader: false
      }

      const wrapper = shallow(<Header {...props} />)

      expect(wrapper.props().className).not.toMatch('header-sticky')
    })
    it('style.top is 0 if stickyHeader is false', () => {
      const props = {
        ...defaultProps,
        stickyHeader: false,
        stickyOffset: 10
      }

      const wrapper = shallow(<Header {...props} />)

      expect(wrapper.props().style.top).toBe(0)
    })
    it('style.top is set to stickyOffset if stickyHeader is true', () => {
      const props = {
        ...defaultProps,
        stickyHeader: true,
        stickyOffset: 10
      }

      const wrapper = shallow(<Header {...props} />)

      expect(wrapper.props().style.top).toBe(props.stickyOffset)
    })
    it('style.top is set to 0 if stickyHeader is true and no stickyOffset is passed in', () => {
      const props = {
        ...defaultProps,
        stickyHeader: true,
        stickyOffset: null
      }

      const wrapper = shallow(<Header {...props} />)

      expect(wrapper.props().style.top).toBe(0)
    })
  })
})
