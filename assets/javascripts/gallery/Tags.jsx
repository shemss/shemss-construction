import React from 'react'

const Tags = ({ tags, tag, setTag }) =>
  <ul className="nav flex-column flex-sm-row mb-2 mx-md-n3">
    <li className="nav-item">
      <a
        className={`nav-link ${tag ? 'text-muted' : 'active'}`}
        href="#all"
        onClick={e => {
          e.preventDefault()
          setTag(null)
        }}
      >All</a>
    </li>
    { tags.map(({ name, slug }) =>
      <li key={slug} className="nav-item">
        <a
          className={`nav-link ${tag == slug ? 'active' : 'text-muted'}`}
          href={`#${slug}`}
          onClick={e => {
            e.preventDefault()
            setTag(slug)
          }}
        >
          {name}
        </a>
      </li>
    )}
  </ul>

export default Tags
