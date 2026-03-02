import React from 'react'
import { render } from '@testing-library/react'
import { defaultItemRenderer } from 'lib/items/defaultItemRenderer'

const createRendererProps = (overrides = {}) => {
  const dimensions = {
    left: 100,
    top: 50,
    width: 200,
    height: 30,
    ...(overrides.dimensions || {}),
  }

  return {
    item: {
      id: '1',
      group: 1,
      title: 'Test Item',
      start_time: Date.now(),
      end_time: Date.now() + 3600000,
      itemProps: {},
      ...(overrides.item || {}),
    },
    timelineContext: {
      getTimelineState: () => ({}),
      getLeftOffsetFromDate: () => 0,
      getDateFromLeftOffsetPosition: () => 0,
      showPeriod: () => {},
    },
    itemContext: {
      dimensions,
      useResizeHandle: false,
      title: 'Test Item',
      canMove: true,
      canResizeLeft: false,
      canResizeRight: false,
      selected: false,
      dragging: false,
      dragStart: null,
      dragTime: null,
      dragGroupDelta: null,
      resizing: false,
      resizeEdge: null,
      resizeStart: null,
      resizeTime: null,
      ...(overrides.itemContext || {}),
    },
    getItemProps: (props = {}) => ({
      key: 'item-1',
      ref: React.createRef(),
      className: 'rct-item' + (props.className ? ` ${props.className}` : ''),
      style: { position: 'absolute', left: '100px', top: '50px', width: '200px', height: '30px' },
      title: 'Test Item',
      ...props,
    }),
    getResizeProps: () => ({
      left: {
        ref: () => {},
        className: 'rct-item-handler rct-item-handler-left rct-item-handler-resize-left',
        style: { position: 'absolute', width: 24, left: 0 },
      },
      right: {
        ref: () => {},
        className: 'rct-item-handler rct-item-handler-right rct-item-handler-resize-right',
        style: { position: 'absolute', width: 24, right: 0 },
      },
    }),
    ...overrides,
  }
}

describe('defaultItemRenderer', () => {
  it('renders item with title content', () => {
    const props = createRendererProps()
    const { container } = render(defaultItemRenderer(props))

    const content = container.querySelector('.rct-item-content')
    expect(content).toBeInTheDocument()
    expect(content.textContent).toBe('Test Item')
  })

  it('renders rct-item class on wrapper', () => {
    const props = createRendererProps()
    const { container } = render(defaultItemRenderer(props))

    expect(container.querySelector('.rct-item')).toBeInTheDocument()
  })

  it('hides resize handles when useResizeHandle is false', () => {
    const props = createRendererProps()
    // useResizeHandle defaults to false in createRendererProps
    const { container } = render(defaultItemRenderer(props))

    expect(container.querySelector('.rct-item-handler-resize-left')).not.toBeInTheDocument()
    expect(container.querySelector('.rct-item-handler-resize-right')).not.toBeInTheDocument()
  })

  it('shows resize handles when useResizeHandle is true', () => {
    const props = createRendererProps()
    props.itemContext.useResizeHandle = true
    const { container } = render(defaultItemRenderer(props))

    expect(container.querySelector('.rct-item-handler-resize-left')).toBeInTheDocument()
    expect(container.querySelector('.rct-item-handler-resize-right')).toBeInTheDocument()
  })
})
