function init() {
  const authorName = document.querySelector('.authorName')
  const menuList = document.querySelector('.menuList')
  const changeFooter = document.querySelector('.changeFooter')
  const endFooter = document.querySelector('.end-footer')
  const afterFooter = document.querySelector('.after-footer')
  const bodyWrap = document.querySelector('.body-wrap')
  authorName.addEventListener('click', () => {
    menuList.classList.toggle('showMenu')
  })
  changeFooter.addEventListener('click', () => {
    endFooter.classList.toggle('toggleEndFooter')
    afterFooter.classList.toggle('toggleAfterFooter')
    bodyWrap.classList.toggle('toggleWrap')
  })
}

module.exports = {
  init: init
}