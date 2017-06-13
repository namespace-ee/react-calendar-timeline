import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

export default class InfoLabel extends Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired
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
