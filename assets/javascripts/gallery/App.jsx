import React, { useMemo, useState } from 'react'

import Content from './Content'

import parameterize from './parameterize'

const App = ({ photos, ...props }) => {
  const projects = useMemo(() =>
    props.projects.map(project => ({
      name: project,
      slug: parameterize(project),
    })),
  props.projects)

  const tags = useMemo(() =>
    props.tags.map(tag => ({
      name: tag[0].toUpperCase() + tag.slice(1).replace(/\-+/g, ' '),
      slug: tag,
    })),
  props.tags)

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
