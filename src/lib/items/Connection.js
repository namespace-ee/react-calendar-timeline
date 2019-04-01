import React from 'react'

function arrow(endPoint){
    const [x, y] = endPoint
    const size = 4
    const top = [x - size, y - size]
    const bottom = [x - size, y + size]
    return `
    ${[x - 2,y]}
    M ${top}
    L ${endPoint}
    ${bottom}`
}

const Connection = ({startPoint, controlPoint, controlPoint2, endPoint, selected,warning, onClick, onMouseOver}) => <path onClick={onClick} onMouseOver={onMouseOver}
    d={`
      M ${startPoint}
      C ${controlPoint}
      ${controlPoint2}
      ${arrow(endPoint)}
    `}
    fill="none"
    stroke={warning ? `#FF534D` : selected ? '#00a0fc' : '#d5dbe6'}
    strokeWidth={2}
/>


export default Connection
