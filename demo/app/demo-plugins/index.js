import './styles.scss'

import React, { Component } from 'react'
import moment from 'moment'

import Timeline from 'react-calendar-timeline'
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

class BackgroundPainter extends Component {
  // only repaint if something really changes
  shouldComponentUpdate (nextProps) {
    return nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
           nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
           nextProps.canvasWidth !== this.props.canvasWidth ||
           Object.values(nextProps.groupHeights).join(',') !== Object.values(this.props.groupHeights).join(',')
  }

  render () {
    const { groupTops, groupHeights, canvasWidth, groups } = this.props

    // console.log(this.props)

    let backgrounds = []
    for (let i = 0; i < groups.length; i++) {
      backgrounds.push(
        <div key={i}
             style={{
               position: 'absolute',
               top: groupTops[i],
               height: groupHeights[i],
               left: 0,
               width: canvasWidth,
               background: groups[i].bgColor,
               zIndex: 20
             }} />
      )
    }

    return (
      <div style={{display: 'absolute'}}>
        {backgrounds}
      </div>
    )
  }
}

export default class App extends Component {
  constructor (props) {
    super(props)

    const { groups, items } = generateFakeData(15, 400)

    const visibleTimeStart = moment().startOf('day').valueOf()
    const visibleTimeEnd = moment().startOf('day').add(1, 'day').valueOf()

    this.state = {
      groups,
      items,
      visibleTimeStart,
      visibleTimeEnd
    }
  }

  handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    this.setState({ visibleTimeStart, visibleTimeEnd })
  }

  render () {
    const { groups, items, visibleTimeStart, visibleTimeEnd } = this.state

    return (
      <div className='demo-painter'>
        <Timeline groups={groups}
                  items={items}
                  keys={keys}
                  fixedHeader='fixed'
                  fullUpdate

                  sidebarWidth={150}
                  sidebarContent={<div>Above The Left</div>}

                  canMove
                  canResize='right'
                  canSelect

                  itemsSorted
                  itemTouchSendsClick={false}
                  stackItems
                  itemHeightRatio={0.75}

                  visibleTimeStart={visibleTimeStart}
                  visibleTimeEnd={visibleTimeEnd}

                  showCursorLine

                  onTimeChange={this.handleTimeChange}>
          <BackgroundPainter />
        </Timeline>
      </div>
    )
  }
}
