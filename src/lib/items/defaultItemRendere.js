import React from 'react'

export const defaultItemRenderer = ({
  item,
  timelineContext,
  itemContext,
  getItemProps,
  getResizeProps
}) => {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
  return (
    <div {...getItemProps(item.itemProps)}>
      {itemContext.useResizeHandle && itemContext.showInnerContentsRender ? (
        <div {...leftResizeProps} />
      ) : (
        ''
      )}

      {itemContext.showInnerContentsRender && (
        <div
          className="rct-item-content"
          style={{ maxHeight: `${itemContext.dimensions.height}` }}
        >
          {itemContext.title}
        </div>
      )}

      {itemContext.useResizeHandle && itemContext.showInnerContentsRender ? (
        <div {...rightResizeProps} />
      ) : (
        ''
      )}
    </div>
  )
}
