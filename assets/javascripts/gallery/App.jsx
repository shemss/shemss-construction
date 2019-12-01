import React, { useMemo, useState } from 'react'

import Content from './Content'

import parameterize from './parameterize'

const App = ({ photos, ...props }) => {
  const projects = useMemo(() =>
    [ ...new Set(photos.map(p => p.project)) ].map(project => ({
      name: project,
      slug: parameterize(project),
    })),
  photos)

  const tags = useMemo(() =>
    [ ...new Set([].concat.apply([], photos.map(p => p.tags))) ].map(tag => ({
      name: tag[0].toUpperCase() + tag.slice(1).replace(/\-+/g, ' '),
      slug: tag,
    })),
  photos)

  const [ project, setProject ] = useState(null)
  const [ tag, setTag ]         = useState(null)

  return (
    <Content
      photos={photos}
      projects={projects}
      project={project}
      setProject={setProject}
      tags={tags}
      tag={tag}
      setTag={setTag}
    />
  )
}

export default App
