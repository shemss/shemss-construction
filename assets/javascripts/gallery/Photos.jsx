import React from 'react'

import parameterize from './parameterize'

const Photos = ({ expand, ...props }) =>
  <div style={{ margin: '-1px' }}>
    <div
      className={expand ? '' : 'd-flex pr-5 flex-nowrap overflow-auto'}
    >
      { props.project.filteredPhotos.map((photo, index) =>
        <a
          key={parameterize(photo.file)}
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
      )}
    </div>
  </div>

export default Photos
