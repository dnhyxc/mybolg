function init() {
  const showMenuIcon = document.querySelector('.showMenuIcon')
  const smallMenu = document.querySelector('.smallMenu')

  showMenuIcon.addEventListener('click', () => {
    smallMenu.classList.toggle('showSmallMenu')
  })
}

module.exports = {
  init
}