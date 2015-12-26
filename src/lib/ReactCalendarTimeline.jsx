import React, { Component } from 'react'
import moment from 'moment'

// import './ReactCalendarTimeline.scss'

import Items from './items/Items.jsx'
import InfoLabel from './layout/InfoLabel.jsx'
import Sidebar from './layout/Sidebar.jsx'
import Header from './layout/Header.jsx'
import VerticalLines from './lines/VerticalLines.jsx'
import HorizontalLines from './lines/HorizontalLines.jsx'
import TodayLine from './lines/TodayLine.jsx'

import { getMinUnit, getNextUnit, getParentPosition } from './utils.js'

import _min from 'lodash/math/min'
import _max from 'lodash/math/max'

const defaultDesign = {
  evenRowBackground: 'transparent',
  oddRowBackground: 'rgba(0,0,0,0.05)',
  borderColor: '#bbb',
  borderWidth: 1,
  sidebarColor: '#ffffff',
  sidebarBackgroundColor: '#c52020',
  headerColor: '#ffffff',
  headerBackgroundColor: '#c52020',
  lowerHeaderColor: '#333333',
  lowerHeaderBackgroundColor: '#f0f0f0',
  listItemPadding: '0 4px'
}

export default class ReactCalendarTimeline extends Component {
  constructor (props) {
    super(props)

    let visibleTimeStart = null
    let visibleTimeEnd = null

    if (this.props.visibleTimeStart && this.props.visibleTimeEnd) {
      visibleTimeStart = this.props.visibleTimeStart
      visibleTimeEnd = this.props.visibleTimeEnd
    } else {
      visibleTimeStart = _min(this.props.items.map(item => item.start.getTime()))
      visibleTimeEnd = _max(this.props.items.map(item => item.end.getTime()))

      if (!visibleTimeStart || !visibleTimeEnd) {
        visibleTimeStart = new Date().getTime() - 86400 * 7 * 1000
        visibleTimeEnd = new Date().getTime() + 86400 * 7 * 1000
      }
    }

    this.state = {
      width: 1000,

      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      canvasTimeStart: visibleTimeStart - (visibleTimeEnd - visibleTimeStart),

      selectedItem: null,
      dragTime: null,
      dragGroupTitle: null,
      resizeLength: null
    }
  }

  componentDidMount () {
    this.resize()

    this.resizeEventListener = {
      handleEvent: (event) => {
        this.resize()
      }
    }

    window.addEventListener('resize', this.resizeEventListener)

    this.lastTouchDistance = null
    this.refs.scrollComponent.addEventListener('touchstart', this.touchStart.bind(this))
    this.refs.scrollComponent.addEventListener('touchmove', this.touchMove.bind(this))
    this.refs.scrollComponent.addEventListener('touchend', this.touchEnd.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeEventListener)
    this.refs.scrollComponent.removeEventListener('touchstart', this.touchStart.bind(this))
    this.refs.scrollComponent.removeEventListener('touchmove', this.touchMove.bind(this))
    this.refs.scrollComponent.removeEventListener('touchend', this.touchEnd.bind(this))
  }

  touchStart (e) {
    if (e.touches.length === 2) {
      e.preventDefault()

      this.lastTouchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX)
      this.singleTouchStart = null
      this.lastSingleTouch = null
    } else if (e.touches.length === 1 && this.props.fixedHeader === 'fixed') {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      this.lastTouchDistance = null
      this.singleTouchStart = {x: x, y: y, screenY: window.pageYOffset}
      this.lastSingleTouch = {x: x, y: y, screenY: window.pageYOffset}
    }
  }

  touchMove (e) {
    if (this.state.dragTime || this.state.resizeLength) {
      e.preventDefault()
      return
    }
    if (this.lastTouchDistance && e.touches.length === 2) {
      e.preventDefault()

      let touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX)

      let parentPosition = getParentPosition(e.currentTarget)
      let xPosition = (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x

      if (touchDistance !== 0 && this.lastTouchDistance !== 0) {
        this.changeZoom(this.lastTouchDistance / touchDistance, xPosition / this.state.width)
        this.lastTouchDistance = touchDistance
      }
    } else if (this.lastSingleTouch && e.touches.length === 1 && this.props.fixedHeader === 'fixed') {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      let deltaX = x - this.lastSingleTouch.x
      // let deltaY = y - this.lastSingleTouch.y

      let deltaX0 = x - this.singleTouchStart.x
      let deltaY0 = y - this.singleTouchStart.y

      this.lastSingleTouch = {x: x, y: y}

      let moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0)
      let moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0)

      if (deltaX !== 0 && moveX) {
        this.refs.scrollComponent.scrollLeft -= deltaX
      }
      if (moveY) {
        window.scrollTo(window.pageXOffset, this.singleTouchStart.screenY - deltaY0)
      }
    }
  }

  touchEnd (e) {
    if (this.lastTouchDistance) {
      e.preventDefault()

      this.lastTouchDistance = null
    }
    if (this.lastSingleTouch) {
      e.preventDefault()

      this.lastSingleTouch = null
      this.singleTouchStart = null
    }
  }

  resize () {
    let width = this.refs.container.clientWidth - this.props.sidebarWidth
    this.setState({
      width: width
    })
    this.refs.scrollComponent.scrollLeft = width
  }

  onScroll () {
    const scrollComponent = this.refs.scrollComponent
    const canvasTimeStart = this.state.canvasTimeStart
    const scrollX = scrollComponent.scrollLeft
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const width = this.state.width
    const visibleTimeStart = canvasTimeStart + (zoom * scrollX / width)

    if (this.state.visibleTimeStart !== visibleTimeStart || this.state.visibleTimeEnd !== visibleTimeStart + zoom) {
      this.setState({
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeStart + zoom
      })
    }

    if (scrollX < this.state.width * 0.5) {
      this.setState({canvasTimeStart: this.state.canvasTimeStart - zoom})
      scrollComponent.scrollLeft += this.state.width
    }
    if (scrollX > this.state.width * 1.5) {
      this.setState({canvasTimeStart: this.state.canvasTimeStart + zoom})
      scrollComponent.scrollLeft -= this.state.width
    }
  }

  onWheel (e) {
    if (e.ctrlKey) {
      e.preventDefault()

      let parentPosition = getParentPosition(e.currentTarget)
      let xPosition = e.clientX - parentPosition.x

      this.changeZoom(1.0 + e.deltaY / 50, xPosition / this.state.width)
    } else {
      if (this.props.fixedHeader === 'fixed') {
        e.preventDefault()
        if (e.deltaX !== 0) {
          this.refs.scrollComponent.scrollLeft += e.deltaX
        }
        if (e.deltaY !== 0) {
          window.scrollTo(window.pageXOffset, window.pageYOffset + e.deltaY)
        }
      }
    }
  }

  zoomIn (e) {
    e.preventDefault()

    this.changeZoom(0.75)
  }

  zoomOut (e) {
    e.preventDefault()

    this.changeZoom(1.25)
  }

  changeZoom (scale, offset = 0.5) {
    let oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    let newZoom = Math.min(Math.max(Math.round(oldZoom * scale), 60 * 60 * 1000), 20 * 365.24 * 86400 * 1000) // min 1 min, max 20 years
    let realScale = newZoom / oldZoom
    let middle = Math.round(this.state.visibleTimeStart + oldZoom * offset)
    let oldBefore = middle - this.state.canvasTimeStart
    let newBefore = Math.round(oldBefore * realScale)
    let newOriginX = this.state.canvasTimeStart + (oldBefore - newBefore)
    let newMinTime = Math.round(this.state.visibleTimeStart + (oldZoom - newZoom) * offset)

    this.setState({
      canvasTimeStart: newOriginX,
      visibleTimeStart: newMinTime,
      visibleTimeEnd: newMinTime + newZoom
    })
  }

  showPeriod (from, unit) {
    let visibleTimeStart = from.valueOf()
    let visibleTimeEnd = moment(from).add(1, unit).valueOf()
    let zoom = visibleTimeEnd - visibleTimeStart

    // can't zoom in more than to show one hour
    if (zoom < 360000) {
      return
    }

    // clicked on the big header and already focused here, zoom out
    if (unit !== 'year' && this.state.visibleTimeStart === visibleTimeStart && this.state.visibleTimeEnd === visibleTimeEnd) {
      let nextUnit = getNextUnit(unit)

      visibleTimeStart = from.startOf(nextUnit).valueOf()
      visibleTimeEnd = moment(visibleTimeStart).add(1, nextUnit)
      zoom = visibleTimeEnd - visibleTimeStart
    }

    this.setState({
      canvasTimeStart: visibleTimeStart - zoom,
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeStart + zoom
    })

    this.refs.scrollComponent.scrollLeft = this.state.width
  }

  selectItem (item) {
    if (this.state.selectedItem === item) {
      if (item && this.props.itemClick) {
        this.props.itemClick(item)
      }
    } else {
      this.setState({selectedItem: item})
    }
  }

  canvasClick (e) {
    if (e.target.className !== 'timeline-item') {
      this.selectItem(null)
    }
  }

  dragItem (item, dragTime, newGroupOrder) {
    let newGroup = this.props.groups[newGroupOrder]
    this.setState({
      dragTime: dragTime,
      dragGroupTitle: newGroup ? newGroup.title : ''
    })
  }

  dropItem (item, dragTime, newGroupOrder) {
    this.setState({dragTime: null, dragGroupTitle: null})
    if (this.props.moveItem) {
      this.props.moveItem(item, dragTime, newGroupOrder)
    }
  }

  resizingItem (item, newLength) {
    this.setState({resizeLength: newLength})
  }

  resizedItem (item, newLength) {
    this.setState({resizeLength: null})
    if (this.props.resizeItem) {
      this.props.resizeItem(item, newLength)
    }
  }

  design () {
    return Object.assign({}, defaultDesign, this.props.design)
  }

  todayLine () {
    const canvasTimeStart = this.state.canvasTimeStart
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3
    const canvasWidth = this.state.width * 3

    return (
      <TodayLine canvasTimeStart={canvasTimeStart}
                 canvasTimeEnd={canvasTimeEnd}
                 canvasWidth={canvasWidth}
                 lineHeight={this.props.lineHeight}
                 lineCount={this.props.groups.length} />
    )
  }

  verticalLines () {
    const canvasTimeStart = this.state.canvasTimeStart
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3
    const canvasWidth = this.state.width * 3
    const minUnit = getMinUnit(zoom, this.state.width)
    const design = this.design()

    return (
      <VerticalLines canvasTimeStart={canvasTimeStart}
                     canvasTimeEnd={canvasTimeEnd}
                     canvasWidth={canvasWidth}
                     lineHeight={this.props.lineHeight}
                     lineCount={this.props.groups.length}
                     minUnit={minUnit}
                     dayBackground={this.props.dayBackground}
                     borderColor={design.borderColor}
                     fixedHeader={this.props.fixedHeader} />
    )
  }

  horizontalLines () {
    const canvasWidth = this.state.width * 3
    const design = this.design()

    return (
      <HorizontalLines canvasWidth={canvasWidth}
                       lineHeight={this.props.lineHeight}
                       lineCount={this.props.groups.length}
                       backgroundColor={i => i % 2 === 0 ? design.evenRowBackground : design.oddRowBackground}
                       borderWidth={design.borderWidth}
                       borderColor={design.borderColor} />
    )
  }

  items () {
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const minUnit = getMinUnit(zoom, this.state.width)
    const canvasTimeStart = this.state.canvasTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3
    const canvasWidth = this.state.width * 3

    return (
      <Items canvasTimeStart={canvasTimeStart}
             canvasTimeEnd={canvasTimeEnd}
             canvasWidth={canvasWidth}
             lineHeight={this.props.lineHeight}
             lineCount={this.props.groups.length}
             minUnit={minUnit}
             items={this.props.items}
             groups={this.props.groups}
             selectedItem={this.state.selectedItem}
             dragSnap={this.props.dragSnap}
             minResizeWidth={this.props.minResizeWidth}
             canChangeGroup={this.props.canChangeGroup}
             canMove={this.props.canMove}
             canResize={this.props.canResize}
             itemSelect={this.selectItem.bind(this)}
             itemDrag={this.dragItem.bind(this)}
             itemDrop={this.dropItem.bind(this)}
             itemResizing={this.resizingItem.bind(this)}
             itemResized={this.resizedItem.bind(this)} />
    )
  }

  infoLabel () {
    let label = null

    if (this.state.dragTime) {
      label = `${moment(this.state.dragTime).format('LLL')}, ${this.state.dragGroupTitle}`
    } else if (this.state.resizeLength) {
      let minutes = Math.floor(this.state.resizeLength / (60 * 1000))
      let hours = Math.floor(minutes / 60)
      let days = Math.floor(hours / 24)

      minutes = minutes % 60
      hours = hours % 24

      let parts = []
      if (days > 0) {
        parts.push(`${days} d`)
      }
      if (hours > 0 || days > 0) {
        parts.push(`${hours} h`)
      }
      parts.push(`${minutes < 10 ? '0' : ''}${minutes} min`)
      label = parts.join(', ')
    }

    return label ? <InfoLabel label={label} /> : ''
  }

  header () {
    const canvasTimeStart = this.state.canvasTimeStart
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const canvasTimeEnd = canvasTimeStart + zoom * 3
    const canvasWidth = this.state.width * 3
    const minUnit = getMinUnit(zoom, this.state.width)
    const design = this.design()

    return (
      <Header canvasTimeStart={canvasTimeStart}
              canvasTimeEnd={canvasTimeEnd}
              canvasWidth={canvasWidth}
              lineHeight={this.props.lineHeight}
              minUnit={minUnit}
              width={this.state.width}
              zoom={zoom}
              visibleTimeStart={this.state.visibleTimeStart}
              visibleTimeEnd={this.state.visibleTimeEnd}
              headerColor={design.headerColor}
              headerBackgroundColor={design.headerBackgroundColor}
              lowerHeaderColor={design.lowerHeaderColor}
              lowerHeaderBackgroundColor={design.lowerHeaderBackgroundColor}
              borderColor={design.borderColor}
              fixedHeader={this.props.fixedHeader}
              zIndex={this.props.zIndexStart + 1}
              showPeriod={this.showPeriod.bind(this)} />
    )
  }

  sidebar () {
    const design = this.design()

    return (
      <Sidebar groups={this.props.groups}
               width={this.props.sidebarWidth}
               lineHeight={this.props.lineHeight}

               fixedHeader={this.props.fixedHeader}
               zIndex={this.props.zIndexStart + 2}

               sidebarColor={design.sidebarColor}
               sidebarBackgroundColor={design.sidebarBackgroundColor}
               listItemPadding={design.listItemPadding}

               backgroundColor={i => i % 2 === 0 ? design.evenRowBackground : design.oddRowBackground}
               borderWidth={design.borderWidth}
               borderColor={design.borderColor}>
        {this.props.children}
      </Sidebar>
    )
  }

  render () {
    const width = this.state.width
    const height = (this.props.groups.length + 2) * this.props.lineHeight
    const canvasWidth = this.state.width * 3

    const scrollComponentStyle = {
      display: 'inline-block',
      width: `${width}px`,
      height: `${height}px`,
      verticalAlign: 'top',
      overflowX: 'scroll',
      overflowY: 'hidden'
    }

    const canvasComponentStyle = {
      position: 'relative',
      width: `${canvasWidth}px`,
      height: `${height}px`
    }

    return (
      <div style={this.props.style || {}} ref='container' className='react-calendar-timeline'>
        <div>
          {this.sidebar()}
          <div ref='scrollComponent' style={scrollComponentStyle} onScroll={this.onScroll.bind(this)} onWheel={this.onWheel.bind(this)}>
            <div ref='canvasComponent' style={canvasComponentStyle} onClick={this.canvasClick.bind(this)}>
              {this.todayLine()}
              {this.verticalLines()}
              {this.horizontalLines()}
              {this.items()}
              {this.infoLabel()}
              {this.header()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactCalendarTimeline.propTypes = {
  groups: React.PropTypes.array.isRequired,
  items: React.PropTypes.array.isRequired,
  sidebarWidth: React.PropTypes.number,
  dragSnap: React.PropTypes.number,
  minResizeWidth: React.PropTypes.number,
  fixedHeader: React.PropTypes.oneOf(['fixed', 'absolute', 'none']),
  zIndexStart: React.PropTypes.number,
  lineHeight: React.PropTypes.number,

  canChangeGroup: React.PropTypes.bool,
  canMove: React.PropTypes.bool,
  canResize: React.PropTypes.bool,

  moveItem: React.PropTypes.func,
  resizeItem: React.PropTypes.func,
  itemClick: React.PropTypes.func,
  dayBackground: React.PropTypes.func,

  style: React.PropTypes.object,
  design: React.PropTypes.object,

  visibleTimeStart: React.PropTypes.number,
  visibleTimeEnd: React.PropTypes.number,
  changeTime: React.PropTypes.func,

  children: React.PropTypes.node
}
ReactCalendarTimeline.defaultProps = {
  sidebarWidth: 150,
  dragSnap: 1000 * 60 * 15, // 15min
  minResizeWidth: 20,
  fixedHeader: 'none', // fixed or absolute or none
  zIndexStart: 10,
  lineHeight: 30,

  canChangeGroup: true,
  canMove: true,
  canResize: true,

  moveItem: null,
  resizeItem: null,
  itemClick: null,
  dayBackground: null,

  style: {},
  design: {},

  visibleTimeStart: null,
  visibleTimeEnd: null,
  changeTime: null, // called with (visibleTimeStart, visibleTimeEnd), expects to change the props to those

  children: null
}
