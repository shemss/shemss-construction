import React from 'react'

import Sidebar  from './Sidebar'
import Photos   from './Photos'

const Content = props =>
  <div className="container-fluid d-sm-flex">
    <div className="px-0" style={{ width: '15rem' }}>
      <Sidebar {...props} />
    </div>

    <div className="flex-fill pt-5 pt-sm-0">
      <Photos {...props} />
    </div>
  </div>

export default Content
