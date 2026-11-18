import { ItemRendererProps } from "./Item";
import { TimelineItemBase } from "../types/main";

export function defaultItemRenderer<CustomItem extends TimelineItemBase<number>>({
  item,
  itemContext,
  getItemProps,
  getResizeProps,
}: ItemRendererProps<CustomItem>) {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
  const { key, ref, ...rest } = getItemProps(item.itemProps ?? {});
  const { useResizeHandle, selected, canResizeLeft, canResizeRight } = itemContext;

  return (
    <div {...rest} ref={ref} key={`${key}-outer`}>
      <div
        className="rct-item-content"
        style={{ maxHeight: `${itemContext.dimensions.height}` }}
        key={`${key}-content`}
      >
        {itemContext.title}
      </div>

      {useResizeHandle || (selected && canResizeLeft) ? <div {...leftResizeProps} key={`${key}-lr`} /> : null}
      {useResizeHandle || (selected && canResizeRight) ? <div {...rightResizeProps} key={`${key}-rr`} /> : null}
    </div>
  );
}
