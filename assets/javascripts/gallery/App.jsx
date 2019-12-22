import React, { useMemo, useState, useEffect, useRef } from 'react'

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

  const [ tag, setTag ]           = useState(null)
  const [ expand, setExpand ]     = useState(false)
  const [ expandEl, setExpandEl ] = useState(null)
  const expandTop     = useRef(null)
  const completeCount = useRef(0)

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

  const toggleExpand = e => {
    e.preventDefault()
    setExpand(expand => !expand)
    setExpandEl(e.target)
    expandTop.current = e.target.getBoundingClientRect().top
  }

  const scrollWatch = () => {
    if (!expandTop.current || !expandEl) return
    const rect = expandEl.getBoundingClientRect()
    const top = window.scrollY + rect.top - expandTop.current
    scrollTo(window.scrollX, top)
    requestAnimationFrame(scrollWatch)
  }

  const completeScrollWatch = () => {
    completeCount.current += 1
    if (completeCount.current == filteredProjects.length) {
      expandTop.current = null
      completeCount.current = 0
      setExpandEl(null)
    }
  }

  useEffect(scrollWatch, [ expand ])

  return (
    <Content {...{
      filteredProjects, tags, tag, setTag, expand, toggleExpand,
      completeScrollWatch,
    }} />
  )
}

export default App
