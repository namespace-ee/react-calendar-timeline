import './styles.scss'

import React, { Component } from 'react'

const demos = {
  main: require('./demo-main').default,
  linkedTimelines: require('./demo-linked-timelines').default
}

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      demo: 'main'
    }
  }

  chooseDemo = (demo, e) => {
    e.preventDefault()
    this.setState({ demo })
  }

  render () {
    const { demo } = this.state
    const Demo = demos[demo]

    return (
      <div>
        <div className='demo-row'>
          Choose the demo:
          {Object.entries(demos).map(([key, Demo]) => (
            <a href='#' key={key} className={`demo-selection${demo === key ? ' selected' : ''}`} onClick={(e) => this.chooseDemo(key, e)}>{key}</a>
          ))}
        </div>
        <div className='demo-demo'>
          <Demo />
        </div>
      </div>
    )
  }
}
