import React, { Component } from 'react'

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollTop: 0
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

  componentDidMount () {
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

  render () {
    const {
      fixedHeader, width, lineHeight, zIndex, groups,
      sidebarBorderRight, sidebarBackgroundColor, sidebarColor, gradientBackground
    } = this.props

    const {
      scrollTop
    } = this.state

    const containerStyle = {
      width: `${width}px`,
      height: `${lineHeight * (groups.length + 2)}px`,
      boxSizing: 'border-box',
      borderRight: sidebarBorderRight,
      overflow: 'hidden',
      display: 'inline-block',
      verticalAlign: 'top',
      background: gradientBackground
    }

    const headerStyle = {
      height: `${lineHeight * 2}px`,
      lineHeight: `${lineHeight}px`,
      margin: '0',
      color: sidebarColor,
      background: sidebarBackgroundColor,
      borderRight: sidebarBorderRight,
      boxSizing: 'border-box',
      width: `${width}px`
    }

    const groupsStyle = {
      width: `${width}px`
    }

    const elementStyle = {
      height: `${lineHeight}px`,
      lineHeight: `${lineHeight}px`,
      padding: '0 4px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      margin: '0'
    }

    if (fixedHeader === 'fixed') {
      headerStyle.position = 'fixed'
      headerStyle.zIndex = zIndex
      groupsStyle.paddingTop = headerStyle.height
    } else if (fixedHeader === 'absolute') {
      headerStyle.position = 'absolute'
      headerStyle.top = `${scrollTop}px`
      headerStyle.left = `0`
      groupsStyle.paddingTop = headerStyle.height
    }

    const header = <div key='sidebar-header' style={headerStyle}>
                     {this.props.children}
                   </div>

    return (
      <div style={containerStyle}>
        {header}
        <div style={groupsStyle}>
          {this.props.groups.map(group => <p key={group.id} style={elementStyle}>{group.title}</p>)}
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  groups: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  sidebarColor: React.PropTypes.string.isRequired,
  sidebarBackgroundColor: React.PropTypes.string.isRequired,
  gradientBackground: React.PropTypes.string.isRequired,
  zIndex: React.PropTypes.number,
  fixedHeader: React.PropTypes.oneOf(['fixed', 'absolute', 'none']),
  sidebarBorderRight: React.PropTypes.string
}
Sidebar.defaultProps = {
  fixedHeader: 'none',
  zIndex: 12,
  sidebarBorderRight: '1px solid #aaa'
}
