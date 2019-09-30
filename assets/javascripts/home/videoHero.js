const videoHero = {
  createCaption (slideData) {
    const caption = document.createElement('div')
    caption.className = 'carousel-caption text-left'
    caption.insertAdjacentHTML('beforeend', slideData.caption)
    return caption
  },

  createSlide (slideData, index) {
    const slide   = document.createElement('div')
    const image   = document.createElement('img')
    const caption = this.createCaption(slideData)

    image.setAttribute('src', slideData.image)
    image.className = 'video-hero-inner'
    slide.className = 'carousel-item h-100'

    if (!index)
      slide.className += ' active'

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
    carousel.className = 'carousel slide carousel-fade h-100'
    carousel.setAttribute('id', 'video-fallback-carousel')
    carouselInner.className = 'carousel-inner h-100'

    slides.forEach(slide => carouselInner.appendChild(slide))
    indicators.forEach(indicator => indicatorsL.appendChild(indicator))
    carousel.appendChild(indicatorsL)
    carousel.appendChild(carouselInner)
    this.hero.appendChild(carousel)

    $(carousel).carousel()
    this.removeVideo()
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

  playVideo (e) {
    this.video.removeEventListener('canplay', this.playVideo)
    setTimeout(() =>
      e.target.currentTime ? this.initCaptions() : this.initCarousel()
    , 250)
  },

  initCaptions () {
    this.currentCaption = 0
    this.captions = this.slides.map(this.createCaption)
    this.captions[0].classList.add('active')
    this.captions.forEach(caption => this.hero.appendChild(caption))
    this.video.addEventListener('timeupdate', this.changeCaption)
  },

  initVideo () {
    this.hero.insertAdjacentHTML('afterbegin', `
      <video class="video-hero-inner" loop muted playsinline autoplay>
        <source src="${this.hero.getAttribute('data-video')}" type="video/mp4">
      </video>
    `)
    this.video = this.hero.querySelector('video')

    this.video.addEventListener('canplay', this.playVideo)
  },

  removeVideo () {
    this.hero.removeChild(this.video)
    this.video = null
  },

  init () {
    this.hero = document.querySelector('.video-hero')
    if (!this.hero) return
    this.slides = JSON.parse(this.hero.getAttribute('data-slides'))
    this.initVideo()
  },
}

videoHero.createSlide   = videoHero.createSlide.bind(videoHero)
videoHero.changeCaption = videoHero.changeCaption.bind(videoHero)
videoHero.playVideo     = videoHero.playVideo.bind(videoHero)
videoHero.removeVideo   = videoHero.removeVideo.bind(videoHero)
videoHero.initCarousel  = videoHero.initCarousel.bind(videoHero)
videoHero.initCaptions  = videoHero.initCaptions.bind(videoHero)
videoHero.init          = videoHero.init.bind(videoHero)

export default videoHero
