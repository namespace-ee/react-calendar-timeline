import React, { PropsWithChildren } from 'react'
import { noop } from '../utility/generic'
import { MarkerType } from './markerType'

export type SubscribeReturn = {
  unsubscribe: () => void
  getMarker: () => MarkerType
}
type TimelineMarkersContextValue = {
  markers: MarkerType[]
  subscribeMarker: (newe: MarkerType) => SubscribeReturn;
  updateMarker: (upd: MarkerType) => void
}

const defaultContextState: TimelineMarkersContextValue = {
  markers: [],
  subscribeMarker: () => {
    // eslint-disable-next-line
    console.warn('default subscribe marker used')
    return {
      unsubscribe: noop,
      getMarker: noop
    } as SubscribeReturn
  },
  updateMarker: () => {
    // eslint-disable-next-line
    console.warn('default subscribe marker used')
    return noop
  },
}

const { Consumer, Provider } =
  React.createContext<TimelineMarkersContextValue>(defaultContextState)

// REVIEW: is this the best way to manage ids?
let _id = 0
const createId = () => {
  _id += 1
  return _id + 1
}

export class TimelineMarkersProvider extends React.Component<
  PropsWithChildren,
  TimelineMarkersContextValue
> {
  handleSubscribeToMarker = (newMarker: MarkerType): SubscribeReturn => {
    newMarker = {
      ...newMarker,
      // REVIEW: in the event that we accept id to be passed to the Marker components, this line would override those
      id: createId(),
    }

    this.setState((state) => {
      return {
        markers: [...state.markers, newMarker],
      }
    })
    return {
      unsubscribe: () => {
        this.setState((state) => {
          return {
            markers: state.markers.filter(
              (marker) => marker.id !== newMarker.id,
            ),
          }
        })
      },
      getMarker: () => {
        return newMarker
      },
    }
  }

  handleUpdateMarker = (updateMarker: MarkerType) => {
    const markerIndex = this.state.markers.findIndex(
      (marker) => marker.id === updateMarker.id,
    )
    if (markerIndex < 0) return
    this.setState((state) => {
      return {
        markers: [
          ...state.markers.slice(0, markerIndex),
          updateMarker,
          ...state.markers.slice(markerIndex + 1),
        ],
      }
    })
  }
  constructor(props: any) {
    super(props)
    this.state = {
      markers: [],
      subscribeMarker: this.handleSubscribeToMarker,
      updateMarker: this.handleUpdateMarker,
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export const TimelineMarkersConsumer = Consumer
