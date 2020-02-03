import React from 'react'
import { Flipper, Flipped, spring } from 'react-flip-toolkit'

import parameterize from './parameterize'

const Photos = props =>
  <div style={{ margin: '-1px' }}>
    <Flipper
      flipKey={parameterize(
        props.project.filteredPhotos.map(p => p.file).concat(props.expand).join()
      )}
      className={`row mx-0 ${props.expand ? '' : 'pr-5 flex-nowrap overflow-auto'}`}
      onComplete={props.completeScrollWatch}
    >
      { props.project.filteredPhotos.map((photo, index) =>
        <Flipped
          key={parameterize(photo.file)}
          flipId={parameterize(photo.file)}
          onAppear={(el, index) =>
            spring({
              onUpdate: val => {
                el.style.opacity = val
                el.style.transform = `scale(${val})`
              },
            })
          }
          onExit={(el, index, removeElement) => {
            spring({
              config: { overshootClamping: true },
              onUpdate: val => {
                el.style.opacity = 1 - val
                el.style.transform = `scale(${1 - val})`
              },
              onComplete: removeElement,
            })

            return () => {
              el.style.opacity = ""
              removeElement()
            }
          }}
        >
          <div className={`${props.expand ? 'col-12' : 'col-12 col-md-6'} px-0`}>
            <a
              href={photo.file}
              onClick={props.toggleExpand}
              className="d-block"
              style={{
                backgroundImage: [ props.expand ? photo.file : null, photo.thumb ]
                .filter(Boolean).map(p => `url("${p}")`).join(),
                backgroundPosition: 'center center',
                backgroundSize:     'cover',
                border:             '1px solid #fff',
                paddingTop: props.expand
                ? `${photo.size[0] / photo.size[1] * 100}%`
                : '56.25%',
              }}
            ></a>
          </div>
        </Flipped>
      )}
    </Flipper>
  </div>

export default Photos
