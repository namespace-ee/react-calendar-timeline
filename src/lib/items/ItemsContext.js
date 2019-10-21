import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const defaultContextState = {
  items: undefined,
  dragSnap: undefined,
  minResizeWidth: undefined,
  selectedItem: undefined,
  canChangeGroup: undefined,
  canMove: undefined,
  canResize: undefined,
  canSelect: undefined,
  moveResizeValidator: undefined,
  itemSelect: undefined,
  itemDrag: undefined,
  itemDrop: undefined,
  itemResizing: undefined,
  itemResized: undefined,
  onItemDoubleClick: undefined,
  onItemContextMenu: undefined,
  itemRenderer: undefined,
  selected: undefined,
  groupDimensions: undefined,
  useResizeHandle: undefined,
  scrollRef: undefined,
  order: undefined,
  onDragStart: undefined,
  onDragEnd: undefined,
  onResizeStart: undefined,
  resizeEdge: undefined,
  dragging: undefined,
  resizing: undefined,
  dragOffset: undefined,
  interactingItemId: undefined,
}

const ItemsContext = React.createContext(defaultContextState)

const { Consumer, Provider } = ItemsContext

export class ItemsContextProvider extends PureComponent {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    dragSnap: PropTypes.number,
    minResizeWidth: PropTypes.number,
    selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    canChangeGroup: PropTypes.bool.isRequired,
    canMove: PropTypes.bool.isRequired,
    canResize: PropTypes.oneOf([true, false, 'left', 'right', 'both']),
    canSelect: PropTypes.bool,
    moveResizeValidator: PropTypes.func,
    itemSelect: PropTypes.func,
    itemDrag: PropTypes.func,
    itemDrop: PropTypes.func,
    itemResizing: PropTypes.func,
    itemResized: PropTypes.func,
    onItemDoubleClick: PropTypes.func,
    onItemContextMenu: PropTypes.func,
    itemRenderer: PropTypes.func,
    selected: PropTypes.array,
    groupDimensions: PropTypes.object,
    useResizeHandle: PropTypes.bool,
    scrollRef: PropTypes.object,
    order: PropTypes.object,
    onDragStart: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    onResizeStart: PropTypes.func.isRequired,
    dragging: PropTypes.bool.isRequired,
    dragOffset: PropTypes.number.isRequired,
    interactingItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resizeEdge: PropTypes.oneOf(['right', 'left']),
  }
  render(){
    const {children,...rest} = this.props
    return <Provider value={rest}>{children}</Provider>
  }
}

export const ItemsConsumer = Consumer
export default ItemsContext
