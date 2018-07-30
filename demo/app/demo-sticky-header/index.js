import React, { Component } from 'react'
import moment from 'moment'

import Timeline from 'react-calendar-timeline'
import containerResizeDetector from '../../../src/resize-detector/container'

// you would use this in real life:
// import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container'

import generateFakeData from '../generate-fake-data'

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData()
    const defaultTimeStart = moment()
      .startOf('day')
      .toDate()
    const defaultTimeEnd = moment()
      .startOf('day')
      .add(1, 'day')
      .toDate()
    const width = 80

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      width
    }
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state

    return (
      <div style={{ padding: 20, paddingTop: 0 }}>
        In this example we have a lot of random content above the timeline.<br />
        Try scrolling and see how the timeline header sticks to the screen.<br />
        <br />
        <Timeline
          groups={groups}
          items={items}
          keys={keys}
          sidebarWidth={150}
          sidebarContent={<div>Above The Left</div>}
          rightSidebarWidth={150}
          rightSidebarContent={<div>Above The Right</div>}
          canMove
          canResize="right"
          canSelect
          itemsSorted
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          resizeDetector={containerResizeDetector}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
        />
        <br />
        There is also a lot of stuff below the timeline. Watch the header fix
        itself to the bottom of the component.
        <br />
        <br />
        bla bla bla
        <br />
        <br />
        Here are random pictures of Tom Selleck:
        <br />
        <br />
        <img
          src="https://s-media-cache-ak0.pinimg.com/originals/a3/7a/59/a37a59d5b677968d21748bcac06df48b.jpg"
          style={{ width: '80%' }}
        />
        <br />
        <br />
        <img
          src="https://d1mlsq9roc275d.cloudfront.net/dynamic/1/photos/815000/Tom-Selleck-255815.jpg"
          style={{ width: '80%' }}
        />
        <br />
        <br />
        Here is another calendar, but this one has <code>stickyOffset</code> set
        to <code>100</code>, meaning that the header will stick 100px from the
        top. This is useful for example if you already have a sticky navbar.
        <br />
        <br />
        <Timeline
          groups={groups}
          items={items}
          keys={keys}
          stickyOffset={100}
          sidebarWidth={150}
          sidebarContent={<div>Above The Left</div>}
          rightSidebarWidth={150}
          rightSidebarContent={<div>Above The Right</div>}
          canMove
          canResize="right"
          canSelect
          itemsSorted
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          resizeDetector={containerResizeDetector}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
        />
        <div style={{ height: 1000 }} />
      </div>
    )
  }
}
