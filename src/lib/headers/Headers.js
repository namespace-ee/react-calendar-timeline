import React from 'react'
import {TimelineHeadersConsumer} from './HeadersContext'

class Headers extends React.Component {
  render() {
    return <div style={{ width: '100%', height: 30, background:'red' }}>
        <TimelineHeadersConsumer>
            {({headers})=>{
                return headers.map(header => {
                    const {renderer, props} = header
                    return renderer(props)
                })
            }}
        </TimelineHeadersConsumer>
    </div>
  }
}

export default Headers
