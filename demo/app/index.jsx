import React from 'react'
import './styles.scss'

import { Component } from 'react'
import PropTypes from 'prop-types'
//
import { HashRouter as Router, Route, Link, useLocation, Routes } from 'react-router-dom'
//
import DemoMain from "./demo-main"
import DemoPerformance from "./demo-performance"
import DemoTreePGroups from './demo-tree-groups'
  import LinkedTimelines from './demo-linked-timelines';
  import ElementResize from './demo-element-resize';
  import Renderers from './demo-renderers';
  import VerticalClasses from './demo-vertical-classes';
  import CustomItems from './demo-custom-items';
  import CustomHeaders from './demo-headers';
  import CustomInfoLabel from './demo-custom-info-label';
  import ControledSelect from './demo-controlled-select';
  import ControlledScrolling from './demo-controlled-scrolling';

const demos = {
  main: <DemoMain/>,
  performance: <DemoPerformance/>,
  treeGroups: DemoTreePGroups,
  linkedTimelines: <LinkedTimelines/>,
  elementResize: <ElementResize/>,
  renderers: <Renderers/>,
  verticalClasses: <VerticalClasses/>,
  customItems: <CustomItems/>,
  customHeaders: <CustomHeaders/>,
  customInfoLabel: <CustomInfoLabel/>,
  controledSelect: <ControledSelect/>,
  controlledScrolling: <ControlledScrolling/>,
}
//
// A simple component that shows the pathname of the current location
class Menu extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  render() {
    let pathname = (this.props.location || {}).pathname

    if (!pathname || pathname === '/') {
      pathname = `/${Object.keys(demos)[0]}`
    }

    return (
      <div
        className={`demo-row${
          pathname.indexOf('sticky') >= 0 ? ' sticky' : ''
        }`}
      >Loc:{pathname}
        Choose the demo:
        {Object.keys(demos).map(key => (
          <Link
            key={key}
            className={pathname === `/${key}` ? 'selected' : ''}
            to={`/${key}`}
          >
            {key}
          </Link>
        ))}
      </div>
    )
  }
}

const App = () => {
//  const location = useLocation()
    return (
      <Router>
        <div>
          <Menu location={location} />
          <div className="demo-demo">
            <Routes>
              <Route index element={demos[Object.keys(demos)[0]]} />
            {Object.keys(demos).map(key => (
              <Route key={key} path={`/${key}`} element={demos[key]} />
            ))}
            </Routes>
          </div>
        </div>
      </Router>
    )
  }


export default App
