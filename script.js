import Slide from './slide.js'

const slide = new Slide('.slide', '.slide-wrapper');
slide.init();
console.log(slide)

slide.activePrevSlide()

const menuProduto = document.querySelector('.produto');

function showMenu() {
  const openMenu = document.querySelector('.produtos')
  this.classList.toggle('active');
  openMenu.classList.toggle('showMenu');
}

menuProduto.addEventListener('click', showMenu);