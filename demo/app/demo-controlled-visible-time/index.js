import React, { Component } from "react";
import moment from "moment";

import Timeline from "react-calendar-timeline";

import generateFakeData from "../generate-fake-data";

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

export default class App extends Component {
  constructor(props) {
    super(props);

    const { groups, items } = generateFakeData();
    const visibleTimeStart = moment()
      .startOf("day")
      .valueOf();
    const visibleTimeEnd = moment()
      .startOf("day")
      .add(1, "day")
      .valueOf();

    this.state = {
      groups,
      items,
      visibleTimeStart,
      visibleTimeEnd
    };
  }

  onPrevClick = () => {
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
    this.setState(state => ({
      visibleTimeStart: state.visibleTimeStart - zoom,
      visibleTimeEnd: state.visibleTimeEnd - zoom
    }));
  };

  onNextClick = () => {
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
    this.setState(state => ({
      visibleTimeStart: state.visibleTimeStart + zoom,
      visibleTimeEnd: state.visibleTimeEnd + zoom
    }));
  };

  render() {
    const { groups, items, visibleTimeStart, visibleTimeEnd } = this.state;

    return (
      <div>
        <button onClick={this.onPrevClick}>{"< Prev"}</button>
        <button onClick={this.onNextClick}>{"Next >"}</button>
        <Timeline
          scrollRef={el => (this.scrollRef = el)}
          groups={groups}
          items={items}
          keys={keys}
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          showCursorLine
          canMove={false}
          canResize={false}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
        />
      </div>
    );
  }
}