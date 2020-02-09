import React from 'react'
import { render, cleanup } from 'react-testing-library'
import DateHeader from 'lib/headers/DateHeader'
import SidebarHeader from 'lib/headers/SidebarHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import '@testing-library/jest-dom/extend-expect'
import { RenderHeadersWrapper } from '../../test-utility/header-renderer'
import {
  renderSidebarHeaderWithCustomValues,
  renderTwoSidebarHeadersWithCustomValues
} from '../../test-utility/headerRenderers'

describe('Testing SidebarHeader Component', () => {
  afterEach(cleanup)

  //TODO: rename test
  it('Given sidebarHeader When pass style with overridden (width) Then it should not override the default values', () => {
    const { getByTestId, debug } = renderSidebarHeaderWithCustomValues({
      props: { style: { width: 250 } }
    })
    const { width } = getComputedStyle(getByTestId('sidebarHeader'))
    expect(width).not.toBe('250px')
  })

  it('Given sidebarHeader When pass style Then it show on the sidebar', () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({
      props: { style: { color: 'white' } }
    })
    const { color } = getComputedStyle(getByTestId('sidebarHeader'))
    expect(color).toBe('white')
  })

  it('Given SidebarHeader When a render function Then it will be rendered', () => {
    const renderer = jest.fn(({ getRootProps }) => {
      return (
        <div data-testid="leftSidebarHeader" {...getRootProps()}>
          Left
        </div>
      )
    })
    const { getByTestId } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>{renderer}</SidebarHeader>
          <DateHeader primaryHeader />
          <DateHeader />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    expect(renderer).toHaveBeenCalled()
    expect(getByTestId('leftSidebarHeader')).toBeInTheDocument()
  })

  it('Given SidebarHeader When passing props to SidebarHeader it should be passed to the renderProp', () => {
    const renderer = jest.fn(({ getRootProps }) => {
      return (
        <div data-testid="leftSidebarHeader" {...getRootProps()}>
          Left
        </div>
      )
    })
    const extraProps = {
      someData: 'data'
    }
    const { getByTestId } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader headerData={extraProps}>{renderer}</SidebarHeader>
          <DateHeader primaryHeader />
          <DateHeader />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    expect(renderer).toHaveBeenCalled()
    expect(renderer.mock.calls[0][0].data).toBe(extraProps)
  })

  //  Testing The Example In The Docs
  it('Given SidebarHeader When rendered Then it should shown correctly in the timeline', () => {
    const { getByTestId } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <div data-testid="leftSidebarHeader" {...getRootProps()}>
                  Left
                </div>
              )
            }}
          </SidebarHeader>
          <SidebarHeader variant="right">
            {({ getRootProps }) => {
              return (
                <div data-testid="rightSidebarHeader" {...getRootProps()}>
                  Right
                </div>
              )
            }}
          </SidebarHeader>
          <DateHeader primaryHeader />
          <DateHeader />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )

    expect(getByTestId('leftSidebarHeader')).toBeInTheDocument()
    expect(getByTestId('rightSidebarHeader')).toBeInTheDocument()

    expect(getByTestId('leftSidebarHeader').nextElementSibling).toHaveAttribute(
      'data-testid',
      'headerContainer'
    )
    expect(
      getByTestId('rightSidebarHeader').previousElementSibling
    ).toHaveAttribute('data-testid', 'headerContainer')
  })
  it('Given SideBarHeader When passing a react stateless component as a child Then it should render', () => {
    const Renderer = ({ getRootProps }) => {
      return (
        <div data-testid="leftSidebarHeader" {...getRootProps()}>
          Left
        </div>
      )
    }
    const { getByText } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>{Renderer}</SidebarHeader>
          <DateHeader primaryHeader />
          <DateHeader />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    expect(getByText('Left')).toBeInTheDocument()
  })
  it('Given SideBarHeader When passing a react stateful component as a child Then it should render', () => {
    class Renderer extends React.Component {
      render() {
        const { getRootProps } = this.props
        return (
          <div data-testid="leftSidebarHeader" {...getRootProps()}>
            Left
          </div>
        )
      }
    }
    const { getByText } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>{Renderer}</SidebarHeader>
          <DateHeader primaryHeader />
          <DateHeader />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    expect(getByText('Left')).toBeInTheDocument()
  })
})
