import React from 'react'
import { Flipper, Flipped, spring } from 'react-flip-toolkit'

import parameterize from './parameterize'

const Photos = ({ expand, ...props }) =>
  <div style={{ margin: '-1px' }}>
    <Flipper
      flipKey={parameterize(
        props.project.filteredPhotos.map(p => p.file).concat(expand).join()
      )}
      className={expand ? '' : 'd-flex pr-5 flex-nowrap overflow-auto'}
      onComplete={props.completeScrollWatch}
    >
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
          <a
            href={photo.file}
            onClick={props.toggleExpand}
            className="d-block"
            style={{
              backgroundImage: [ expand ? photo.file : null, photo.thumb ]
              .filter(Boolean).map(p => `url("${p}")`).join(),
              backgroundPosition: 'center center',
              backgroundSize:     'cover',
              border:             '1px solid #fff',
              paddingTop:   expand ? photo.size[0] / photo.size[1] * 100 + '%' : 0,
              paddingLeft:  expand ? 0 : photo.size[1] / photo.size[0] * 40 + 'vw',
              width:        expand ? '100%' : 'auto',
              height:       expand ? 'auto' : '40vw',
            }}
          ></a>
        </Flipped>
      )}
    </Flipper>
  </div>

export default Photos
