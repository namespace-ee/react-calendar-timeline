import React from 'react'
import PropTypes from 'prop-types'

export const defaultGroupRowRenderer = ({
    onContextMenu,
    onDoubleClick,
    className,
    style
}) => {
    return (
        <div
            onContextMenu={onContextMenu}
            onDoubleClick={onDoubleClick}
            className={className}
            style={style}
        />
    )
}

defaultGroupRowRenderer.propTypes = {
    onContextMenu: PropTypes.func,
    onDoubleClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    group: PropTypes.array,
    timelineContext: PropTypes.object,
    getLeftOffsetFromDate: PropTypes.func
}
