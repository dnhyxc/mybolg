import { setTimeInLoop } from "./public-utils";

const init = () => {
  const tocLinks = document.querySelectorAll('.toc-link')
  const tooltipLeft = document.querySelector('.tooltip-left')

  if (document.body.clientWidth > 800 && tooltipLeft) {
    const links = []

    tooltipLeft.onmouseenter = () => {
      tocLinks && tocLinks.length && tocLinks.forEach(i => {
        const tocText = i.querySelector('.toc-text')
        const tocNumber = i.querySelector('.toc-number')
        if (tocText.offsetWidth + tocNumber.offsetWidth > i.offsetWidth) {
          links.push(i)
        }
      })

      if (links.length > 0) {
        setTimeInLoop.call(links, (item => {
          item.classList.add('toc-scroll')
        }), 500)
      }
    }

    tooltipLeft.onmouseleave = () => {
      if (links.length > 0) {
        links.forEach(i => {
          i.classList.remove('toc-scroll')
        })
      }
    }
  }
}

module.exports = {
  init
}