import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import { noop } from '../utility/generic'
import { LEFT_SIDEBAR_ID, RIGHT_SIDEBAR_ID } from './constants'
import { getNextUnit } from '../utility/calendar';

const defaultContextState = {
  headers: [],
  subscribeHeader: () => {
    // eslint-disable-next-line
    console.warn('default subscribe header used')
    return noop
  },
  rightSidebarWidth: 0,
  leftSidebarWidth: 150
}

const { Consumer, Provider } = createReactContext(defaultContextState)

// REVIEW: is this the best way to manage ids?
let _id = 0
const createId = () => {
  _id += 1
  return _id + 1
}

export class TimelineHeadersProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    rightSidebarWidth: PropTypes.number,
    leftSidebarWidth: PropTypes.number.isRequired,
    minUnit: PropTypes.string.isRequired,
    //TODO: maybe this should be skipped?
    timeSteps: PropTypes.object.isRequired,
  }

  state = {
    headers: {
      leftSidebarHeader: {
        renderer: ({ provided }) => <div {...provided} />,
        props: {
          provided: {
            style: {
              width: this.props.leftSidebarWidth
            }
          }
        }
      },
      calenderHeaders: [],
      rightSidebarHeader: null
    }
  }

  handleSubscribeToHeader = (newHeader, id) => {
    newHeader = {
      ...newHeader,
      // REVIEW: in the event that we accept id to be passed to the Header components, this line would override those
      id: id ? id : createId()
    }

    this.setState(state => {
      if (!id)
        return {
          headers: {
            ...state.headers,
            calenderHeaders: [...state.headers.calenderHeaders, newHeader]
          }
        }
      if (id && id === LEFT_SIDEBAR_ID)
        return {
          headers: {
            ...state.headers,
            leftSidebarHeader: newHeader
          }
        }
      if (id && id === RIGHT_SIDEBAR_ID)
        return {
          headers: {
            ...state.headers,
            rightSidebarHeader: newHeader
          }
        }
    })
    return () => {
      this.setState(state => {
        if (!id)
          return {
            headers: {
              ...state.headers,
              calenderHeaders: state.headers.calenderHeaders.filter(
                header => header !== newHeader
              )
            }
          }
        if (id && id === LEFT_SIDEBAR_ID)
          return {
            headers: {
              ...state.headers,
              leftSidebarHeader: null
            }
          }
        if (id && id === RIGHT_SIDEBAR_ID)
          return {
            headers: {
              ...state.headers,
              rightSidebarHeader: null
            }
          }
        return {
          headers: state.headers.filter(header => header !== newHeader)
        }
      })
    }
  }

  render() {
    const contextValue = {
      headers: this.state.headers,
      subscribeHeader: this.handleSubscribeToHeader,
      rightSidebarWidth: this.props.rightSidebarWidth,
      leftSidebarWidth: this.props.leftSidebarWidth,
      minUnit: this.props.minUnit,
      maxUnit: getNextUnit(this.props.minUnit),
      timeSteps: this.props.timeSteps,
    }
    return <Provider value={contextValue}>{this.props.children}</Provider>
  }
}

export const TimelineHeadersConsumer = Consumer
