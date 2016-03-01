import React, { Component } from 'react'
import interact from 'interact.js'

import { _get } from '../utils'

export default class Item extends Component {
  constructor (props) {
    super(props)

    this.cacheDataFromProps(props)

    this.state = {
      interactMounted: false,

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

  shouldComponentUpdate (nextProps, nextState) {
    var shouldUpdate = !(nextState.dragging !== this.state.dragging &&
             nextState.dragTime !== this.state.dragTime &&
             nextState.dragGroupDelta !== this.state.dragGroupDelta &&
             nextState.resizing !== this.state.resizing &&
             nextState.resizeTime !== this.state.resizeTime &&
             nextProps.keys === this.props.keys &&
             nextProps.selected === this.props.selected &&
             nextProps.item === this.props.item &&
             nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.lineHeight === this.props.lineHeight &&
             nextProps.order === this.props.order &&
             nextProps.dragSnap === this.props.dragSnap &&
             nextProps.minResizeWidth === this.props.minResizeWidth &&
             nextProps.selected === this.props.selected &&
             nextProps.canChangeGroup === this.props.canChangeGroup &&
             nextProps.topOffset === this.props.topOffset &&
             nextProps.canMove === this.props.canMove &&
             nextProps.canResize === this.props.canResize &&
             nextProps.dimensions === this.props.dimensions)
    return shouldUpdate
  }

  cacheDataFromProps (props) {
    this.itemId = _get(props.item, props.keys.itemIdKey)
    this.itemTitle = _get(props.item, props.keys.itemTitleKey)
    this.itemTimeStart = _get(props.item, props.keys.itemTimeStartKey)
    this.itemTimeEnd = _get(props.item, props.keys.itemTimeEndKey)
  }

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
    const startTime = this.itemTimeStart

    if (this.state.dragging) {
      const deltaX = e.pageX - this.state.dragStart.x
      const timeDelta = deltaX * this.coordinateToTimeRatio()

      return this.dragTimeSnap(startTime + timeDelta)
    } else {
      return startTime
    }
  }

  dragGroupDelta (e) {
    const {groupTops, order, topOffset} = this.props
    if (this.state.dragging) {
      if (!this.props.canChangeGroup) {
        return 0
      }
      let groupDelta = 0

      for (var key of Object.keys(groupTops)) {
        var item = groupTops[key]
        if (e.pageY - topOffset > item) {
          groupDelta = parseInt(key, 10) - order
        } else {
          break
        }
      }

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
    const length = this.itemTimeEnd - this.itemTimeStart
    const timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.coordinateToTimeRatio())

    if (length + timeDelta < (this.props.dragSnap || 1000)) {
      return (this.props.dragSnap || 1000) - length
    } else {
      return timeDelta
    }
  }

  componentDidMount () {
  }

  mountInteract () {
    const rightResize = this.props.useResizeHandle ? this.refs.dragRight : true
    interact(this.refs.item)
      .resizable({
        edges: {left: false, right: rightResize, top: false, bottom: false},
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
            dragTime: this.itemTimeStart,
            dragGroupDelta: 0
          })
        } else {
          return false
        }
      })
      .on('dragmove', (e) => {
        if (this.state.dragging) {
          let dragTime = this.dragTime(e)
          let dragGroupDelta = this.dragGroupDelta(e)

          if (this.props.moveResizeValidator) {
            dragTime = this.props.moveResizeValidator('move', this.props.item, dragTime)
          }

          if (this.props.onDrag) {
            this.props.onDrag(this.itemId, dragTime, this.props.order + dragGroupDelta)
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
            let dragTime = this.dragTime(e)

            if (this.props.moveResizeValidator) {
              dragTime = this.props.moveResizeValidator('move', this.props.item, dragTime)
            }

            this.props.onDrop(this.itemId, dragTime, this.props.order + this.dragGroupDelta(e))
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
            newResizeEnd: 0
          })
        } else {
          return false
        }
      })
      .on('resizemove', (e) => {
        if (this.state.resizing) {
          let newResizeEnd = this.dragTimeSnap(this.itemTimeEnd + this.resizeTimeDelta(e))

          if (this.props.moveResizeValidator) {
            newResizeEnd = this.props.moveResizeValidator('resize', this.props.item, newResizeEnd)
          }

          if (this.props.onResizing) {
            this.props.onResizing(this.itemId, newResizeEnd)
          }

          this.setState({
            newResizeEnd: newResizeEnd
          })
        }
      })
      .on('resizeend', (e) => {
        if (this.state.resizing) {
          let newResizeEnd = this.dragTimeSnap(this.itemTimeEnd + this.resizeTimeDelta(e))

          if (this.props.moveResizeValidator) {
            newResizeEnd = this.props.moveResizeValidator('resize', this.props.item, newResizeEnd)
          }

          if (this.props.onResized && this.resizeTimeDelta(e) !== 0) {
            this.props.onResized(this.itemId, newResizeEnd)
          }
          this.setState({
            resizing: null,
            resizeStart: null,
            newResizeEnd: null
          })
        }
      })
      .on('tap', (e) => {
        this.actualClick(e, e.pointerType === 'mouse' ? 'click' : 'touch')
      })

    this.setState({
      interactMounted: true
    })
  }

  canResize (props = this.props) {
    if (!props.canResize) {
      return false
    }
    let width = parseInt(this.props.dimensions.width, 10)
    return width >= props.minResizeWidth
  }

  canMove (props = this.props) {
    return !!props.canMove
  }

  componentWillReceiveProps (nextProps) {
    this.cacheDataFromProps(nextProps)

    let { interactMounted } = this.state
    const couldDrag = this.props.selected && this.canMove(this.props)
    const couldResize = this.props.selected && this.canResize(this.props)
    const willBeAbleToDrag = nextProps.selected && this.canMove(nextProps)
    const willBeAbleToResize = nextProps.selected && this.canResize(nextProps)

    if (nextProps.selected && !interactMounted) {
      this.mountInteract()
      interactMounted = true
    }

    if (interactMounted && couldResize !== willBeAbleToResize) {
      interact(this.refs.item)
        .resizable({enabled: willBeAbleToResize})
    }
    if (interactMounted && couldDrag !== willBeAbleToDrag) {
      interact(this.refs.item)
        .draggable({enabled: willBeAbleToDrag})
    }
  }

  onMouseDown = (e) => {
    if (!this.state.interactMounted) {
      e.preventDefault()
      this.startedClicking = true
    }
  };

  onMouseUp = (e) => {
    if (!this.state.interactMounted && this.startedClicking) {
      this.startedClicking = false
      this.actualClick(e, 'click')
    }
  };

  onTouchStart = (e) => {
    if (!this.state.interactMounted) {
      e.preventDefault()
      this.startedTouching = true
    }
  };

  onTouchEnd = (e) => {
    if (!this.state.interactMounted && this.startedTouching) {
      this.startedTouching = false
      this.actualClick(e, 'touch')
    }
  };

  actualClick (e, clickType) {
    if (this.props.onSelect) {
      this.props.onSelect(this.itemId, clickType)
    }
  }

  render () {
    const dimensions = this.props.dimensions
    if (typeof this.props.order === 'undefined' || this.props.order === null) {
      return null
    }

    const classNames = 'rct-item' +
                       (this.props.selected ? ' selected' : '') +
                       (this.canMove(this.props) ? ' can-move' : '') +
                       (this.canResize(this.props) ? ' can-resize' : '') +
                       (this.props.item.className ? ` ${this.props.item.className}` : '')

    const style = {
      left: `${dimensions.left}px`,
      top: `${dimensions.top}px`,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      lineHeight: `${dimensions.height}px`
    }

    return (
      <div key={this.itemId}
           ref='item'
           className={classNames}
           title={this.itemTitle}
           onMouseDown={this.onMouseDown}
           onMouseUp={this.onMouseUp}
           onTouchStart={this.onTouchStart}
           onTouchEnd={this.onTouchEnd}
           style={style}>
        <div className='rct-item-overflow'>
          <div className='rct-item-content'>
            {this.itemTitle}
          </div>
        </div>
        { this.props.useResizeHandle ? <div ref='dragRight' className='rct-drag-right'></div> : '' }
      </div>
    )
  }
}

// removed prop type check for SPEED!
// they are coming from a trusted component anyway
Item.propTypes = {
  // canvasTimeStart: React.PropTypes.number.isRequired,
  // canvasTimeEnd: React.PropTypes.number.isRequired,
  // canvasWidth: React.PropTypes.number.isRequired,
  // lineHeight: React.PropTypes.number.isRequired,
  // order: React.PropTypes.number.isRequired,
  //
  // dragSnap: React.PropTypes.number,
  // minResizeWidth: React.PropTypes.number,
  // selected: React.PropTypes.bool,
  //
  // canChangeGroup: React.PropTypes.bool.isRequired,
  // canMove: React.PropTypes.bool.isRequired,
  // canResize: React.PropTypes.bool.isRequired,
  //
  // keys: React.PropTypes.object.isRequired,
  // item: React.PropTypes.object.isRequired,
  //
  // onSelect: React.PropTypes.func,
  // onDrag: React.PropTypes.func,
  // onDrop: React.PropTypes.func,
  // onResizing: React.PropTypes.func,
  // onResized: React.PropTypes.func
}
Item.defaultProps = {
  selected: false
}
