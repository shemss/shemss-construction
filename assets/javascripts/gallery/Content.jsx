import React from 'react'
import { Flipper, Flipped, spring } from 'react-flip-toolkit'

import Sidebar  from './Sidebar'
import Photos   from './Photos'

const Content = props => {
  const filteredProjects = props.projects.map(project => {
    const photos = props.photos[project.name]
    return {
      ...project,
      filteredPhotos: props.tag
      ? photos.filter(photo => photo.tags.indexOf(props.tag) > -1)
      : photos
    }
  }).filter(project => project.filteredPhotos.length)

  const flipKey = filteredProjects.map(p => p.slug).join()

  return (
    <div className="d-sm-flex">
      <div className="px-0" style={{ width: '15rem' }}>
        <Sidebar {...props} />
      </div>

      <div style={{ WebkitTransform: 'translate3d(0,0,0)' }}>
        <Flipper flipKey={flipKey} className="flex-fill pt-5 pt-sm-0">
          { filteredProjects.map((project, index) =>
            <Flipped
              key={project.slug}
              flipId={project.slug}
              stagger
              onAppear={(el, index) =>
                spring({
                  onUpdate: val => {
                    el.style.opacity = val
                    el.style.transform = `scale(${val})`
                  },
                  delay: index * 50,
                })
              }
              onExit={(el, index, removeElement) => {
                spring({
                  config: { overshootClamping: true },
                  onUpdate: val => {
                    el.style.opacity = 1 - val
                    el.style.transform = `scale(${1 - val})`
                  },
                  delay: index * 50,
                  onComplete: removeElement,
                })

                return () => {
                  el.style.opacity = ""
                  removeElement()
                }
              }}
            >
              <div className="mb-5">
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
            </Flipped>
          )}
        </Flipper>
      </div>
    </div>
  )
}

export default Content
