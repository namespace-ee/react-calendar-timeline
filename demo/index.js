import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

import './index.html'

const render = (AppToRender) => {
  ReactDOM.render(
    <AppToRender />,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default

    render(NextApp)
  })
}
