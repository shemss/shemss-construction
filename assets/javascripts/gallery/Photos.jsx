import React, { useRef } from 'react'
import { Flipper, Flipped, spring } from 'react-flip-toolkit'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

const Photos = props => {
  const container = useRef()

  const scrollLeft = () => container.current.el.scrollBy({
    left: document.documentElement.clientWidth * -1,
    behavior: 'smooth',
  })

  const scrollRight = () => container.current.el.scrollBy({
    left: document.documentElement.clientWidth,
    behavior: 'smooth',
  })

  return (
    <div className="position-relative" style={{ margin: '-0.25rem' }}>
      <Flipper
        flipKey={props.project.filteredPhotos.map(p => p.file).join()}
        className="d-flex pr-5 flex-nowrap overflow-auto"
        ref={container}
      >
        { props.project.filteredPhotos.map((photo, index) =>
          <Flipped
            key={photo.file}
            flipId={photo.file}
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
              className="d-block"
              style={{
                backgroundImage:    `url("${props.largePreview ? photo.file : photo.thumb}")`,
                backgroundPosition: 'center center',
                backgroundSize:     'cover',
                border:             '0.25rem solid #fff',
                paddingLeft:        photo.size[0] / photo.size[1] * 40 + 'vw',
                height:             '40vw',
              }}
            ></a>
          </Flipped>
        )}
      </Flipper>

      <button
        type="button"
        onClick={scrollLeft}
        className="position-absolute btn border-0 text-white px-2 py-3 px-md-3 py-md-4"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: '0 0.5rem 0.5rem 0',
        }}
      >
        <i className="fa fa-2x fa-angle-left" aria-label="Scroll left"></i>
      </button>
      <button
        type="button"
        onClick={scrollRight}
        className="position-absolute btn border-0 text-white px-2 py-3 px-md-3 py-md-4"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: '0.5rem 0 0 0.5rem',
        }}
      >
        <i className="fa fa-2x fa-angle-right" aria-label="Scroll right"></i>
      </button>
    </div>
  )
}

export default Photos
