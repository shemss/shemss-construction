import React, { useMemo, useState, useEffect } from 'react'

import Content from './Content'

const calcPreview = () => devicePixelRatio * innerWidth >= 2560

const App = ({ photos, projects, tags, ...props }) => {
  const [ largePreview, setLargePreview ] = useState(calcPreview)
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

  useEffect(() => {
    const mmChanged = e => setLargePreview(calcPreview)
    const mm = matchMedia('screen and (min-resolution: 2dppx)')
    mm.addListener(mmChanged)
    addEventListener('resize', mmChanged)
    return () => {
      mm.removeListener(mmChanged)
      removeEventListener(mmChanged)
    }
  }, [])

  return (
    <Content {...{ filteredProjects, tags, tag, setTag, largePreview }} />
  )
}

export default App
