// import Slide from './slide.js'

// const slide = new Slide('.slide', '.slide-wrapper');
// slide.init();
// console.log(slide)

// slide.activePrevSlide()

const menuProduto = document.querySelector('.produto');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const cloths = document.querySelector('.clothes')


function showMenu() {
  const openMenu = document.querySelector('.produtos')
  this.classList.toggle('active');
  openMenu.classList.toggle('showMenu');
}

function moveRight() {
  prev.style.transform = 'translate3d(300px, 0, 0)'
  this.style.transform = 'translate3d(300px, 0, 0)'
  cloths.style.transform = 'translate3d(-300px, 0, 0)'

}

function moveLeft() {
  next.style.transform = 'translate3d(0, 0, 0)'
  this.style.transform = 'translate3d(0, 0, 0)'
  cloths.style.transform = 'translate3d(0, 0, 0)'
}


menuProduto.addEventListener('click', showMenu);
next.addEventListener('click', moveRight);
prev.addEventListener('click', moveLeft);