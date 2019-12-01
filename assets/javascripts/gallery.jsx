import React from 'react'
import { render } from 'react-dom'

import App from './gallery/App'

window.Application = {
  start (props) {
    render(<App {...props} />, document.getElementById('ApplicationRoot'))
  }
}
