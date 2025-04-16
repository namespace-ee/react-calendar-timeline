import React from 'react'
import { Component } from 'react'
import dayjs from 'dayjs'
import randomColor from "randomcolor";

import Timeline, { TimelineMarkers, TodayMarker, CustomMarker, CursorMarker } from '../../../src/index'

import generateFakeData from './generate-fake-data'

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

function customData() {
  let randomSeed = Math.floor(Math.random() * 1000);
  let groups = [
    { id: 1, title: "G1", rightTitle: "Right Title 1", bgColor: randomColor({ luminosity: "light", seed: randomSeed + 0 }) },
    { id: 2, title: "G2", rightTitle: "Right Title 2", bgColor: randomColor({ luminosity: "light", seed: randomSeed + 1 }) },
    { id: 3, title: "G3", rightTitle: "Right Title 3", bgColor: randomColor({ luminosity: "light", seed: randomSeed + 2 }) },
  ]

  let items = [];
  items.push({
    id: "0",
    group: "1",
    title: "Hercules",
    start: 0,
    end: 16 * 10,
    canChangeGroup: false,
    className: "",
    itemProps: { "data-tip": "GO" }
  });
  items.push({
    id: "1",
    group: "1",
    title: "Ares",
    start: 16 * 12,
    end: 16 * 30,
    canChangeGroup: false,
    className: "",
    itemProps: { "data-tip": "GO" }
  });
  items.push({
    id: "2",
    group: "2",
    title: "Artemis",
    start: 16 * 4,
    end: 16 * 124,
    canMove: true,
    canChangeGroup: false,
    className: "",
    itemProps: { "data-tip": "GO" }
  });
  items.push({
    id: "3",
    group: "3",
    title: "Athena",
    start: 16 * 1,
    end: 16 * 60,
    canChangeGroup: false,
    canResize: "both",
    className: "",
    itemProps: { "data-tip": "GO" }
  });

  return { groups, items };
}

export default class App extends Component {
  constructor(props) {
    super(props);

    // const { groups, items } = generateFakeData(3, 6, 1);
    const { groups, items } = customData();
    // const defaultTimeStart = dayjs(items[0].start_time).startOf('day').toDate().valueOf()
    const defaultTimeStart = 1
    // const defaultTimeEnd = dayjs(items[0].end_time).startOf('day').add(1, 'day').toDate().valueOf()
    const defaultTimeEnd = 10000

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd
    };
  }

  handleItemClick = (itemId, _, time) => {
    console.log('Clicked: ' + itemId, dayjs(time).format())
  }

  handleItemSelect = (itemId, _, time) => {
    console.log('Selected: ' + itemId, dayjs(time).format())
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
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        fullUpdate
        itemTouchSendsClick={false}
        minZoom={5}
        maxZoom={16 * 6 * 5 * 4 * 5}
        dragSnap={1000}
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={"both"}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
        onItemClick={this.handleItemClick}
        onItemSelect={this.handleItemSelect}
        onTimeChange={(visibleStartTime, visibleEndTime, updateScrollCanvas) => {
          if (visibleStartTime > defaultTimeStart) {
            updateScrollCanvas(visibleStartTime, visibleEndTime);
          }
        }
        }
      />
    );
  }
}
