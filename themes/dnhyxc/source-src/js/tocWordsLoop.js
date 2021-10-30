import { setTimeInLoop } from "./public-utils";

const init = () => {
  const tocLinks = document.querySelectorAll('.toc-link')

  const links = []
  tocLinks && tocLinks.length && tocLinks.forEach(i => {
    const tocText = i.querySelector('.toc-text')
    const tocNumber = i.querySelector('.toc-number')
    if (tocText.offsetWidth + tocNumber.offsetWidth > i.offsetWidth) {
      links.push(i)
    }
  })

  setTimeInLoop.call(links, (item => {
    item.classList.add('toc-scroll')
  }), 500)
}

module.exports = {
  init
}