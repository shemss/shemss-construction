const parameterize = str =>
  str.toLowerCase().replace(/[^a-z0-9\-_]+/g, '-')
  .replace(/-{2,}/g, '-').replace(/^-|-$/, '')

export default parameterize
