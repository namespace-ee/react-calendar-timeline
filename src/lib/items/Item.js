import React, { Component } from 'react'
import interact from 'interact.js'
import moment from 'moment'

import { _get, deepObjectCompare } from '../utils'

export default class Item extends Component {
  // removed prop type check for SPEED!
  // they are coming from a trusted component anyway
  // (this complicates performance debugging otherwise)
  static propTypes = {
    // canvasTimeStart: React.PropTypes.number.isRequired,
    // canvasTimeEnd: React.PropTypes.number.isRequired,
    // canvasWidth: React.PropTypes.number.isRequired,
    // order: React.PropTypes.number.isRequired,
    //
    // dragSnap: React.PropTypes.number,
    // minResizeWidth: React.PropTypes.number,
    // selected: React.PropTypes.bool,
    //
    // canChangeGroup: React.PropTypes.bool.isRequired,
    // canMove: React.PropTypes.bool.isRequired,
    // canResizeLeft: React.PropTypes.bool.isRequired,
    // canResizeRight: React.PropTypes.bool.isRequired,
    //
    // keys: React.PropTypes.object.isRequired,
    // item: React.PropTypes.object.isRequired,
    //
    // onSelect: React.PropTypes.func,
    // onDrag: React.PropTypes.func,
    // onDrop: React.PropTypes.func,
    // onResizing: React.PropTypes.func,
    // onResized: React.PropTypes.func,
    // onContextMenu: React.PropTypes.func,
    // itemRenderer: React.PropTypes.func
  }

  static defaultProps = {
    selected: false
  }

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
      resizeEdge: null,
      resizeStart: null,
      resizeTime: null
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    var shouldUpdate = nextState.dragging !== this.state.dragging ||
                       nextState.dragTime !== this.state.dragTime ||
                       nextState.dragGroupDelta !== this.state.dragGroupDelta ||
                       nextState.resizing !== this.state.resizing ||
                       nextState.resizeTime !== this.state.resizeTime ||
                       nextProps.keys !== this.props.keys ||
                       !deepObjectCompare(nextProps.itemProps, this.props.itemProps) ||
                       nextProps.selected !== this.props.selected ||
                       nextProps.item !== this.props.item ||
                       nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
                       nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
                       nextProps.canvasWidth !== this.props.canvasWidth ||
                       nextProps.order !== this.props.order ||
                       nextProps.dragSnap !== this.props.dragSnap ||
                       nextProps.minResizeWidth !== this.props.minResizeWidth ||
                       nextProps.canChangeGroup !== this.props.canChangeGroup ||
                       nextProps.canSelect !== this.props.canSelect ||
                       nextProps.topOffset !== this.props.topOffset ||
                       nextProps.canMove !== this.props.canMove ||
                       nextProps.canResizeLeft !== this.props.canResizeLeft ||
                       nextProps.canResizeRight !== this.props.canResizeRight ||
                       nextProps.dimensions !== this.props.dimensions
    return shouldUpdate
  }

  cacheDataFromProps (props) {
    this.itemId = _get(props.item, props.keys.itemIdKey)
    this.itemTitle = _get(props.item, props.keys.itemTitleKey)
    this.itemDivTitle = props.keys.itemDivTitleKey ? _get(props.item, props.keys.itemDivTitleKey) : this.itemTitle
    this.itemTimeStart = _get(props.item, props.keys.itemTimeStartKey)
    this.itemTimeEnd = _get(props.item, props.keys.itemTimeEndKey)
  }

  coordinateToTimeRatio (props = this.props) {
    return (props.canvasTimeEnd - props.canvasTimeStart) / props.canvasWidth
  }

  dragTimeSnap (dragTime, considerOffset) {
    const { dragSnap } = this.props
    if (dragSnap) {
      const offset = considerOffset ? moment().utcOffset() * 60 * 1000 : 0
      return Math.round(dragTime / dragSnap) * dragSnap - offset % dragSnap
    } else {
      return dragTime
    }
  }

  resizeTimeSnap (dragTime) {
    const { dragSnap } = this.props
    if (dragSnap) {
      const endTime = this.itemTimeEnd % dragSnap
      return Math.round((dragTime - endTime) / dragSnap) * dragSnap + endTime
    } else {
      return dragTime
    }
  }

  dragTime (e) {
    const startTime = this.itemTimeStart

    if (this.state.dragging) {
      const deltaX = e.pageX - this.state.dragStart.x
      const timeDelta = deltaX * this.coordinateToTimeRatio()

      return this.dragTimeSnap(startTime + timeDelta, true)
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

  resizeTimeDelta (e, resizeEdge) {
    const length = this.itemTimeEnd - this.itemTimeStart
    const timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.coordinateToTimeRatio())

    if (length + (resizeEdge === 'left' ? -timeDelta : timeDelta) < (this.props.dragSnap || 1000)) {
      if (resizeEdge === 'left') {
        return length - (this.props.dragSnap || 1000)
      } else {
        return (this.props.dragSnap || 1000) - length
      }
    } else {
      return timeDelta
    }
  }

  componentDidMount () {
  }

  mountInteract () {
    const leftResize = this.props.useResizeHandle ? this.refs.dragLeft : true
    const rightResize = this.props.useResizeHandle ? this.refs.dragRight : true

    interact(this.refs.item)
      .resizable({
        edges: {
          left: this.canResizeLeft() && leftResize,
          right: this.canResizeRight() && rightResize,
          top: false,
          bottom: false
        },
        enabled: this.props.selected && (this.canResizeLeft() || this.canResizeRight())
      })
      .draggable({
        enabled: this.props.selected
      })
      .styleCursor(false)
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
            resizeEdge: null, // we don't know yet
            resizeStart: e.pageX,
            resizeTime: 0
          })
        } else {
          return false
        }
      })
      .on('resizemove', (e) => {
        if (this.state.resizing) {
          let resizeEdge = this.state.resizeEdge

          if (!resizeEdge) {
            resizeEdge = e.deltaRect.left !== 0 ? 'left' : 'right'
            this.setState({ resizeEdge })
          }
          const time = resizeEdge === 'left' ? this.itemTimeStart : this.itemTimeEnd

          let resizeTime = this.resizeTimeSnap(time + this.resizeTimeDelta(e, resizeEdge))

          if (this.props.moveResizeValidator) {
            resizeTime = this.props.moveResizeValidator('resize', this.props.item, resizeTime, resizeEdge)
          }

          if (this.props.onResizing) {
            this.props.onResizing(this.itemId, resizeTime, resizeEdge)
          }

          this.setState({
            resizeTime
          })
        }
      })
      .on('resizeend', (e) => {
        if (this.state.resizing) {
          const { resizeEdge } = this.state
          const time = resizeEdge === 'left' ? this.itemTimeStart : this.itemTimeEnd
          let resizeTime = this.resizeTimeSnap(time + this.resizeTimeDelta(e, resizeEdge))

          if (this.props.moveResizeValidator) {
            resizeTime = this.props.moveResizeValidator('resize', this.props.item, resizeTime, resizeEdge)
          }

          if (this.props.onResized && this.resizeTimeDelta(e, resizeEdge) !== 0) {
            this.props.onResized(this.itemId, resizeTime, resizeEdge)
          }
          this.setState({
            resizing: null,
            resizeStart: null,
            resizeEdge: null,
            resizeTime: null
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

  canResizeLeft (props = this.props) {
    if (!props.canResizeLeft || props.dimensions.clippedLeft) {
      return false
    }
    let width = parseInt(props.dimensions.width, 10)
    return width >= props.minResizeWidth
  }

  canResizeRight (props = this.props) {
    if (!props.canResizeRight || props.dimensions.clippedRight) {
      return false
    }
    let width = parseInt(props.dimensions.width, 10)
    return width >= props.minResizeWidth
  }

  canMove (props = this.props) {
    return !!props.canMove
  }

  componentWillReceiveProps (nextProps) {
    this.cacheDataFromProps(nextProps)

    let { interactMounted } = this.state
    const couldDrag = this.props.selected && this.canMove(this.props)
    const couldResizeLeft = this.props.selected && this.canResizeLeft(this.props)
    const couldResizeRight = this.props.selected && this.canResizeRight(this.props)
    const willBeAbleToDrag = nextProps.selected && this.canMove(nextProps)
    const willBeAbleToResizeLeft = nextProps.selected && this.canResizeLeft(nextProps)
    const willBeAbleToResizeRight = nextProps.selected && this.canResizeRight(nextProps)

    if (nextProps.selected && !interactMounted) {
      this.mountInteract()
      interactMounted = true
    }

    if (interactMounted && (couldResizeLeft !== willBeAbleToResizeLeft || couldResizeRight !== willBeAbleToResizeRight)) {
      const leftResize = this.props.useResizeHandle ? this.refs.dragLeft : true
      const rightResize = this.props.useResizeHandle ? this.refs.dragRight : true

      interact(this.refs.item)
        .resizable({
          enabled: willBeAbleToResizeLeft || willBeAbleToResizeRight,
          edges: {
            top: false,
            bottom: false,
            left: willBeAbleToResizeLeft && leftResize,
            right: willBeAbleToResizeRight && rightResize
          }
        })
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

  handleDoubleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.props.onItemDoubleClick) {
      this.props.onItemDoubleClick(this.itemId, e)
    }
  };

  handleContextMenu = (e) => {
    if (this.props.onContextMenu) {
      e.preventDefault()
      e.stopPropagation()
      this.props.onContextMenu(this.itemId, e)
    }
  };

  actualClick (e, clickType) {
    if (this.props.canSelect && this.props.onSelect) {
      this.props.onSelect(this.itemId, clickType, e)
    }
  }

  renderContent () {
    const Comp = this.props.itemRenderer
    if (Comp) {
      return <Comp item={this.props.item} />
    } else {
      return this.itemTitle
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
                       (this.canResizeLeft(this.props) || this.canResizeRight(this.props) ? ' can-resize' : '') +
                       (this.canResizeLeft(this.props) ? ' can-resize-left' : '') +
                       (this.canResizeRight(this.props) ? ' can-resize-right' : '') +
                       (this.props.item.className ? ` ${this.props.item.className}` : '') +
                       (dimensions.clippedLeft ? ' clipped-left' : '') +
                       (dimensions.clippedRight ? ' clipped-right' : '')

    const style = {
      left: `${dimensions.left}px`,
      top: `${dimensions.top}px`,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      lineHeight: `${dimensions.height}px`
    }

    return (
      <div {...this.props.item.itemProps}
           key={this.itemId}
           ref='item'
           className={classNames}
           title={this.itemDivTitle}
           onMouseDown={this.onMouseDown}
           onMouseUp={this.onMouseUp}
           onTouchStart={this.onTouchStart}
           onTouchEnd={this.onTouchEnd}
           onDoubleClick={this.handleDoubleClick}
           onContextMenu={this.handleContextMenu}
           style={style}>
        {this.props.useResizeHandle ? <div ref='dragLeft' className='rct-drag-left'></div> : ''}
        <div className='rct-item-overflow'>
          <div className='rct-item-content'>
            {this.renderContent()}
          </div>
        </div>
        {this.props.useResizeHandle ? <div ref='dragRight' className='rct-drag-right'></div> : ''}
      </div>
    )
  }
}
