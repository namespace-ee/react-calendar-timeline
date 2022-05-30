import React from 'react'
import { mount } from 'enzyme'
import { noop } from 'test-utility'
import GroupRow from 'lib/row/GroupRow'
import { RenderHeadersWrapper } from '../../test-utility/header-renderer'

const defaultProps = {
  onClick: noop,
  onDoubleClick: noop,
  onContextMenu: noop,
  isEvenRow: false,
  clickTolerance: 10,
  style: {},
  group: {}
}

// using mount to be able to interact with element
describe('GroupRow', () => {
  it('calls passed in onDoubleClick', () => {
    const onDoubleClickMock = jest.fn()
    const props = {
      ...defaultProps,
      onDoubleClick: onDoubleClickMock
    }

    const wrapper = mount(
      <RenderHeadersWrapper>
        <GroupRow {...props} />
      </RenderHeadersWrapper>
    )

    const component = wrapper.find('GroupRow')
    component.simulate('doubleclick')

    expect(onDoubleClickMock).toHaveBeenCalledTimes(1)
  })

  it('calls passed in onClick', () => {
    const onClickMock = jest.fn()
    const props = {
      ...defaultProps,
      onClick: onClickMock
    }

    const wrapper = mount(
      <RenderHeadersWrapper>
        <GroupRow {...props} />
      </RenderHeadersWrapper>
    )

    const component = wrapper.find('GroupRow')
    component.simulate('click')

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('calls passed in onContextMenu', () => {
    const onContextMenuMock = jest.fn()
    const props = {
      ...defaultProps,
      onContextMenu: onContextMenuMock
    }

    const wrapper = mount(
      <RenderHeadersWrapper>
        <GroupRow {...props} />
      </RenderHeadersWrapper>
    )

    const component = wrapper.find('GroupRow')
    component.simulate('contextmenu')

    expect(onContextMenuMock).toHaveBeenCalledTimes(1)
  })

  it('assigns "rct-hl-even" class if isEvenRow is true', () => {
    const props = {
      ...defaultProps,
      isEvenRow: true
    }

    const wrapper = mount(
      <RenderHeadersWrapper>
        <GroupRow {...props} />
      </RenderHeadersWrapper>
    )

    const component = wrapper.find('GroupRow')

    expect(component.hasClass('rct-hl-even'))
  })

  it('assigns "rct-hl-odd" if isEvenRow is false', () => {
    const props = {
      ...defaultProps,
      isEvenRow: false
    }

    const wrapper = mount(
      <RenderHeadersWrapper>
        <GroupRow {...props} />
      </RenderHeadersWrapper>
    )

    const component = wrapper.find('GroupRow')
    
    expect(component.hasClass('rct-hl-odd'))
  })

  it('passes style prop to style', () => {
    const props = {
      ...defaultProps,
      style: { border: '1px solid black' }
    }

    const wrapper = mount(
      <RenderHeadersWrapper>
        <GroupRow {...props} />
      </RenderHeadersWrapper>
    )

    const component = wrapper.find('GroupRow')

    expect(component.prop('style').border).toBe(props.style.border)
  })
})
