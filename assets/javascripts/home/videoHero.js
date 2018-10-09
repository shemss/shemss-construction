import isAutoplaySupported from '../utils/isAutoplaySupported'

const videoHero = {
  createSlide (src, index) {
    const slide = document.createElement('div')
    const image = document.createElement('img')

    image.setAttribute('src', src)
    slide.className = 'item video-hero-slide video-hero-slide-' + (index + 1)
    slide.appendChild(image)

    return slide
  },

  initCarousel () {
    const carousel      = document.createElement('div')
    const carouselInner = document.createElement('div')
    const slides = JSON.parse(this.hero.getAttribute('data-slides'))
    .map(this.createSlide)

    slides[0].className += ' active'

    carousel.className = 'carousel slide'
    carousel.setAttribute('data-ride', 'carousel')

    carouselInner.className = 'carousel-inner'
    carouselInner.setAttribute('role', 'listbox')

    slides.forEach(carouselInner.appendChild)
    carousel.appendChild(carouselInner)
    this.hero.appendChild(carousel)
  },

  initVideo () {
    const video   = document.createElement('video')
    const source  = document.createElement('source')

    video.className = 'img-fluid'
    video.setAttribute('loop', '')
    video.setAttribute('muted', '')
    video.setAttribute('autoplay', '')
    video.setAttribute('playsinline', '')

    source.setAttribute('type', 'video/mp4')
    source.setAttribute('src', this.hero.getAttribute('data-video'))

    video.appendChild(source)
    this.hero.appendChild(video)
  },

  init () {
    this.hero = document.querySelector('.video-hero')
    if (!this.hero) return

    isAutoplaySupported(supported => {
      if (supported)
        this.initVideo()
      else
        this.initCarousel()

      const placeholder = document.querySelector('.video-hero-placeholder')
      this.hero.removeChild(placeholder)
    })
  },
}

videoHero.init = videoHero.init.bind(videoHero)

export default videoHero
