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
  scrollHeaderRef: () => {}
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

  it('accepts scrollHeaderRef callback', () => {
    const scrollHeaderRef = jest.fn()

    const props = {
      ...defaultProps,
      scrollHeaderRef: scrollHeaderRef
    }

    mount(<TimelineElementsHeader {...props} />)

    expect(scrollHeaderRef).toHaveBeenCalledTimes(1)

    const mockCallParam = scrollHeaderRef.mock.calls[0][0]

    expect(mockCallParam.dataset.testid).toBe('header')
  })
})
