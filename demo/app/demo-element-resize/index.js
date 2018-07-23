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

    const { groups, items } = generateFakeData(10, 200)
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
    const {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      width
    } = this.state

    return (
      <div>
        <div style={{ width: `${width}%`, float: 'left' }}>
          <Timeline
            groups={groups}
            items={items}
            keys={keys}
            sidebarWidth={150}
            sidebarContent={<div>Above The Left er aew rawe rwea rwae</div>}
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
        </div>
        <div style={{ width: `${100 - width}%`, float: 'left' }}>
          <div style={{ padding: 20 }}>
            The timeline is {width}% wide.
            <br />
            <br />
            Set containers width:
            <br />
            {[20, 40, 60, 80].map(p => (
              <span
                key={p}
                onClick={() => this.setState({ width: p })}
                style={{
                  cursor: 'pointer',
                  marginLeft: 10,
                  textDecoration: p === width ? 'underline' : 'none'
                }}
              >
                {p}%
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
