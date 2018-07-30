import React from 'react'
import { mount } from 'enzyme'
import { noop } from 'test-utility'
import PreventClickOnDrag from 'lib/interaction/PreventClickOnDrag'

const defaultClickTolerance = 10
describe('PreventClickOnDrag', () => {
  it('should prevent click if element is dragged further than clickTolerance pixels forwards', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div />
      </PreventClickOnDrag>
    )

    const originalClientX = 100

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })
    wrapper.simulate('mouseup', {
      clientX: originalClientX + defaultClickTolerance + 1
    })
    wrapper.simulate('click')

    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should prevent click if element is dragged further than clickTolerance pixels backwards', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div />
      </PreventClickOnDrag>
    )
    const originalClientX = 100

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })
    wrapper.simulate('mouseup', {
      clientX: originalClientX - defaultClickTolerance - 1
    })
    wrapper.simulate('click')

    expect(onClickMock).not.toHaveBeenCalled()
  })
  it('should not prevent click if element is dragged less than clickTolerance pixels forwards', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div />
      </PreventClickOnDrag>
    )
    const originalClientX = 100

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })

    wrapper.simulate('mouseup', {
      clientX: originalClientX + defaultClickTolerance - 1
    })
    wrapper.simulate('click')

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should not prevent click if element is dragged less than clickTolerance pixels backwards', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div />
      </PreventClickOnDrag>
    )
    const originalClientX = 100

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })

    wrapper.simulate('mouseup', {
      clientX: originalClientX - defaultClickTolerance + 1
    })
    wrapper.simulate('click')

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
  it('should not prevent click if first interaction was drag but second is click', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div />
      </PreventClickOnDrag>
    )

    const originalClientX = 100

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })
    wrapper.simulate('mouseup', {
      clientX: originalClientX + defaultClickTolerance + 1
    })
    wrapper.simulate('click')

    expect(onClickMock).not.toHaveBeenCalled()

    wrapper.simulate('mousedown', {
      clientX: originalClientX
    })
    wrapper.simulate('mouseup', {
      clientX: originalClientX + defaultClickTolerance - 1 // less thanthreshold
    })
    wrapper.simulate('click')

    expect(onClickMock).toHaveBeenCalled()
  })
  it('calls all other event handlers in wrapped component', () => {
    const doubleClickMock = jest.fn()
    const wrapper = mount(
      <PreventClickOnDrag
        onClick={jest.fn()}
        clickTolerance={defaultClickTolerance}
      >
        <div onDoubleClick={doubleClickMock} />
      </PreventClickOnDrag>
    )

    wrapper.simulate('doubleclick', {})

    expect(doubleClickMock).toHaveBeenCalled()
  })

  it('only allows single children element', () => {
    // dont emit propType error
    jest.spyOn(global.console, 'error').mockImplementation(noop)
    expect(() =>
      mount(
        <PreventClickOnDrag
          onClick={noop}
          clickTolerance={defaultClickTolerance}
        >
          <div>hey</div>
          <div>hi</div>
          <div>how are ya </div>
        </PreventClickOnDrag>
      )
    ).toThrowError(
      'React.Children.only expected to receive a single React element child'
    )

    jest.restoreAllMocks()
  })
})
