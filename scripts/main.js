const headerSliderBlock = document.querySelector('.hslider')

const items = [
  'Косметология: уходы, инъекции, лифтинг',
  'Коррекция фигуры и силуэта',
  'SPA и европейские массажи',
  'Велнес-программы и флоатация',
  'Beauty-услуги: волосы, ногти, макияж',
  'Тайские и балийские массажи',
]

const sources = [
  './assets/images/header/slide_1_min.png',
  './assets/images/header/slide_2_min.png',
  './assets/images/header/slide_3_min.png',
  './assets/images/header/slide_3_min.png',
  './assets/images/header/slide_3_min.png',
  './assets/images/header/slide_3_min.png',
]

const updateScrollbar = (swiper) => {
  const bars = document.querySelectorAll('.hslider__scrollbar .bar')
  const fills = document.querySelectorAll('.hslider__scrollbar .bar .fill')
  const current = swiper.realIndex

  bars.forEach((bar, i) => {
    bar.classList.remove('active')
    bar.style.width = i === current ? '260px' : '145px'
  })

  if (bars[current]) {
    bars[current].classList.add('active')
  }

  fills.forEach((fill, i) => {
    fill.style.transition = 'none'
    fill.style.width = i < current ? '100%' : '0%'
  })

  const activeFill = fills[current]
  if (activeFill) {
    activeFill.style.width = '0%'
    activeFill.offsetHeight
    activeFill.style.transition = `width ${swiper.params.autoplay.delay}ms linear`
    activeFill.style.width = '100%'
  }
}

let headerSlider = new Swiper(headerSliderBlock, {
  slidesPerView: 1,
  centeredSlides: false,
  grabCursor: false,
  loop: true,

  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.hslider__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return `
        <div class="${className}">
          <span>${index + 1}</span>
          <p>${items[index]}</p>
          <img src="${sources[index]}" alt="Мини иллюстрация" loading="lazy">
        </div>
      `
    },
  },

  on: {
    init: function () {
      const scrollbar = document.querySelector('.hslider__scrollbar')

      scrollbar.innerHTML = items
        .map(() => `<span class="bar"><span class="fill"></span></span>`)
        .join('')

      updateScrollbar(this)
    },

    slideChange: function () {
      updateScrollbar(this)
    },
  },
})

const hbar = document.querySelector('.header__bar')
const hbarMenuBtn = document.querySelector('.hbar__menubtn')
const hmenuLinkFirst = document.querySelector('.hmenu__link')
const mainMenu = document.querySelector('.menu')
const headerMenu = document.querySelector('.header__menu')

window.addEventListener('scroll', () => {
  if (window.scrollY > 66) {
    hbar.classList.add('scrolled')
  } else {
    hbar.classList.remove('scrolled')
    // headerMenu.classList.add('scrolled')
    // mainMenu.classList.add('scrolled')
    mainMenu.style.height = '0'
    hbar.classList.remove('light')
    hmenuLinkFirst.classList.remove('active')
  }
})
hbarMenuBtn.addEventListener('click', () => {
  hbarMenuBtn.classList.toggle('active')
})
hmenuLinkFirst.addEventListener('click', (event) => {
  event.preventDefault()
  hmenuLinkFirst.classList.toggle('active')
  if (hmenuLinkFirst.classList.contains('active')) {
    hbar.classList.add('light')
    mainMenu.style.height = '392px'
  } else {
    mainMenu.style.height = '0'
    hbar.classList.remove('light')
  }
})
