import { Component } from 'react'
import dayjs from 'dayjs'

import Timeline from 'react-calendar-timeline'
// import containerResizeDetector from '../../../src/resize-detector/container'

// you would use this in real life:
// import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container'

import generateFakeData from '../generate-fake-data'

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  groupLabelKey:'title',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time'
}

export default class App extends Component<{}, any> {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData(10, 200)
    const defaultTimeStart = dayjs()
      .startOf('day')
      .toDate()
    const defaultTimeEnd = dayjs()
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

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
            start: dragTime,
            end: dragTime + (item.end - item.start),
            group: group.id
          })
          : item
      )
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
            start: edge === "left" ? time : item.start,
            end: edge === "left" ? item.end : time
          })
          : item
      )
    });

    console.log("Resized", itemId, time, edge);
  };

  render() {
    // @ts-ignore
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
            // itemsSorted
            itemTouchSendsClick={false}
            stackItems
            itemHeightRatio={0.75}
            // resizeDetector={containerResizeDetector}
            defaultTimeStart={defaultTimeStart}
            defaultTimeEnd={defaultTimeEnd}
            onItemMove={this.handleItemMove}
            onItemResize={this.handleItemResize}
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
