// HEADER SLIDER
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
  speed: 700,

  autoplay: {
    delay: 7000,
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

// MENU & BAR
const hbar = document.querySelector('.header__bar')
const hbarMenuBtn = document.querySelector('.hbar__menubtn')
const hmenuLinkFirst = document.querySelector('.hmenu__link')
const mainMenu = document.querySelector('.menu')
const headerMenu = document.querySelector('.header__menu')

function showMinimalHbar() {
  hbar.classList.add('scrolled')
}
function hideMinimalHbar() {
  hbar.classList.remove('scrolled')
}

function showMainMenu() {
  hmenuLinkFirst.classList.add('active')
  hbar.classList.add('light')
  headerMenu.classList.add('light')
  mainMenu.classList.add('opened')
}
function hideMainMenu() {
  hmenuLinkFirst.classList.remove('active')
  hbar.classList.remove('light')
  headerMenu.classList.remove('light')
  mainMenu.classList.remove('opened')
  mainMenu.classList.remove('scrolled')
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    showMinimalHbar()
    hideMainMenu()
    headerMenu.classList.remove('scrolled')
    hbarMenuBtn.classList.remove('active')
  } else {
    hideMinimalHbar()
  }
})
hmenuLinkFirst.addEventListener('click', (event) => {
  event.preventDefault()
  if (
    hmenuLinkFirst.classList.contains('active') &&
    hbarMenuBtn.classList.contains('active')
  ) {
    hideMainMenu()
    hbarMenuBtn.classList.remove('active')
    headerMenu.classList.remove('scrolled', 'light')
  } else if (hmenuLinkFirst.classList.contains('active')) {
    hideMainMenu()
  } else {
    showMainMenu()
  }
})
hbarMenuBtn.addEventListener('click', () => {
  hbarMenuBtn.classList.toggle('active')
  if (hbarMenuBtn.classList.contains('active')) {
    headerMenu.classList.add('scrolled', 'light')
    mainMenu.classList.add('scrolled')
    hmenuLinkFirst.classList.add('active')
    mainMenu.classList.add('opened')
  } else {
    headerMenu.classList.remove('scrolled', 'light')
    mainMenu.classList.remove('scrolled')
    hmenuLinkFirst.classList.remove('active')
    mainMenu.classList.remove('opened')
  }
})
