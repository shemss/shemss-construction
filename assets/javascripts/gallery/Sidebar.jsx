import React, { useState } from 'react'

import Tags from './Tags'

const Sidebar = props => {
  const [ open, setOpen ] = useState(false)

  return <>
    <button
      className="btn btn-light px-3 position-fixed d-sm-none btn-sidebar"
      onClick={() => setOpen(true)}
      style={{
        left: 0,
        zIndex: 1,
      }}
    >
      Filter
    </button>

    <div className={`gallery-sidebar bg-white d-flex flex-column ${
      open ? 'gallery-sidebar-open' : ''
    }`}>
      <div className="d-flex justify-content-between d-sm-none border-bottom">
        <div className="px-3 py-2">Filter</div>
        <button
          type="button"
          className="btn btn-light px-3"
          onClick={() => setOpen(false)}
        >
          <i className="fa fa-times" aria-label="Done"></i>
        </button>
      </div>

      <div className="container-fluid px-0 px-md-4 flex-fill overflow-auto">
        <Tags
          label="Tags"
          tag={props.tag}
          tags={props.tags}
          setTag={props.setTag}
        />
      </div>
    </div>
  </>
}

export default Sidebar
