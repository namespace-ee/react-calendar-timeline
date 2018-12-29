import React from 'react'
// import store from './TimelineStore'

const TimelineItem = ({
	item,
	timelineContext,
	itemContext,
	getItemProps,
	getResizeProps,
}) => {
	const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
	const backgroundColor = item.bgColor
	const borderColor = 'transparent'
	const props = getItemProps()
	const { top, left, width, zIndex, position, lineHeight, height, fontSize, cursor } = props.style
	const { ref, onContextMenu, onDoubleClick, onMouseDown, onMouseUp, onTouchEnd, onTouchStart, key } = props
	return (
		<div
			className="rct-item"
			ref={ref}
			onContextMenu={onContextMenu}
			onDoubleClick={onDoubleClick}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onTouchEnd={onTouchEnd}
			onTouchStart={onTouchStart}
			key={key}
			style={{ top, left, width, zIndex, position, height, fontSize, cursor,
				backgroundColor,
				color: item.color,
				borderColor,
				borderStyle: 'solid',
				borderWidth: 6,
				borderRadius: 24 }}
			// onMouseOver={() => hoverSelect(item.id)}
			// onMouseOut={() => hoverDeselect(item.id)}
		>
			{itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

			<div
				style={{
					paddingLeft: '8px',
					overflow: 'hidden',
					paddingLeft: 3,
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}
			>
				{itemContext.title}
			</div>

			{itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
		</div>
	)
}

export default TimelineItem
