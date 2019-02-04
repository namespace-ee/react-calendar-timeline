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
	const placeholder = item.id === 'placeholder'
	const backgroundColor = placeholder ? '#fff' : item.bgColor
	const borderColor = placeholder ? '#D5DDE6' : 'transparent'
	const props = getItemProps()
	const { top, left, width, zIndex, position, lineHeight, height, fontSize, cursor } = props.style
	const { ref, onContextMenu, onDoubleClick, onMouseDown, onMouseUp, onTouchEnd, onTouchStart, key } = props
	
	const style = { top, left, width, zIndex, position, height, fontSize, cursor,
		backgroundColor,
		color: placeholder ? '#D5DDE6' : item.color,
		borderColor,
		borderStyle: placeholder ? 'dashed' : 'solid',
		borderWidth: 2,
		borderRadius: 24 }
	
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
			style={style}
			// onMouseOver={() => hoverSelect(item.id)}
			// onMouseOut={() => hoverDeselect(item.id)}
		>
			{itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

			<div
				style={{
					paddingLeft: '8px',
					overflow: 'hidden',
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
