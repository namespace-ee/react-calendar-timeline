import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import { noop } from '../utility/generic'

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
    leftSidebarWidth: PropTypes.number.isRequired
  }

  state = {
    headers: [],
  }

  handleSubscribeToHeader = (newHeader, id) => {
    newHeader = {
      ...newHeader,
      // REVIEW: in the event that we accept id to be passed to the Header components, this line would override those
      id: id ? id : createId()
    }

    this.setState(state => {
      return {
        headers: [...state.headers, newHeader]
      }
    })
    return () => {
      this.setState(state => {
        return {
          headers: state.headers.filter(header => header !== newHeader)
        }
      })
    }
  }

  render() {
    const contextValue = {
      ...this.state,
      subscribeHeader: this.handleSubscribeToHeader,
      rightSidebarWidth: this.props.rightSidebarWidth,
      leftSidebarWidth: this.props.leftSidebarWidth
    }
    console.log(contextValue)
    return <Provider value={contextValue}>{this.props.children}</Provider>
  }
}

export const TimelineHeadersConsumer = Consumer
