import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

export default class TodayLine extends PureComponent {
  static propTypes = {
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  static defaultProps = {}
  
  state = {
    currentTime: new Date(),
  }

  componentDidMount(){
    this.interval = setInterval(()=> {
      this.setState({
        currentTime: new Date(),
      })
    }, 1000)
  }

  componentWillUnmount(){
    this.interval && clearInterval(this.interval)
  }
  
  // TODO: should currentTime come from a prop? probably...?
  render() {
    let currentTime = this.state.currentTime.getTime()

    if (
      currentTime > this.props.canvasTimeStart &&
      currentTime < this.props.canvasTimeEnd
    ) {
      const ratio =
        this.props.canvasWidth /
        (this.props.canvasTimeEnd - this.props.canvasTimeStart)
      const left = Math.round(
        (currentTime - this.props.canvasTimeStart) * ratio
      )
      const height = this.props.height
      const styles = {
        top: '0px',
        left: `${left}px`,
        height: `${height}px`
      }

      return <div className="rct-today" style={styles} />
    } else {
      return <div />
    }
  }
}
