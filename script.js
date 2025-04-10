import { SlideNav } from './slide.js';

const slide = new SlideNav('.slide', '.slide-wrapper');
slide.init();

slide.addArrow('.prev', '.next');

const menuImg = document.querySelector('.menu img');
const menuText = document.querySelector('.produto');

const mais = document.querySelector('.mais');
// const next = document.querySelectorAll('.next');
// const prev = document.querySelectorAll('.prev');
// const cloths = document.querySelectorAll('.clothes')

function showMenu() {
  const openMenu = document.querySelector('.produtos');
  openMenu.classList.toggle('showMenu');
}

function mostrarMais() {
  this.previousElementSibling.classList.toggle('active');
  if (this.previousElementSibling.classList.contains('active')) {
    this.innerHTML = '<p>Mostrar menos...</p>';
  } else {
    this.innerHTML = '<p>Mostrar mais...</p>';
  }
}

mais.addEventListener('click', mostrarMais);

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

menuImg.addEventListener('click', showMenu);
menuText.addEventListener('click', function () {
  const openMenu = document.querySelector('.produtos');
  this.classList.toggle('active');
  openMenu.classList.toggle('showMenu');
});

// next.forEach((i)=> {
//   i.addEventListener('click', moveRight)
// })

// prev.forEach((i)=> {
//   i.addEventListener('click', moveLeft)
// })
