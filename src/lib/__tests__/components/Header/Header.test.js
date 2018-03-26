import React from 'react'
import { mount } from 'enzyme'
import { sel, noop } from '../../../test-utility'
import Header from '../../../layout/Header'

const defaultProps = {
  hasRightSidebar: false,
  showPeriod: noop,
  canvasTimeStart: 0,
  canvasTimeEnd: 0,
  canvasWidth: 0,
  lineHeight: 0,
  visibleTimeStart: 0,
  visibleTimeEnd: 0,
  minUnit: 'day',
  timeSteps: {},
  width: 0,
  headerLabelFormats: {},
  subHeaderLabelFormats: {},
  headerLabelGroupHeight: 0,
  headerLabelHeight: 0
}

describe('Header', () => {
  it('renders', () => {
    mount(<Header {...defaultProps} />)
  })

  it('prevents mouse down from bubbling', () => {
    const mouseDownMock = jest.fn()
    const wrapper = mount(
      <div onMouseDown={mouseDownMock}>
        <Header {...defaultProps} />
      </div>
    )

    wrapper.find(sel('header')).simulate('mousedown')

    expect(mouseDownMock).not.toHaveBeenCalled()
  })
})
