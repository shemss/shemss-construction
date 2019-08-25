const resizeItems = () => {
  document.querySelectorAll('.carousel-text').forEach(carousel => {
    const items = carousel.querySelectorAll('.carousel-item')
    const heights = Array.prototype.map.call(items, item => {
      item.style.height     = null
      item.style.visibility = 'hidden'
      item.style.display    = 'block'
      const height          = item.offsetHeight
      item.style.visibility = null
      item.style.display    = null
      return height
    })

    const tallestHeight = Math.max(...heights)

    items.forEach(item => item.style.height = tallestHeight + 'px')
  })
}

let resizeItemsTimeout
const debounceResizeItems = () => {
  clearTimeout(resizeItemsTimeout)
  resizeItemsTimeout = setTimeout(resizeItems, 66)
}

const textCarousel = () => {
  resizeItems()
  addEventListener('resize', debounceResizeItems)
}

export default textCarousel
