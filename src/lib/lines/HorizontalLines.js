import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class HorizontalLines extends Component {
  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired
  }

  static defaultProps = {
    borderWidth: 1
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.lineHeight === this.props.lineHeight &&
             nextProps.lineCount === this.props.lineCount &&
             nextProps.groupHeights === this.props.groupHeights)
  }

  render () {
    const { lineCount, canvasWidth, groupHeights, headerHeight } = this.props
    let lines = []

    var totalHeight = headerHeight
    for (let i = 0; i < lineCount; i++) {
      lines.push(
        <div key={`horizontal-line-${i}`}
             className={i % 2 === 0 ? 'rct-hl-even' : 'rct-hl-odd'}
             style={{
               top: `${totalHeight}px`,
               left: '0px',
               width: `${canvasWidth}px`,
               height: `${groupHeights[i] - 1}px`
             }} />)
      totalHeight += groupHeights[i]
    }

    return (
      <div className='rct-horizontal-lines'>
        {lines}
      </div>
    )
  }
}
