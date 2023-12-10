import { Id } from './main'

export type Dimension = {
  collisionLeft: number
  collisionWidth: number
  height: number
  isDragging: boolean
  left: number
  order: {
    group: {
      id: string
    }
    index: number
  }
  originalLeft: number
  stack: boolean
  top: number | null
  width: number
}

export type ItemDimension = { id: Id; dimensions: Dimension }
