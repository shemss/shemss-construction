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
      image.addEventListener('load', this.removeVideo)
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

  playVideo () {
    try {
      const promise = this.video.play()
      if (promise)
        promise.then(this.initCaptions)
        .catch(this.initCarousel)
    } catch (e) {
      this.initCarousel()
    }
  },

  initCaptions () {
    this.currentCaption = 0
    this.captions = this.slides.map(this.createCaption)
    this.captions[0].classList.add('active')
    this.captions.forEach(caption => this.hero.appendChild(caption))
    this.video.addEventListener('timeupdate', this.changeCaption)
  },

  initVideo () {
    const source  = document.createElement('source')
    this.video    = document.createElement('video')

    this.video.className = 'img-fluid'
    this.video.setAttribute('loop', '')
    this.video.setAttribute('muted', '')
    this.video.setAttribute('autoplay', '')
    this.video.setAttribute('playsinline', '')

    source.setAttribute('type', 'video/mp4')
    source.setAttribute('src', this.hero.getAttribute('data-video'))

    this.video.addEventListener('loadstart', this.removePlaceholder)
    this.video.addEventListener('canplay', this.playVideo)

    this.video.appendChild(source)
    this.hero.appendChild(this.video)
  },

  removePlaceholder () {
    const placeholder = document.querySelector('.video-hero-placeholder')
    this.hero.removeChild(placeholder)
  },

  removeVideo () {
    this.hero.removeChild(this.video)
  },

  init () {
    this.hero = document.querySelector('.video-hero')
    if (!this.hero) return
    this.slides = JSON.parse(this.hero.getAttribute('data-slides'))
    this.initVideo()
  },
}

videoHero.createSlide       = videoHero.createSlide.bind(videoHero)
videoHero.changeCaption     = videoHero.changeCaption.bind(videoHero)
videoHero.playVideo         = videoHero.playVideo.bind(videoHero)
videoHero.removePlaceholder = videoHero.removePlaceholder.bind(videoHero)
videoHero.removeVideo       = videoHero.removeVideo.bind(videoHero)
videoHero.initCarousel      = videoHero.initCarousel.bind(videoHero)
videoHero.initCaptions      = videoHero.initCaptions.bind(videoHero)
videoHero.init              = videoHero.init.bind(videoHero)

export default videoHero
