import React from 'react'
import { render } from 'react-testing-library'
import { items, groups } from '../../../__fixtures__/itemsAndGroups'
import {
  props as defaultProps
} from '../../../__fixtures__/stateAndProps'
import 'react-testing-library/cleanup-after-each'
import Timeline from 'lib/Timeline'
import '@testing-library/jest-dom/extend-expect'

/**
 * Testing The Default Functionality
 */
describe('Renders default headers correctly', () => {
  it('Given Timeline When not using TimelineHeaders then it should render 2 DateHeaders and a left sidebar header by default ', () => {
    const { getAllByTestId, getByTestId } = renderDefaultTimeline();
    expect(getAllByTestId('dateHeader')).toHaveLength(2);
    expect(getByTestId('headerContainer').children).toHaveLength(2);
    expect(getByTestId('sidebarHeader')).toBeInTheDocument();
  });
  it('Given TimelineHeader When pass a rightSidebarWidthWidth Then it should render two sidebar headers', () => {
    let rightSidebarWidth = 150;
    const { getAllByTestId } = renderDefaultTimeline({ rightSidebarWidth });
    const sidebarHeaders = getAllByTestId('sidebarHeader');
    expect(sidebarHeaders).toHaveLength(2);
    expect(sidebarHeaders[0]).toBeInTheDocument();
    expect(sidebarHeaders[1]).toBeInTheDocument();
    const { width } = getComputedStyle(sidebarHeaders[1]);
    expect(width).toBe('150px');
  });
});

export function renderDefaultTimeline(props = {}) {
  const timelineProps = {
    ...defaultProps,
    items,
    groups,
    ...props
  }
  return render(<Timeline {...timelineProps} />)
}
