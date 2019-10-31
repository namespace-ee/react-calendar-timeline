import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'
import interact from 'interactjs'
import { _get } from '../utility/generic'
import { GroupRowConsumer } from './GroupRowContext'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'

class GroupRow extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    groupHeight: PropTypes.number.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    keys: PropTypes.object
  }

  ref = React.createRef()

  componentDidMount() {
    interact(this.ref.current).dropzone({
      accept: '.rct-item',
      overlap: 'pointer'
    })
  }

  render() {
    const {
      onContextMenu,
      onDoubleClick,
      isEvenRow,
      onClick,
      clickTolerance,
      horizontalLineClassNamesForGroup,
      group,
      children,
      keys,
      canvasWidth,
      groupHeight
    } = this.props
    let classNamesForGroup = []
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group)
    }
    return (
      <PreventClickOnDrag clickTolerance={clickTolerance} onClick={onClick}>
        <div
          data-testid="groupRow"
          ref={this.ref}
          onContextMenu={onContextMenu}
          onDoubleClick={onDoubleClick}
          className={
            'rct-hl ' +
            (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') +
            (classNamesForGroup ? classNamesForGroup.join(' ') : '')
          }
          style={{
            width: canvasWidth,
            height: groupHeight,
            position: 'relative'
          }}
          data-groupid={_get(group, keys.groupIdKey)}
        >
          {children}
        </div>
      </PreventClickOnDrag>
    )
  }
}

class GroupRowWrapper extends PureComponent {
  render() {
    return (
      <TimelineStateConsumer>
        {({ getTimelineState }) => {
          const { canvasWidth, keys } = getTimelineState()
          return (
            <GroupRowConsumer>
              {props => (
                <GroupRow
                  canvasWidth={canvasWidth}
                  keys={keys}
                  canvasWidth={canvasWidth}
                  {...props}
                  children={this.props.children}
                />
              )}
            </GroupRowConsumer>
          )
        }}
      </TimelineStateConsumer>
    )
  }
}

export default GroupRowWrapper
