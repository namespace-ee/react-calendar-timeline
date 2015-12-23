import React, { Component } from 'react'

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
      sidebarBorderRight, sidebarBorderBottom, sidebarBackgroundColor, sidebarColor, gradientBackground
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
      background: gradientBackground,
      position: 'relative'
    }

    const headerStyle = {
      height: `${lineHeight * 2}px`,
      lineHeight: `${lineHeight}px`,
      margin: '0',
      color: sidebarColor,
      background: sidebarBackgroundColor,
      borderRight: sidebarBorderRight,
      boxSizing: 'border-box',
      borderBottom: sidebarBorderBottom,
      overflow: 'hidden',
      width: `${width}px`
    }

    const groupsStyle = {
      width: `${width}px`
    }

    const elementStyle = {
      height: `${lineHeight}px`,
      lineHeight: `${lineHeight}px`,
      padding: listItemPadding,
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

    return (
      <div ref='sidebar' style={containerStyle}>
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
  sidebarBorderRight: React.PropTypes.string,
  sidebarBorderBottom: React.PropTypes.string,
  listItemPadding: React.PropTypes.string
}
Sidebar.defaultProps = {
  fixedHeader: 'none',
  zIndex: 12,
  listItemPadding: '0 4px',
  sidebarBorderRight: '1px solid #aaa',
  sidebarBorderBottom: '1px solid #aaa'
}
