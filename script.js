import {SlideNav} from './slide.js'

const slide = new SlideNav('.slide', '.slide-wrapper');
slide.init();

slide.addArrow('.prev','.next')

const menuProduto = document.querySelector('.produto');
// const next = document.querySelectorAll('.next');
// const prev = document.querySelectorAll('.prev');
// const cloths = document.querySelectorAll('.clothes')


function showMenu() {
  const openMenu = document.querySelector('.produtos')
  this.classList.toggle('active');
  openMenu.classList.toggle('showMenu');
}

// function moveRight() {
//   prev.style.transform = 'translate3d(300px, 0, 0)'
//   this.style.transform = 'translate3d(300px, 0, 0)'
//   cloths.style.transform = 'translate3d(-300px, 0, 0)'

// }

// function moveLeft() {
//   next.style.transform = 'translate3d(0, 0, 0)'
//   this.style.transform = 'translate3d(0, 0, 0)'
//   cloths.style.transform = 'translate3d(0, 0, 0)'
// }


menuProduto.addEventListener('click', showMenu);
// next.forEach((i)=> {
//   i.addEventListener('click', moveRight)
// })

// prev.forEach((i)=> {
//   i.addEventListener('click', moveLeft)
// })