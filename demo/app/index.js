import './styles.scss'

import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const demos = {
  main: require('./demo-main').default,
  treeGroups: require('./demo-tree-groups').default,
  linkedTimelines: require('./demo-linked-timelines').default,
  elementResize: require('./demo-element-resize').default
}

export default class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <div className='demo-row'>
            Choose the demo:
            {Object.keys(demos).map(key => (
              <Link key={key} to={`/${key}`}>{key}</Link>
            ))}
          </div>
          <div className='demo-demo'>
            <Route path='/' exact component={demos[Object.keys(demos)[0]]} />
            {Object.keys(demos).map(key => (
              <Route key={key} path={`/${key}`} component={demos[key]} />
            ))}
          </div>
        </div>
      </Router>
    )
  }
}
