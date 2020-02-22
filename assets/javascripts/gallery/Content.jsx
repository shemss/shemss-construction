import React from 'react'
import { Flipper, Flipped, spring } from 'react-flip-toolkit'

import Sidebar  from './Sidebar'
import Photos   from './Photos'

const Content = props =>
  <div>
    <Sidebar {...props} />

    <div className="flex-fill pt-5 pt-sm-0">
      { props.filteredProjects.map((project, index) =>
        <div key={project.slug} className="mb-5">
          <div className="container-fluid">
            <h2 className="mb-4">
              {[ project.name, project.title ].filter(Boolean).join(' — ')}
            </h2>
            <p className="mb-4" style={{ maxWidth: '52rem' }}>
              {project.description}
            </p>
          </div>

          <Photos {...props} key={project.slug} project={project} />
        </div>
      )}
    </div>
  </div>

export default Content
