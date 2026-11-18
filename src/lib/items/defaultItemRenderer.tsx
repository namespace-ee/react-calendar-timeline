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
  const showLeft = useResizeHandle || (selected && canResizeLeft);
  const showRight = useResizeHandle || (selected && canResizeRight);

  return (
    <div {...rest} ref={ref} key={`${key}-outer`}>
      <div
        className="rct-item-content"
        style={{ maxHeight: `${itemContext.dimensions.height}` }}
        key={`${key}-content`}
      >
        {itemContext.title}
      </div>

      {showLeft ? <div {...leftResizeProps} key={`${key}-lr`} /> : null}
      {showRight ? <div {...rightResizeProps} key={`${key}-rr`} /> : null}
    </div>
  );
}
