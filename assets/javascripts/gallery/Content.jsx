import React from 'react'

import Tags   from './Tags'
import Photos from './Photos'

const Content = props =>
  <div className="container-fluid">
    <Tags
      label="Projects"
      tag={props.project}
      tags={props.projects}
      setTag={props.setProject}
    />

    <Tags
      label="Tags"
      tag={props.tag}
      tags={props.tags}
      setTag={props.setTag}
    />

    <Photos {...props} />
  </div>

export default Content
