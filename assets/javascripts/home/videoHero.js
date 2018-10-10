import isAutoplaySupported from '../utils/isAutoplaySupported'

const videoHero = {
  createCaption (slideData) {
    const caption         = document.createElement('div')
    const captionHeading  = document.createElement('h1')
    const captionLink     = document.createElement('a')
    const captionText     = document.createTextNode(slideData.caption)

    caption.className = 'carousel-caption'
    captionLink.className = 'text-white'
    captionLink.setAttribute('href', slideData.href)

    captionLink.appendChild(captionText)
    captionHeading.appendChild(captionLink)
    caption.appendChild(captionHeading)

    return caption
  },

  createSlide (slideData, index) {
    const slide   = document.createElement('div')
    const image   = document.createElement('img')
    const caption = this.createCaption(slideData)

    image.setAttribute('src', slideData.image)
    image.className = 'd-block w-100'
    slide.className = 'carousel-item'

    if (!index) {
      image.addEventListener('load', this.removePlaceholder)
      slide.className += ' active'
    }

    slide.appendChild(image)
    slide.appendChild(caption)

    return slide
  },

  createIndicator (slideData, index) {
    const indicator = document.createElement('li')
    indicator.setAttribute('data-target', '#video-fallback-carousel')
    indicator.setAttribute('data-slide-to', index)
    if (!index) indicator.className = 'active'
    return indicator
  },

  initCarousel () {
    const carousel      = document.createElement('div')
    const carouselInner = document.createElement('div')
    const slides        = this.slides.map(this.createSlide)
    const indicators    = this.slides.map(this.createIndicator)
    const indicatorsL   = document.createElement('ol')

    indicatorsL.className = 'carousel-indicators'
    carousel.className = 'carousel slide carousel-fade'
    carousel.setAttribute('id', 'video-fallback-carousel')
    carouselInner.className = 'carousel-inner'

    slides.forEach(slide => carouselInner.appendChild(slide))
    indicators.forEach(indicator => indicatorsL.appendChild(indicator))
    carousel.appendChild(indicatorsL)
    carousel.appendChild(carouselInner)
    this.hero.appendChild(carousel)

    $(carousel).carousel()
  },

  changeCaption (e) {
    const nextCaption = (() => {
      for (let i in this.slides) {
        if (this.slides[i].time > e.target.currentTime)
          return i
      }
    })() || 0

    if (this.currentCaption != nextCaption) {
      this.captions[this.currentCaption].classList.remove('active')
      this.captions[this.currentCaption = nextCaption].classList.add('active')
    }
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

    this.currentCaption = 0
    this.captions = this.slides.map(this.createCaption)
    this.captions[0].classList.add('active')
    video.addEventListener('timeupdate', this.changeCaption)
    video.addEventListener('loadstart', this.removePlaceholder)

    video.appendChild(source)
    this.hero.appendChild(video)
    this.captions.forEach(caption => this.hero.appendChild(caption))
  },

  removePlaceholder () {
    const placeholder = document.querySelector('.video-hero-placeholder')
    this.hero.removeChild(placeholder)
  },

  init () {
    this.hero = document.querySelector('.video-hero')
    if (!this.hero) return
    this.slides = JSON.parse(this.hero.getAttribute('data-slides'))

    isAutoplaySupported(supported => {
      if (supported)
        this.initVideo()
      else
        this.initCarousel()
    })
  },
}

videoHero.createSlide       = videoHero.createSlide.bind(videoHero)
videoHero.changeCaption     = videoHero.changeCaption.bind(videoHero)
videoHero.removePlaceholder = videoHero.removePlaceholder.bind(videoHero)
videoHero.init              = videoHero.init.bind(videoHero)

export default videoHero
