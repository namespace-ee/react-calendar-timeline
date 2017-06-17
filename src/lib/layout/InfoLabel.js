import PropTypes from 'prop-types'
import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

export default class InfoLabel extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired
  }

  static defaultProps = {
    label: ''
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render () {
    return (
      <div className='rct-infolabel'>
        {this.props.label}
      </div>
    )
  }
}
