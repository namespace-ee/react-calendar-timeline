import React from 'react'
import PropTypes from 'prop-types'

export default function CustomInfoLabel(props) {
  const { time, groupTitle, heading } = props

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '100px',
        left: '100px',
        backgroundColor: '#E3F1DF',
        color: '#212B36',
        padding: '6px 12px',
        fontSize: '16px',
        borderRadius: '8px',
        boxShadow:
          '0 1px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
          borderBottom: '1px solid #ccc',
          paddingBottom: '3px',
          marginBottom: '3px'
        }}
      >
        <span>
          {heading} {groupTitle}
        </span>
      </div>
      {time}
    </div>
  )
}

CustomInfoLabel.propTypes = {
  time: PropTypes.string,
  groupTitle: PropTypes.string,
  heading: PropTypes.string
}
