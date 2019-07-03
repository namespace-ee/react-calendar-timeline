import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class InfoLabel extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired
  }

  static defaultProps = {
    label: ''
  }

  shouldComponentUpdate(nextProps) {
    const { label: nextLabel } = nextProps

    return nextLabel !== this.props.label
  }

  render() {
    return <div className="rct-infolabel">{this.props.label}</div>
  }
}
