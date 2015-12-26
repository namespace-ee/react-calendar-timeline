import React, { Component } from 'react'

export default class HorizontalLines extends Component {
  constructor (props) {
    super(props)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.lineHeight === this.props.lineHeight &&
             nextProps.lineCount === this.props.lineCount &&
             nextProps.borderWidth === this.props.borderWidth &&
             nextProps.borderColor === this.props.borderColor)
  }

  render () {
    const { borderColor, lineCount, lineHeight, canvasWidth, borderWidth } = this.props

    let lines = []

    for (let i = 0; i < lineCount; i++) {
      const background = typeof this.props.backgroundColor === 'function'
                ? this.props.backgroundColor(i)
                : (this.props.backgroundColor || null)

      lines.push(
        <div key={`horizontal-line-${i}`}
             style={{
               position: 'absolute',
               top: `${(i + 2) * lineHeight}px`,
               left: `0px`,
               width: `${canvasWidth}px`,
               height: `${lineHeight - 1}px`,
               borderBottom: `${borderWidth}px solid ${borderColor}`,
               boxSizing: 'content-box',
               background: background
             }} />)
    }

    return (
      <div>
        {lines}
      </div>
    )
  }
}

HorizontalLines.propTypes = {
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  lineCount: React.PropTypes.number.isRequired,
  backgroundColor: React.PropTypes.func,
  borderWidth: React.PropTypes.number,
  borderColor: React.PropTypes.string
}
HorizontalLines.defaultProps = {
  borderWidth: 1,
  dayBackground: null,
  borderColor: '#aaa'
}
