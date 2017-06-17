import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { _get, arraysEqual } from '../utils'

export default class Sidebar extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    width: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    zIndex: PropTypes.number,
    fixedHeader: PropTypes.oneOf(['fixed', 'absolute', 'none']),
    keys: PropTypes.object.isRequired,
    groupRenderer: PropTypes.func,
    children: PropTypes.node,
    isRightSidebar: PropTypes.bool
  }

  static defaultProps = {
    fixedHeader: 'none',
    zIndex: 12,
    children: null,
    isRightSidebar: false
  }

  constructor (props) {
    super(props)
    this.state = {
      scrollTop: 0,
      componentTop: 0
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.fixedHeader === 'absolute' && window && window.document && this.state.scrollTop !== nextState.scrollTop) {
      return true
    }

    return !(arraysEqual(nextProps.groups, this.props.groups) &&
             nextProps.keys === this.props.keys &&
             nextProps.width === this.props.width &&
             nextProps.lineHeight === this.props.lineHeight &&
             nextProps.fixedHeader === this.props.fixedHeader &&
             nextProps.zIndex === this.props.zIndex &&
             nextProps.groupHeights === this.props.groupHeights &&
             nextProps.height === this.props.height)
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

  renderGroupContent (group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
    if (this.props.groupRenderer) {
      return React.createElement(this.props.groupRenderer, { group, isRightSidebar })
    } else {
      return _get(group, isRightSidebar ? groupRightTitleKey : groupTitleKey)
    }
  }

  render () {
    const {
      fixedHeader, width, lineHeight, zIndex, groupHeights, height, headerHeight, isRightSidebar
    } = this.props

    const {groupIdKey, groupTitleKey, groupRightTitleKey} = this.props.keys

    const {
      scrollTop
    } = this.state

    const sidebarStyle = {
      width: `${width}px`,
      height: `${height}px`
    }

    const headerStyle = {
      height: `${headerHeight}px`,
      lineHeight: `${lineHeight}px`,
      width: `${width}px`
    }

    const groupsStyle = {
      width: `${width}px`
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
        headerStyle.left = '0'
        groupsStyle.paddingTop = headerStyle.height
      }
    }

    const header = <div ref='sidebarHeader' className='rct-sidebar-header' style={headerStyle}>
                     {this.props.children}
                   </div>

    let groupLines = []
    let i = 0

    this.props.groups.forEach((group, index) => {
      const elementStyle = {
        height: `${groupHeights[index] - 1}px`,
        lineHeight: `${groupHeights[index] - 1}px`
      }

      groupLines.push(
        <div key={_get(group, groupIdKey)} className={'rct-sidebar-row' + (i % 2 === 0 ? ' rct-sidebar-row-even' : ' rct-sidebar-row-odd')} style={elementStyle}>
          {this.renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey)}
        </div>
      )
      i += 1
    })

    return (
      <div ref='sidebar' className={'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : '')} style={sidebarStyle}>
        {header}
        <div style={groupsStyle}>
          {groupLines}
        </div>
      </div>
    )
  }
}
