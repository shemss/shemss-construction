import React from 'react'
import { Flipper, Flipped, spring } from 'react-flip-toolkit'

import parameterize from './parameterize'

const Photos = props =>
  <div style={{ margin: '-1px' }}>
    <div
      className={`row mx-0 ${props.expand ? '' : 'pr-5 flex-nowrap overflow-auto'}`}
    >
      { props.project.filteredPhotos.map((photo, index) =>
        <div
          key={parameterize(photo.file)}
          className={`${props.expand ? 'col-12' : 'col-12 col-md-6'} px-0`}
        >
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
      )}
    </div>
  </div>

export default Photos
