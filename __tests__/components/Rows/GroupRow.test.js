import React from 'react'
import { fireEvent} from 'react-testing-library';
import render from '../../test-utility/renderWithTimelineStateAndHelpers'
import { noop } from 'test-utility'
import GroupRow from 'lib/rows/GroupRow'
import {RenderGroupRowWrapper} from '../../test-utility/groupRow-renderer'
import 'react-testing-library/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

const defaultProps = {
  onClick: noop,
  onDoubleClick: noop,
  onContextMenu: noop,
  isEvenRow: false,
  clickTolerance: 10,
  style: {},
  group: {}
}

// using mount to be able to interact with element, render
// to assert dom level props (styles, className)
describe('GroupRow', () => {
  it('calls passed in onDoubleClick with correct group index', () => {
    const onDoubleClickMock = jest.fn()
    const text = "some text"
    const {getByText} = render(
      <RenderGroupRowWrapper groupRowState={{onDoubleClick: onDoubleClickMock, groupIndex: 4}}>
        <GroupRow>
          <div>
            {text}
          </div>
        </GroupRow>
      </RenderGroupRowWrapper>
    )
    fireEvent.doubleClick(getByText(text))
    expect(onDoubleClickMock).toHaveBeenCalledTimes(1)
    expect(onDoubleClickMock).toHaveBeenCalledWith(expect.anything(), 4)
  })

  it('calls passed in onClick with correct group index', () => {
    const onClickMock = jest.fn()
    const text = "some text"
    const {getByText} = render(
      <RenderGroupRowWrapper groupRowState={{onClick: onClickMock,  groupIndex: 4}}>
        <GroupRow>
          <div>
            {text}
          </div>
        </GroupRow>
      </RenderGroupRowWrapper>
    )
    fireEvent.click(getByText(text))
    expect(onClickMock).toHaveBeenCalledTimes(1)
    expect(onClickMock).toHaveBeenCalledWith(expect.anything(), 4)
  })

  it('calls passed in onContextMenu with correct group index', () => {
    const onContextMenuMock = jest.fn()
    const text = "some text"
    const {getByText} = render(
      <RenderGroupRowWrapper groupRowState={{onContextMenu: onContextMenuMock,  groupIndex: 4}}>
        <GroupRow>
          <div>
            {text}
          </div>
        </GroupRow>
      </RenderGroupRowWrapper>
    )
    fireEvent.contextMenu(getByText(text))
    expect(onContextMenuMock).toHaveBeenCalledTimes(1)
    expect(onContextMenuMock).toHaveBeenCalledWith(expect.anything(), 4)
  })
  it('assigns "rct-hl-even" class if isEvenRow is true', () => {
    const text = "some text"
    const {getByTestId} = render(
      <RenderGroupRowWrapper groupRowState={{isEvenRow: true}}>
        <GroupRow>
          <div>
            {text}
          </div>
        </GroupRow>
      </RenderGroupRowWrapper>
    )
    const wrapper = getByTestId("groupRow")
    expect(wrapper).toHaveClass("rct-hl-even")
  })
  it('assigns "rct-hl-odd" if isEvenRow is false', () => {
    const text = "some text"
    const {getByTestId} = render(
      <RenderGroupRowWrapper groupRowState={{isEvenRow: false}}>
        <GroupRow>
          <div>
            {text}
          </div>
        </GroupRow>
      </RenderGroupRowWrapper>
    )
    const wrapper = getByTestId("groupRow")
    expect(wrapper).toHaveClass("rct-hl-odd")
  })
  it('passes style prop to style', () => {
    const text = "some text"
    const {getByTestId} = render(
      <RenderGroupRowWrapper groupRowState={{canvasWidth: 3000, groupHeight: 30}}>
        <GroupRow>
          <div>
            {text}
          </div>
        </GroupRow>
      </RenderGroupRowWrapper>
    )
    const wrapper = getByTestId("groupRow")
    expect(wrapper).toHaveStyle(`width: 3000px; height: 30px;`)
  })
})
