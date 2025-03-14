const menuProduto = document.querySelector('.produto');

function showMenu() {
  const openMenu = document.querySelector('.produtos')
  this.classList.toggle('active');
  openMenu.classList.toggle('showMenu');
}

menuProduto.addEventListener('click', showMenu);