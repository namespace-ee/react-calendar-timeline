import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import { noop } from '../utility/generic'
import { LEFT_SIDEBAR_ID, RIGHT_SIDEBAR_ID } from './constants'
import { getNextUnit } from '../utility/calendar'

const defaultContextState = {
  calendarHeaders: [],
  sidebarHeaders: {},
  subscribeCalendarHeader: () => {
    // eslint-disable-next-line
    console.warn('default subscribe calender header used')
    return noop
  },
  subscribeSidebarHeader: () => {
    // eslint-disable-next-line
    console.warn('default subscribe sidebar header used')
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
    timeSteps: PropTypes.object.isRequired
  }

  state = {
    sidebarHeaders: {
      [LEFT_SIDEBAR_ID]: {
        renderer: ({ provided }) => <div {...provided} />,
        props: {
          provided: {
            style: {
              width: this.props.leftSidebarWidth
            }
          }
        }
      },
      [RIGHT_SIDEBAR_ID]: null
    },
    calendarHeaders: []
  }

  handleSubscribeSidebarHeader = (header, id) => {
    if (!header) throw Error('header is not provided')
    if (!id) {
      console.warn('you should provide header sidebar with id')
      return
    }
    this.setState(state => ({
      sidebarHeaders: {
        ...state.sidebarHeaders,
        [id]: header
      }
    }))

    return {
      unsubscribeHeader: () => {
        this.setState(state => ({
          sidebarHeaders: {
            ...state.sidebarHeaders,
            [id]: null
          }
        }))
      },
      resubscribeHeader: newHeader => {
        this.setState(state => ({
          sidebarHeaders: {
            ...state.sidebarHeaders,
            [id]: newHeader
          }
        }))
      }
    }
  }

  handleSubscribeCalendarHeader = header => {
    console.log(header)
    if (!header) throw Error('header is not provided')
    const headerId = createId()
    header.id = headerId
    this.setState(state => ({
      calendarHeaders: [...state.calendarHeaders, header]
    }))

    return {
      unsubscribeHeader: () => {
        this.setState(state => ({
          calendarHeaders: state.calendarHeaders.filter(header => header !== newHeader)
        }))
      },
      resubscribeHeader: newHeader => {
        newHeader.id = headerId
        //TODO: keep order
        this.setState(state => {
          const filteredHeaders = state.calendarHeaders.filter(
            header => header.id !== headerId
          )
          return {
            calendarHeaders: [...filteredHeaders, newHeader]
          }
        })
      }
    }
  }

  render() {
    console.log(this.state)
    const contextValue = {
      calendarHeaders: this.state.calendarHeaders,
      sidebarHeaders: this.state.sidebarHeaders,
      subscribeCalendarHeader: this.handleSubscribeCalendarHeader,
      subscribeSidebarHeader: this.handleSubscribeSidebarHeader,
      rightSidebarWidth: this.props.rightSidebarWidth,
      leftSidebarWidth: this.props.leftSidebarWidth,
      minUnit: this.props.minUnit,
      maxUnit: getNextUnit(this.props.minUnit),
      timeSteps: this.props.timeSteps
    }
    return <Provider value={contextValue}>{this.props.children}</Provider>
  }
}

export const TimelineHeadersConsumer = Consumer
