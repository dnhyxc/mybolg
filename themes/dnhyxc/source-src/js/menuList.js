function init() {
  const authorName = document.querySelector('.authorName')
  const menuList = document.querySelector('.menuList')
  const changeFooter = document.querySelector('.changeFooter')
  const endFooter = document.querySelector('.end-footer')
  const afterFooter = document.querySelector('.after-footer')
  const bodyWrap = document.querySelector('.body-wrap')
  const articleToc = document.querySelector('.article-toc')
  const browserCover = document.querySelector('.browserCover')
  authorName.addEventListener('click', () => {
    menuList.classList.toggle('showMenu')
  })
  changeFooter.addEventListener('click', () => {
    endFooter.classList.toggle('toggleEndFooter')
    afterFooter.classList.toggle('toggleAfterFooter')
    bodyWrap.classList.toggle('toggleWrap')
    articleToc.classList.toggle('toggleArticleToc')
    browserCover.classList.toggle('toggleBrowserCover')
  })
}

module.exports = {
  init: init
}