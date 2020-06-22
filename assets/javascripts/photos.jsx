import React from 'react'
import { render } from 'react-dom'

import Photos from './gallery/Photos'

window.Application = {
  start (props) {
    render(<Photos {...props} />, document.getElementById('ApplicationRoot'))
  }
}
