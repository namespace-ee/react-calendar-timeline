import { HTMLAttributes } from 'react'
import { GetItemPropsParams, GetResizeProps, ItemProps } from './Item'
import { ItemContext, TimelineItemBase } from '../types/main'

type Props<CustomItem extends TimelineItemBase<number>> = {
  item: ItemProps<CustomItem>
  itemContext: ItemContext
  getItemProps: (p?: GetItemPropsParams) => HTMLAttributes<HTMLDivElement>
  getResizeProps: GetResizeProps
}

export function defaultItemRenderer<CustomItem extends TimelineItemBase<number>>({ item, itemContext, getItemProps, getResizeProps }: Props<CustomItem>) {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
  return (
    <div {...getItemProps(item.itemProps)}>
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

      <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
        {itemContext.title}
      </div>

      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
    </div>
  )
}
