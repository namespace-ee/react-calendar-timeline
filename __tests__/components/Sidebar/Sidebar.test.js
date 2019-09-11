import React from 'react'
import { mount } from 'enzyme'
import Sidebar from 'lib/layout/Sidebar'

const defaultProps = {
  groups: [
    {
        bgColor: '#e8ccff',
        id: '2998',
        label: 'Label Dustin"',
        rightTitle: 'Wolff',
        title: 'Carlotta',
    },
    {
        bgColor: '#e8ccff',
        id: '2999',
        label: 'Label Myrtle"',
        rightTitle: '"Sauer"',
        title: 'Elmer',
    }
  ],
  width: 10,
  height: 10,
  groupHeights: [30, 27],
  keys: {
    groupIdKey: 'id',
    groupRightTitleKey: 'rightTitle',
    groupTitleKey: 'title',
    itemDivTitleKey: 'title',
    itemGroupKey: 'group',
    itemIdKey: 'id',
    itemTimeEndKey: 'end',
    itemTimeStartKey: 'start',
    itemTitleKey: 'title'
  }
}

describe('GroupRows', () => {
  it('passes props and get right height for first group', () => {
    const wrapper = mount(<Sidebar {...defaultProps} />);

    const component = wrapper.find('div.rct-sidebar-row').first();
    expect(component.prop('style').height).toBe('30px');
  })
})
