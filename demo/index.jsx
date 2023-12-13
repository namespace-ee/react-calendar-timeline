import React from 'react'
import 'react-calendar-timeline-css'
import App from './app'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);


if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default

    root.render(NextApp)
  })
}
