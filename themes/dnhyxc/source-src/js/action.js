function init() {
  let path = location.pathname;
  let leftCol = document.querySelector('.left-col');
  let homeIcon = document.querySelector('#home-icon');
  let tipsBox = document.querySelector('.tips-box');
  let tipsAs = tipsBox.querySelectorAll('.tips-a');
  let wrapper = document.querySelector('#wrapper');
  let changeSize = document.querySelector('.changeSize');
  let mainLoading = document.querySelector('.main-loading');
  let scrollTop = document.querySelector('#scrollTop');
  let bodyScroll = document.body;
  let coverInfo = document.querySelectorAll('.coverInfo');
  let aplayer = document.querySelector('.aplayer');

  homeIcon.onclick = function (e) {
    e.stopPropagation();
    if (tipsBox.classList.value === 'tips-box') {
      tipsBox.classList.add("tip-show");
      aplayer.style.opacity = 0;
      aplayer.style.transition = 'all 0.3s ease';
    } else {
      tipsBox.classList.remove("tip-show");
      aplayer.style.opacity = 1;
      aplayer.style.transition = 'all 0.3s ease';
    }
  }
  homeIcon.onmouseover = function (e) {
    tipsBox.classList.add("tip-show");
    aplayer.style.opacity = 0;
    aplayer.style.transition = 'all 0.3s ease';
  }
  leftCol.onclick = function (e) {
    tipsBox.classList.remove("tip-show");
    aplayer.style.opacity = 1;
    aplayer.style.transition = 'all 0.3s ease';
  }
  tipsAs.forEach(i => {
    i.onclick = function () {
      tipsBox.classList.remove("tip-show");
      aplayer.style.opacity = 1;
      aplayer.style.transition = 'all 0.3s ease';
    }
  })

  scrollTop.onclick = function () {
    const clock = setInterval(function () {
      if (wrapper.scrollTop !== 0) {
        wrapper.scrollTop -= Math.fround(wrapper.scrollTop / 10);
      } else {
        clearInterval(clock);
      }
    }, 10);
  }

  window.onresize = function () {
    if (bodyScroll.clientWidth <= 800) {
      scrollTop.style.display = 'none';
    }
  };

  let timer = null;
  let count = document.createElement('span');
  count.className = 'scroll-count';
  wrapper.onscroll = function () {
    count.innerHTML = `${parseInt((wrapper.scrollTop / (wrapper.scrollHeight - wrapper.offsetHeight) * 100))}%`;
    scrollTop.appendChild(count);
    if (bodyScroll.clientWidth <= 800) {
      scrollTop.style.display = 'none';
    } else {
      if (wrapper.scrollTop === 0) {
        scrollTop.style.display = 'none';
        clearTimeout(timer);
      } else if (wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight) {
        scrollTop.style.display = 'block';
        clearTimeout(timer);
      } else {
        scrollTop.style.display = 'block';
        clearTimeout(timer);
        timer = setTimeout(() => {
          scrollTop.style.display = 'none';
        }, 2000);
      }
    }
  };

  scrollTop.onmouseenter = function () {
    clearTimeout(timer);
    scrollTop.style.display = 'block';
  }

  scrollTop.onmouseleave = function () {
    if (wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight) {
      clearTimeout(timer);
      scrollTop.style.display = 'block';
    } else {
      timer = setTimeout(() => {
        scrollTop.style.display = 'none';
      }, 2000);
    }
  }

  if (decodeURIComponent(path)) {
    // main.innerHTML = 'Informal Essay';
    if (path !== '/') {
      const reg = /\d/;
      const isArticle = reg.test(decodeURIComponent(path).substr('/'));
      const res = decodeURIComponent(path).substr(decodeURIComponent(path).lastIndexOf('/', decodeURIComponent(path).lastIndexOf('/') - 1) + 1);
      const subPath = res.slice(0, res.length - 1);
      if (subPath === 'informal') {
        changeSize.style.display = 'block';
        mainLoading.innerHTML = 'Informal Essay';
      } else if (isArticle) {
        changeSize.style.display = 'block';
        mainLoading.innerHTML = 'Article-' + subPath[0].toUpperCase() + subPath.slice(1);
      } else {
        mainLoading.innerHTML = subPath[0].toUpperCase() + subPath.slice(1);
      }
      if (coverInfo && coverInfo.length > 0) {
        coverInfo[0].style.display = 'none';
        coverInfo[1].style.display = 'none';
      }
    } else {
      mainLoading.innerHTML = 'HOME'
    }
  }
}

module.exports = {
  init: init
}