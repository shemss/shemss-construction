import React, { useMemo, useState } from 'react'

import Content from './Content'

const App = ({ photos, projects, tags, ...props }) => {
  const [ tag, setTag ] = useState(null)

  const filteredProjects = useMemo(() =>
    projects.map(project => {
      const projectPhotos = photos[project.name]
      return {
        ...project,
        filteredPhotos: tag
        ? projectPhotos.filter(photo => photo.tags.indexOf(tag) > -1)
        : projectPhotos
      }
    }).filter(project => project.filteredPhotos.length),
  projects.concat(tag))

  return (
    <Content {...{ filteredProjects, tags, tag, setTag }} />
  )
}

export default App
