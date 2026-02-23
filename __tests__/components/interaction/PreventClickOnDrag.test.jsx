import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { noop } from 'test-utility'
import PreventClickOnDrag from 'lib/interaction/PreventClickOnDrag'

const defaultClickTolerance = 10

describe('PreventClickOnDrag', () => {
  it('should prevent click if element is dragged further than clickTolerance pixels forwards', () => {
    const onClickMock = vi.fn()
    const { container } = render(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div />
      </PreventClickOnDrag>
    )

    const el = container.firstChild
    const originalClientX = 100

    fireEvent.mouseDown(el, { clientX: originalClientX })
    fireEvent.mouseUp(el, { clientX: originalClientX + defaultClickTolerance + 1 })
    fireEvent.click(el)

    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should prevent click if element is dragged further than clickTolerance pixels backwards', () => {
    const onClickMock = vi.fn()
    const { container } = render(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div />
      </PreventClickOnDrag>
    )

    const el = container.firstChild
    const originalClientX = 100

    fireEvent.mouseDown(el, { clientX: originalClientX })
    fireEvent.mouseUp(el, { clientX: originalClientX - defaultClickTolerance - 1 })
    fireEvent.click(el)

    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should not prevent click if element is dragged less than clickTolerance pixels forwards', () => {
    const onClickMock = vi.fn()
    const { container } = render(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div />
      </PreventClickOnDrag>
    )

    const el = container.firstChild
    const originalClientX = 100

    fireEvent.mouseDown(el, { clientX: originalClientX })
    fireEvent.mouseUp(el, { clientX: originalClientX + defaultClickTolerance - 1 })
    fireEvent.click(el)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should not prevent click if element is dragged less than clickTolerance pixels backwards', () => {
    const onClickMock = vi.fn()
    const { container } = render(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div />
      </PreventClickOnDrag>
    )

    const el = container.firstChild
    const originalClientX = 100

    fireEvent.mouseDown(el, { clientX: originalClientX })
    fireEvent.mouseUp(el, { clientX: originalClientX - defaultClickTolerance + 1 })
    fireEvent.click(el)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should not prevent click if first interaction was drag but second is click', () => {
    const onClickMock = vi.fn()
    const { container } = render(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div />
      </PreventClickOnDrag>
    )

    const el = container.firstChild
    const originalClientX = 100

    // First interaction: drag beyond tolerance
    fireEvent.mouseDown(el, { clientX: originalClientX })
    fireEvent.mouseUp(el, { clientX: originalClientX + defaultClickTolerance + 1 })
    fireEvent.click(el)

    expect(onClickMock).not.toHaveBeenCalled()

    // Second interaction: click within tolerance
    fireEvent.mouseDown(el, { clientX: originalClientX })
    fireEvent.mouseUp(el, { clientX: originalClientX + defaultClickTolerance - 1 })
    fireEvent.click(el)

    expect(onClickMock).toHaveBeenCalled()
  })

  it('calls all other event handlers in wrapped component', () => {
    const doubleClickMock = vi.fn()
    const { container } = render(
      <PreventClickOnDrag
        onClick={vi.fn()}
        clickTolerance={defaultClickTolerance}
      >
        <div onDoubleClick={doubleClickMock} />
      </PreventClickOnDrag>
    )

    fireEvent.doubleClick(container.firstChild)

    expect(doubleClickMock).toHaveBeenCalled()
  })

  it('only allows single children element', () => {
    vi.spyOn(console, 'error').mockImplementation(noop)
    expect(() =>
      render(
        <PreventClickOnDrag
          onClick={noop}
          clickTolerance={defaultClickTolerance}
        >
          <div>hey</div>
          <div>hi</div>
          <div>how are ya</div>
        </PreventClickOnDrag>
      )
    ).toThrow()

    vi.restoreAllMocks()
  })
})
