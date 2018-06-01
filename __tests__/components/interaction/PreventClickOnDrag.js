import React from 'react'
import { mount } from 'enzyme'
import PreventClickOnDrag from 'lib/interaction/PreventClickOnDrag'

describe('PreventClickOnDrag', () => {
  it('should prevent click if element is dragged further than 10 pixels - forward', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag onClick={onClickMock}>
        <div />
      </PreventClickOnDrag>
    )

    const originalClientX = 100

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })
    wrapper.simulate('mouseup', {
      clientX: originalClientX + 11
    })
    wrapper.simulate('click')

    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should prevent click if element is dragged further than 10 pixels - backwards', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag onClick={onClickMock}>
        <div />
      </PreventClickOnDrag>
    )
    const originalClientX = 100

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })
    wrapper.simulate('mouseup', {
      clientX: originalClientX - 11
    })
    wrapper.simulate('click')

    expect(onClickMock).not.toHaveBeenCalled()
  })
  it('should not prevent click if element is dragged less than 10 pixels - forwards', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag onClick={onClickMock}>
        <div />
      </PreventClickOnDrag>
    )
    const originalClientX = 100

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })

    wrapper.simulate('mouseup', {
      clientX: originalClientX + 9
    })
    wrapper.simulate('click')

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should not prevent click if element is dragged less than 10 pixels - forwards', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag onClick={onClickMock}>
        <div />
      </PreventClickOnDrag>
    )
    const originalClientX = 100

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })

    wrapper.simulate('mouseup', {
      clientX: originalClientX - 9
    })
    wrapper.simulate('click')

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
  it('should not prevent click if first interaction was drag but second is click', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag onClick={onClickMock}>
        <div />
      </PreventClickOnDrag>
    )

    const originalClientX = 100

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })
    wrapper.simulate('mouseup', {
      clientX: originalClientX + 11
    })
    wrapper.simulate('click')

    expect(onClickMock).not.toHaveBeenCalled()

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })
    wrapper.simulate('mouseup', {
      clientX: originalClientX + 9 // less thanthreshold
    })
    wrapper.simulate('click')

    expect(onClickMock).toHaveBeenCalled()
  })
  it('calls all other event handlers in wrapped component', () => {
    const doubleClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag onClick={jest.fn()}>
        <div onDoubleClick={doubleClickMock} />
      </PreventClickOnDrag>
    )

    wrapper.simulate('doubleclick', {})

    expect(doubleClickMock).toHaveBeenCalled()
  })
})
