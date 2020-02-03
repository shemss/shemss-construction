import React from 'react'

const Tags = ({ label, tags, tag, setTag }) =>
  <ul className="nav flex-column flex-sm-row mb-2">
    <li className="nav-item">
      <a
        className="nav-link disabled text-body"
        href="#"
        tabIndex="-1"
        aria-disabled="true"
      >{label}:</a>
    </li>
    <li className="nav-item">
      <a
        className={`nav-link ${tag ? 'text-muted' : 'active'}`}
        href="#all"
        onClick={e => {
          e.preventDefault()
          setTag(null)
        }}
      >All {label}</a>
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
