import * as Utils from './public-utils'

function hideFooter() {
  const endFooter = document.querySelector('.end-footer')
  const afterFooter = document.querySelector('.after-footer')
  const bodyWrap = document.querySelector('.body-wrap')
  const articleToc = document.querySelector('.article-toc')
  const browserCover = document.querySelector('.browserCover')

  endFooter && endFooter.classList.add('toggleEndFooter')
  afterFooter && afterFooter.classList.add('toggleAfterFooter')
  bodyWrap && bodyWrap.classList.add('toggleWrap')
  articleToc && articleToc.classList.add('toggleArticleToc')
  browserCover && browserCover.classList.add('toggleBrowserCover')
}

function showFooter() {
  const endFooter = document.querySelector('.end-footer')
  const afterFooter = document.querySelector('.after-footer')
  const bodyWrap = document.querySelector('.body-wrap')
  const articleToc = document.querySelector('.article-toc')
  const browserCover = document.querySelector('.browserCover')

  endFooter && endFooter.classList.remove('toggleEndFooter')
  afterFooter && afterFooter.classList.remove('toggleAfterFooter')
  bodyWrap && bodyWrap.classList.remove('toggleWrap')
  articleToc && articleToc.classList.remove('toggleArticleToc')
  browserCover && browserCover.classList.remove('toggleBrowserCover')
}

function init() {
  const authorName = document.querySelector('.authorName')
  const menuList = document.querySelector('.menuList')
  const changeFooter = document.querySelector('.changeFooter')

  if (document.body.clientWidth > 800) {
    authorName.addEventListener('click', () => {
      menuList.classList.toggle('showMenu')
    })

    changeFooter.addEventListener('click', () => {
      if (Utils.getSSG('hideFooter')) {
        Utils.removeSSG('hideFooter')
      } else {
        Utils.setSSG('hideFooter', true)
      }
      if (Utils.getSSG('hideFooter')) {
        hideFooter()
      } else {
        showFooter()
      }
    })
  }
}

module.exports = {
  init: init,
  hideFooter,
  showFooter
}