import { GroupOrder, Id } from './main'

export type Dimension = {
  collisionLeft: number
  collisionWidth: number
  height: number
  isDragging: boolean
  left: number
  order: GroupOrder
  originalLeft: number
  stack: boolean
  top: number | null
  width: number
}

export type ItemDimension = { id: Id; dimensions: Dimension }
