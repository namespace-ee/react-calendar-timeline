import { HTMLAttributes } from 'react'
import { GetItemPropsParams, GetResizeProps, ItemProps } from './Item'
import { ItemContext } from '../types/main'

type Props = {
  item: ItemProps
  itemContext: ItemContext
  getItemProps: (p?: GetItemPropsParams) => HTMLAttributes<HTMLDivElement>
  getResizeProps: GetResizeProps
}

export const defaultItemRenderer = ({
  item,
  itemContext,
  getItemProps,
  getResizeProps,
}: Props) => {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
  return (
    <div {...getItemProps(item.itemProps)}>
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

      <div
        className="rct-item-content"
        style={{ maxHeight: `${itemContext.dimensions.height}` }}
      >
        {itemContext.title}
      </div>

      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
    </div>
  )
}
