import React from 'react'

import { Draggable } from 'react-beautiful-dnd'
// rafc

const getStyle = (style,snapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `0.001s`,
    };
};

const getInfo = (style) => {
	console.log(style)
}

const DragItem = ({ task, index, onClick, setItemPosition }) => {
	const { isCompleted, isBlocked, isBlocking, inReview } = task

	return <Draggable
		key={task.id}
		draggableId={task.id}
		index={index}
	>
		{(provided, snapshot) => {
			  if(snapshot.isDragging && !snapshot.isDropAnimating) setItemPosition(provided.draggableProps.style)
				return <div
					onClick={() => onClick(task)}
					className={`task${snapshot.isDragging ? ' is-dragging' : ''}`}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={getStyle(provided.draggableProps.style, snapshot)}
				>
					<span className="theme-primary">{task.title}</span>

				</div>
		}}
	</Draggable>
}

export default DragItem
