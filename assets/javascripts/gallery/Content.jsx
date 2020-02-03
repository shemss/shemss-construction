import React from 'react'
import { Flipper, Flipped, spring } from 'react-flip-toolkit'

import Sidebar  from './Sidebar'
import Photos   from './Photos'

const Content = props =>
  <div className="d-sm-flex">
    <div className="px-0" style={{ width: '15rem' }}>
      <Sidebar {...props} />
    </div>

    <div className="flex-fill pt-5 pt-sm-0">
      { props.filteredProjects.map((project, index) =>
        <div key={project.slug} className="mb-5">
          <h2 className="mb-4">{project.name}</h2>
          <p className="mb-4" style={{ maxWidth: '52rem' }}>
            Home is where the heart is... Your home is a reflection of you
            -the person you are, the life you live, and the family you
            cherish. Large kitchen & living room areas that also grant you
            access to the large deck built onto the back of the house.
            SHEMSS will take your ideas and dreams to create a unique space
            that provides the function, form, and aesthetic that's perfect
            for you.
          </p>

          <Photos {...props} key={project.slug} project={project} />
        </div>
      )}
    </div>
  </div>

export default Content
