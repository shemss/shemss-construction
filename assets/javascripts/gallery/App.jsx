import React, { useMemo, useState } from 'react'

import Content from './Content'

import parameterize from './parameterize'

const App = ({ photos, ...props }) => {
  const projects = useMemo(() =>
    props.projects.map(project => ({
      name: project,
      slug: parameterize(project),
      ...props.descriptions[parameterize(project)],
    })),
  props.projects)

  const tags = useMemo(() =>
    props.tags.map(tag => ({
      name: tag[0].toUpperCase() + tag.slice(1).replace(/\-+/g, ' '),
      slug: tag,
    })),
  props.tags)

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
