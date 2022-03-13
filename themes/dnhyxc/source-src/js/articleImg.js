function init() {
  const articleEntry = document.querySelector('.article-entry')
  const imgs = articleEntry.querySelectorAll('img')

  const body = document.body
  const wrap = document.createElement('div')
  wrap.className = 'imgWrap'
  wrap.id = 'img_container'

  const left = document.createElement('span')
  const right = document.createElement('span')

  if (imgs.length > 1) {
    left.id = 'upPage'
    left.innerHTML = '上一张'
    right.id = 'nextPage'
    right.innerHTML = '下一张'
    wrap.appendChild(left)
    wrap.appendChild(right)
  }

  let currentIndex = 0

  imgs.forEach((i, index) => {
    i.onclick = () => {
      currentIndex = index
      const img = wrap.querySelector('img')
      if (img) {
        wrap.removeChild(img)
      }
      const clonedNode = i.cloneNode(true); // 克隆节点
      wrap.appendChild(clonedNode)
      body.appendChild(wrap)
      wrap.style.display = 'block'
    }

    if (right && left) {
      right.onclick = function () {
        const img = wrap.querySelector('img')
        if (img) {
          wrap.removeChild(img)
        }

        currentIndex += 1

        if (currentIndex === imgs.length) {
          currentIndex = 0
        }

        const res = imgs[currentIndex].cloneNode(true)
        wrap.appendChild(res)
      }

      left.onclick = function () {
        const img = wrap.querySelector('img')
        if (img) {
          wrap.removeChild(img)
        }

        if (currentIndex === 0) {
          currentIndex = imgs.length
        }

        if (currentIndex > 0) {
          currentIndex -= 1
        }

        const res = imgs[currentIndex].cloneNode(true)
        wrap.appendChild(res)
      }
    }
  })

  wrap.onclick = (e) => {
    if (e.target.id === 'img_container') {
      wrap.style.display = 'none'
    }
  }

  document.onkeydown = (e) => {
    if (e.keyCode == 27) {
      wrap.style.display = 'none'
    }
  }
}

module.exports = {
  init
}