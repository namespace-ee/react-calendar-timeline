import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import moment from 'moment';
import interact from 'interact.js';

export default class Item extends Component {
  constructor(props) {
    super(props);

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

  shouldComponentUpdate = shouldPureComponentUpdate;

  coordinateToTimeRatio(props = this.props) {
    return (props.maxX - props.originX) / props.canvasWidth;
  }

  dragTimeSnap(dragTime) {
    if (this.props.dragSnap) {
      return Math.round(dragTime / this.props.dragSnap) * this.props.dragSnap;
    } else {
      return dragTime;
    }
  }

  dragTime(e) {
    let item = this.props.item;

    if (this.state.dragging) {
      let deltaX = e.pageX - this.state.dragStart.x,
          timeDelta = deltaX * this.coordinateToTimeRatio();

      return this.dragTimeSnap(item.start.getTime() + timeDelta);
    } else {
      return item.start.getTime();
    }
  }

  dragGroupDelta(e) {
    if (this.state.dragging) {
      let deltaY = e.pageY - this.state.dragStart.y,
          groupDelta = Math.round(deltaY / this.props.lineHeight);

      if (this.props.order + groupDelta < 0) {
        return - this.props.order;
      } else {
        return groupDelta;
      }
    } else {
      return 0;
    }
  }

  resizeTimeDelta(e) {
    let length = this.props.item.end - this.props.item.start,
        timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.coordinateToTimeRatio());

    if (length + timeDelta < (this.props.dragSnap || 1000)) {
      return (this.props.dragSnap || 1000) - length;
    } else {
      return timeDelta
    }
  }

  componentDidMount() {
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
            dragTime: this.props.item.start.getTime(),
            dragGroupDelta: 0
          });
        } else {
          return false;
        }
      })
      .on('dragmove', (e) => {
        if (this.state.dragging) {
          let dragTime = this.dragTime(e),
              dragGroupDelta = this.dragGroupDelta(e);

          if (this.props.onDrag) {
            this.props.onDrag(this.props.item.id, dragTime, this.props.order + dragGroupDelta);
          }

          this.setState({
            dragTime: dragTime,
            dragGroupDelta: dragGroupDelta
          });
        }
      })
      .on('dragend', (e) => {
        if (this.state.dragging) {
          if (this.props.onDrop) {
            this.props.onDrop(this.props.item.id, this.dragTime(e), this.props.order + this.dragGroupDelta(e));
          }

          this.setState({
            dragging: false,
            dragStart: null,
            preDragPosition: null,
            dragTime: null,
            dragGroupDelta: null
          });
        }
      })
      .on('resizestart', (e) => {
        if (this.props.selected) {
          this.setState({
            resizing: true,
            resizeStart: e.pageX,
            resizeTimeDelta: 0
          });
        } else {
          return false;
        }
      })
      .on('resizemove', (e) => {
        if (this.state.resizing) {
          if (this.props.onResizing) {
            this.props.onResizing(this.props.item.id, this.props.item.end - this.props.item.start + this.resizeTimeDelta(e));
          }

          this.setState({
            resizeTimeDelta: this.resizeTimeDelta(e)
          })
        }
      })
      .on('resizeend', (e) => {
        if (this.state.resizing) {
          if (this.props.onResized && this.resizeTimeDelta(e) !== 0) {
            this.props.onResized(this.props.item.id, this.props.item.end - this.props.item.start + this.resizeTimeDelta(e));
          }
          this.setState({
            resizing: null,
            resizeStart: null,
            resizeTimeDelta: null
          });
        }
      });
  }

  canResize(props = this.props) {
    if (!this.props.canResize) {
      return false;
    }
    let width = parseInt(this.dimensions(props).width);
    return width >= props.minResizeWidth;
  }

  canMove(props = this.props) {
    return !!this.props.canMove;
  }

  componentWillReceiveProps(nextProps) {
    let couldDrag = this.props.selected && this.canMove(this.props),
        couldResize = this.props.selected && this.canResize(this.props),
        willBeAbleToDrag = nextProps.selected && this.canMove(nextProps),
        willBeAbleToResize = nextProps.selected && this.canResize(nextProps);

    if (couldResize !== willBeAbleToResize) {
      interact(this.refs.item)
        .resizable({enabled: willBeAbleToResize})
    }
    if (couldDrag !== willBeAbleToDrag) {
      interact(this.refs.item)
        .draggable({enabled: willBeAbleToDrag})
    }
  }

  onClick(e) {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.item.id);
    }
  }

  onTouchStart(e) {
    this.startedTouching = true;
  }

  onTouchEnd(e) {
    if (this.startedTouching) {
      this.onClick(e);
    }
  }

  dimensions(props = this.props) {
    let item = props.item,
        x = this.state.dragging ? this.state.dragTime : item.start.getTime(),
        w = Math.max(item.end.getTime() - item.start.getTime() + (this.state.resizing ? this.state.resizeTimeDelta : 0), props.dragSnap),
        y = (props.order + (this.state.dragging ? this.state.dragGroupDelta : 0) + 0.15 + 2) * props.lineHeight, // +2 for header
        h = props.lineHeight * 0.65,
        ratio = 1 / this.coordinateToTimeRatio(props);

    return {
      left: `${(x - props.originX) * ratio}px`,
      top: `${y}px`,
      width: `${Math.max(w * ratio, 3)}px`,
      height: `${h}px`
    }
  }

  render() {
    let item = this.props.item,
        dimensions = this.dimensions();

    return (
      <div key={item.id}
           ref='item'
           title={item.title}
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
        {item.title}
      </div>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  originX: React.PropTypes.number.isRequired,
  maxX: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  order: React.PropTypes.number.isRequired,

  dragSnap: React.PropTypes.number,
  minResizeWidth: React.PropTypes.number,
  selected: React.PropTypes.bool,

  canMove: React.PropTypes.bool.isRequired,
  canResize: React.PropTypes.bool.isRequired,

  onSelect: React.PropTypes.func,
  onDrag: React.PropTypes.func,
  onDrop: React.PropTypes.func,
  onResizing: React.PropTypes.func,
  onResized: React.PropTypes.func
};
Item.defaultProps = {
  selected: false
};
