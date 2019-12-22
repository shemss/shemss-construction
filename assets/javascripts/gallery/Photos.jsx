import React from 'react'
import { Flipper, Flipped, spring } from 'react-flip-toolkit'

import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

import parameterize from './parameterize'

const Photos = props => {
  const flipKey = parameterize(props.project.filteredPhotos.map(p => p.file).join())

  return (
    <div style={{ margin: '-1px' }}>
      <Flipper flipKey={flipKey} className="row mx-0 pr-5 flex-nowrap overflow-auto">
        { props.project.filteredPhotos.map((photo, index) =>
          <Flipped
            key={parameterize(photo.file)}
            flipId={parameterize(photo.file)}
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
            <div className="col-md-6 px-0">
              <a
                href={photo.file}
                onClick={e => {
                  e.preventDefault()
                  const pswpElement = document.querySelector('.pswp')
                  const items = props.project.filteredPhotos.map(item => ({
                    src:    item.file,
                    msrc:   item.thumb,
                    title:  [
                      item.project,
                      item.tags.map(tag =>
                        tag[0].toUpperCase() + tag.slice(1).replace(/\-+/, ' ')
                      ).join(', ') ].join(' - '),
                    w: item.size[0],
                    h: item.size[1],
                  }))
                  const gallery = new PhotoSwipe(
                    pswpElement,
                    PhotoSwipeUI_Default,
                    items,
                    { index }
                  )
                  gallery.init()
                }}
                className="embed-responsive embed-responsive-16by9"
                style={{
                  backgroundImage:    `url("${photo.thumb}")`,
                  backgroundPosition: 'center center',
                  backgroundSize:     'cover',
                  border:             '1px solid #fff',
                }}
              ></a>
            </div>
          </Flipped>
        )}
      </Flipper>
    </div>
  )
}

export default Photos
