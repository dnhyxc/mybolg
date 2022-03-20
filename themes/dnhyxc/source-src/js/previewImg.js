function init() {
  const articleEntry = document.querySelector('.article-entry')
  const previewImage = document.querySelector('.previewImage')
  const imgContainer = document.querySelector('.imgContainer')
  const left = document.querySelector('.left')
  const right = document.querySelector('.right')
  const fangda = document.querySelector('.fangda')
  const suoxiao = document.querySelector('.suoxiao')
  const xuanzhuan = document.querySelector('.xuanzhuan')
  const info = document.querySelector('.info')
  const imgs = articleEntry.querySelectorAll('img')

  if (imgs.length > 1) {
    left.style.display = 'block'
    right.style.display = 'block'
  }

  function getImg() {
    return imgContainer.querySelector('img')
  }

  let currentIndex = 0

  imgs.forEach((i, index) => {
    i.onclick = () => {
      currentIndex = index
      const img = getImg()
      if (img) {
        imgContainer.removeChild(img)
      }
      const clonedNode = i.cloneNode(true); // 克隆节点
      imgContainer.appendChild(clonedNode)
      previewImage.style.display = 'block'
    }

    if (right && left) {
      right.onclick = function () {
        info.style.display = 'none'

        const img = getImg()
        if (img) {
          imgContainer.removeChild(img)
        }

        currentIndex += 1

        if (currentIndex === imgs.length) {
          currentIndex = 0
        }

        const res = imgs[currentIndex].cloneNode(true)
        imgContainer.appendChild(res)
      }

      left.onclick = function () {
        info.style.display = 'none'

        const img = getImg()
        if (img) {
          imgContainer.removeChild(img)
        }

        if (currentIndex === 0) {
          currentIndex = imgs.length
        }

        if (currentIndex > 0) {
          currentIndex -= 1
        }

        const res = imgs[currentIndex].cloneNode(true)
        imgContainer.appendChild(res)
      }
    }
  })

  previewImage.onclick = (e) => {
    if (e.target.id === 'img_container') {
      previewImage.style.display = 'none'
    }
  }

  document.onkeydown = (e) => {
    if (e.keyCode == 27) {
      previewImage.style.display = 'none'
    }
  }

  fangda.onclick = () => {
    const img = getImg()
    const maxWidth = 1080 * 5; // 放大的极限值
    if (img.width < maxWidth) {
      img.width = img.width * 1.2;
      info.style.display = 'none'
    } else {
      info.style.display = 'block'
      info.innerHTML = '已经最大了...'
    }
  }

  suoxiao.onclick = () => {
    const img = getImg()
    const minWidth = 100
    if (img.width > minWidth) {
      img.width = img.width * 0.8
      info.style.display = 'none'
    } else {
      info.style.display = 'block'
      info.innerHTML = '不能再缩了...'
    }
  }

  let current = 0
  xuanzhuan.onclick = () => {
    const img = getImg()
    current = (current + 90) % 360
    img.style.transform = `rotate(${current}deg)`
  }
}

module.exports = {
  init
}