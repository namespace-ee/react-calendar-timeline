import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import interact from 'interact.js'

import { _get } from '../utils'

export default class Item extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dragging: null,
      dragStart: null,
      preDragPosition: null,
      dragTime: null,
      dragGroupDelta: null,

      resizing: null,
      resizeStart: null,
      resizeTime: null
    }
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  coordinateToTimeRatio (props = this.props) {
    return (props.canvasTimeEnd - props.canvasTimeStart) / props.canvasWidth
  }

  dragTimeSnap (dragTime) {
    if (this.props.dragSnap) {
      return Math.round(dragTime / this.props.dragSnap) * this.props.dragSnap
    } else {
      return dragTime
    }
  }

  dragTime (e) {
    let item = this.props.item

    if (this.state.dragging) {
      const deltaX = e.pageX - this.state.dragStart.x
      const timeDelta = deltaX * this.coordinateToTimeRatio()

      return this.dragTimeSnap(_get(item, 'start').getTime() + timeDelta)
    } else {
      return _get(item, 'start').getTime()
    }
  }

  dragGroupDelta (e) {
    if (this.state.dragging) {
      if (!this.props.canChangeGroup) {
        return 0
      }
      const deltaY = e.pageY - this.state.dragStart.y
      const groupDelta = Math.round(deltaY / this.props.lineHeight)

      if (this.props.order + groupDelta < 0) {
        return 0 - this.props.order
      } else {
        return groupDelta
      }
    } else {
      return 0
    }
  }

  resizeTimeDelta (e) {
    const length = _get(this.props.item, 'end') - _get(this.props.item, 'start')
    const timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.coordinateToTimeRatio())

    if (length + timeDelta < (this.props.dragSnap || 1000)) {
      return (this.props.dragSnap || 1000) - length
    } else {
      return timeDelta
    }
  }

  componentDidMount () {
    interact(this.refs.item)
      .resizable({
        edges: {left: false, right: true, top: false, bottom: false},
        enabled: this.props.selected && this.canResize()
      })
      .draggable({
        enabled: this.props.selected
      })
      .on('dragstart', (e) => {
        if (this.props.selected) {
          this.setState({
            dragging: true,
            dragStart: {x: e.pageX, y: e.pageY},
            preDragPosition: {x: e.target.offsetLeft, y: e.target.offsetTop},
            dragTime: _get(this.props.item, 'start').getTime(),
            dragGroupDelta: 0
          })
        } else {
          return false
        }
      })
      .on('dragmove', (e) => {
        if (this.state.dragging) {
          const dragTime = this.dragTime(e)
          const dragGroupDelta = this.dragGroupDelta(e)

          if (this.props.onDrag) {
            this.props.onDrag(_get(this.props.item, 'id'), dragTime, this.props.order + dragGroupDelta)
          }

          this.setState({
            dragTime: dragTime,
            dragGroupDelta: dragGroupDelta
          })
        }
      })
      .on('dragend', (e) => {
        if (this.state.dragging) {
          if (this.props.onDrop) {
            this.props.onDrop(_get(this.props.item, 'id'), this.dragTime(e), this.props.order + this.dragGroupDelta(e))
          }

          this.setState({
            dragging: false,
            dragStart: null,
            preDragPosition: null,
            dragTime: null,
            dragGroupDelta: null
          })
        }
      })
      .on('resizestart', (e) => {
        if (this.props.selected) {
          this.setState({
            resizing: true,
            resizeStart: e.pageX,
            resizeTimeDelta: 0
          })
        } else {
          return false
        }
      })
      .on('resizemove', (e) => {
        if (this.state.resizing) {
          const item = this.props.item
          if (this.props.onResizing) {
            this.props.onResizing(_get(item, 'id'), _get(item, 'end') - _get(item, 'start') + this.resizeTimeDelta(e))
          }

          this.setState({
            resizeTimeDelta: this.resizeTimeDelta(e)
          })
        }
      })
      .on('resizeend', (e) => {
        if (this.state.resizing) {
          const item = this.props.item
          if (this.props.onResized && this.resizeTimeDelta(e) !== 0) {
            this.props.onResized(_get(item, 'id'), _get(item, 'end') - _get(item, 'start') + this.resizeTimeDelta(e))
          }
          this.setState({
            resizing: null,
            resizeStart: null,
            resizeTimeDelta: null
          })
        }
      })
  }

  canResize (props = this.props) {
    if (!this.props.canResize) {
      return false
    }
    let width = parseInt(this.dimensions(props).width, 10)
    return width >= props.minResizeWidth
  }

  canMove (props = this.props) {
    return !!this.props.canMove
  }

  componentWillReceiveProps (nextProps) {
    const couldDrag = this.props.selected && this.canMove(this.props)
    const couldResize = this.props.selected && this.canResize(this.props)
    const willBeAbleToDrag = nextProps.selected && this.canMove(nextProps)
    const willBeAbleToResize = nextProps.selected && this.canResize(nextProps)

    if (couldResize !== willBeAbleToResize) {
      interact(this.refs.item)
        .resizable({enabled: willBeAbleToResize})
    }
    if (couldDrag !== willBeAbleToDrag) {
      interact(this.refs.item)
        .draggable({enabled: willBeAbleToDrag})
    }
  }

  onClick (e) {
    if (this.props.onSelect) {
      this.props.onSelect(_get(this.props.item, 'id'))
    }
  }

  onTouchStart (e) {
    this.startedTouching = true
  }

  onTouchEnd (e) {
    if (this.startedTouching) {
      this.startedTouching = false
      this.onClick(e)
    }
  }

  dimensions (props = this.props) {
    const item = props.item
    const x = this.state.dragging ? this.state.dragTime : _get(item, 'start').getTime()
    const w = Math.max(_get(item, 'end').getTime() - _get(item, 'start').getTime() + (this.state.resizing ? this.state.resizeTimeDelta : 0), props.dragSnap)
    const y = (props.order + (this.state.dragging ? this.state.dragGroupDelta : 0) + 0.15 + 2) * props.lineHeight // +2 for header
    const h = props.lineHeight * 0.65
    const ratio = 1 / this.coordinateToTimeRatio(props)

    return {
      left: `${(x - props.canvasTimeStart) * ratio}px`,
      top: `${y}px`,
      width: `${Math.max(w * ratio, 3)}px`,
      height: `${h}px`
    }
  }

  render () {
    const item = this.props.item
    const dimensions = this.dimensions()

    return (
      <div key={_get(item, 'id')}
           ref='item'
           title={_get(item, 'title')}
           onClick={this.onClick.bind(this)}
           onTouchStart={this.onTouchStart.bind(this)}
           onTouchEnd={this.onTouchEnd.bind(this)}
           className='timeline-item'
           style={{
             overflow: 'hidden',
             cursor: this.props.selected && this.canMove(this.props) ? 'move' : 'pointer',
             position: 'absolute',
             boxSizing: 'border-box',
             left: dimensions.left,
             top: dimensions.top,
             width: dimensions.width,
             height: dimensions.height,
             lineHeight: dimensions.height,
             background: this.props.selected ? '#FFC107' : '#2196F3',
             border: this.props.selected ? '1px solid #FF9800' : '1px solid #1A6FB3',
             borderRightWidth: this.props.selected && this.canResize(this.props) ? '3px' : '1px',
             fontSize: '12px',
             color: 'white',
             textAlign: 'center'}}>
        {_get(item, 'title')}
      </div>
    )
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  canvasTimeStart: React.PropTypes.number.isRequired,
  canvasTimeEnd: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  order: React.PropTypes.number.isRequired,

  dragSnap: React.PropTypes.number,
  minResizeWidth: React.PropTypes.number,
  selected: React.PropTypes.bool,

  canChangeGroup: React.PropTypes.bool.isRequired,
  canMove: React.PropTypes.bool.isRequired,
  canResize: React.PropTypes.bool.isRequired,

  onSelect: React.PropTypes.func,
  onDrag: React.PropTypes.func,
  onDrop: React.PropTypes.func,
  onResizing: React.PropTypes.func,
  onResized: React.PropTypes.func
}
Item.defaultProps = {
  selected: false
}
