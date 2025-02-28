const menuProduto = document.querySelectorAll('.produto');

function showMenu() {
  const openMenu = document.querySelector('.produtos')
  this.classList.toggle('active')
  openMenu.classList.toggle('showMenu')
}

menuProduto.forEach((produto) => {
  produto.addEventListener('click', showMenu);
})