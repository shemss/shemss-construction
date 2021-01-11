import 'intersection-observer'
import React, { useState, useEffect, useRef } from 'react'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

const Photo = ({ photo, index, project, largePreview }) => {
  const [ photoVisible, setPhotoVisible ] = useState(false)

  const element = useRef()

  useEffect(() => {
    const handlePhotoIntersection = entries =>
      setPhotoVisible(entries[0].isIntersecting)

    const photoObserver = new IntersectionObserver(handlePhotoIntersection, {
      root: element.current.parentNode,
      rootMargin: '50%',
    })
    photoObserver.observe(element.current)

    return () => photoObserver.disconnect()
  }, [])

  return (
    <a
      ref={element}
      href={photo.file}
      onClick={e => {
        e.preventDefault()
        const pswpElement = document.querySelector('.pswp')
        const items = project.filteredPhotos.map(item => ({
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
        backgroundImage: photoVisible
          ? `url("${largePreview ? photo.file : photo.thumb}")`
          : null,
        backgroundPosition: 'center center',
        backgroundSize:     'cover',
        border:             '0.25rem solid #fff',
        paddingLeft:        photo.size[0] / photo.size[1] * 40 + 'vw',
        height:             '40vw',
      }}
    ></a>
  )
}

export default Photo
