import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import { noop } from '../utility/generic'

const defaultContextState = {
  markers: [],
  subscribeMarker: () => {
    // eslint-disable-next-line
    console.warn('default subscribe marker used')
    return noop
  }
}

const { Consumer, Provider } = createReactContext(defaultContextState)

// REVIEW: is this the best way to manage ids?
let _id = 0
const createId = () => {
  _id += 1
  return _id + 1
}

export class TimelineMarkersProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  handleSubscribeToMarker = newMarker => {
    newMarker = {
      ...newMarker,
      // REVIEW: in the event that we accept id to be passed to the Marker components, this line would override those
      id: createId()
    }

    this.setState(state => {
      return {
        markers: [...state.markers, newMarker]
      }
    })
    return () => {
      this.setState(state => {
        return {
          markers: state.markers.filter(marker => marker !== newMarker)
        }
      })
    }
  }
  state = {
    markers: [],
    subscribeMarker: this.handleSubscribeToMarker
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export const TimelineMarkersConsumer = Consumer
