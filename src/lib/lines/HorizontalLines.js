import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class HorizontalLines extends Component {
  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.groupHeights === this.props.groupHeights
    )
  }

  render() {
    const { canvasWidth, lineCount, groupHeights } = this.props
    let lines = []

    var totalHeight = 0
    for (let i = 0; i < lineCount; i++) {
      lines.push(
        <div
          key={`horizontal-line-${i}`}
          className={i % 2 === 0 ? 'rct-hl-even' : 'rct-hl-odd'}
          style={{
            transform: `translate3d(0px, ${totalHeight}px, 0)`,
            width: `${canvasWidth}px`,
            height: `${groupHeights[i] - 1}px`
          }}
        />
      )
      totalHeight += groupHeights[i]
    }

    return <div className="rct-horizontal-lines">{lines}</div>
  }
}
