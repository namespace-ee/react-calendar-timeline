import React, { Component } from 'react'

import { _get, _length } from '../utils'

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollTop: 0,
      componentTop: 0
    }
  }

  scroll (e) {
    if (this.props.fixedHeader === 'absolute' && window && window.document) {
      const scroll = window.document.body.scrollTop
      this.setState({
        scrollTop: scroll
      })
    }
  }

  setComponentTop () {
    const viewportOffset = this.refs.sidebar.getBoundingClientRect()
    this.setState({
      componentTop: viewportOffset.top
    })
  }

  componentDidMount () {
    this.setComponentTop()
    this.scroll()

    this.scrollEventListener = {
      handleEvent: (event) => {
        this.scroll()
      }
    }

    window.addEventListener('scroll', this.scrollEventListener)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollEventListener)
  }

  componentWillReceiveProps () {
    this.setComponentTop()
  }

  render () {
    const {
      fixedHeader, width, lineHeight, zIndex, groups,
      listItemPadding,
      borderColor, borderWidth,
      sidebarBackgroundColor, sidebarColor
    } = this.props

    const {
      scrollTop
    } = this.state

    const containerStyle = {
      width: `${width}px`,
      height: `${lineHeight * (_length(groups) + 2)}px`,
      boxSizing: 'border-box',
      borderRight: `${borderWidth}px solid ${borderColor}`,
      overflow: 'hidden',
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative'
    }

    const headerStyle = {
      height: `${lineHeight * 2}px`,
      lineHeight: `${lineHeight}px`,
      margin: '0',
      color: sidebarColor,
      background: sidebarBackgroundColor,
      borderRight: `${borderWidth}px solid ${borderColor}`,
      boxSizing: 'border-box',
      borderBottom: `${borderWidth}px solid ${borderColor}`,
      overflow: 'hidden',
      width: `${width}px`
    }

    const groupsStyle = {
      width: `${width}px`
    }

    const elementStyle = {
      height: `${lineHeight - 1}px`,
      lineHeight: `${lineHeight - 1}px`,
      padding: listItemPadding,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      borderBottom: `${borderWidth}px solid ${borderColor}`,
      boxSizing: 'content-box',
      margin: '0'
    }

    if (fixedHeader === 'fixed') {
      headerStyle.position = 'fixed'
      headerStyle.zIndex = zIndex
      groupsStyle.paddingTop = headerStyle.height
    } else if (fixedHeader === 'absolute') {
      let componentTop = this.state.componentTop
      if (scrollTop >= componentTop) {
        headerStyle.position = 'absolute'
        headerStyle.top = `${scrollTop - componentTop}px`
        headerStyle.left = `0`
        groupsStyle.paddingTop = headerStyle.height
      }
    }

    const header = <div ref='sidebarHeader' style={headerStyle}>
                     {this.props.children}
                   </div>

    let groupLines = []
    let i = 0

    this.props.groups.forEach((group) => {
      const background = typeof this.props.backgroundColor === 'function'
                ? this.props.backgroundColor(i)
                : (this.props.backgroundColor || null)

      const style = background
                ? Object.assign({}, elementStyle, {background: background})
                : elementStyle

      groupLines.push(
        <div key={_get(group, 'id')} style={style}>
          {_get(group, 'title')}
        </div>
      )
      i += 1
    })

    return (
      <div ref='sidebar' style={containerStyle}>
        {header}
        <div style={groupsStyle}>
          {groupLines}
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  groups: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
  width: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  sidebarColor: React.PropTypes.string.isRequired,
  sidebarBackgroundColor: React.PropTypes.string.isRequired,
  backgroundColor: React.PropTypes.func,
  borderColor: React.PropTypes.string,
  borderWidth: React.PropTypes.number,
  zIndex: React.PropTypes.number,
  fixedHeader: React.PropTypes.oneOf(['fixed', 'absolute', 'none']),
  listItemPadding: React.PropTypes.string
}
Sidebar.defaultProps = {
  fixedHeader: 'none',
  zIndex: 12,
  listItemPadding: '0 4px',
  borderWidth: 1,
  borderColor: '#aaa',
  backgroundColor: null
}
