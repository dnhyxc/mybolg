// function init() {
//   let path = location.pathname;
//   let leftCol = document.querySelector('.left-col');
//   let homeIcon = document.querySelector('#home-icon');
//   let tipsBox = document.querySelector('.tips-box');
//   let tipsAs = tipsBox.querySelectorAll('.tips-a');
//   let wrapper = document.querySelector('#wrapper');
//   let changeSize = document.querySelector('.changeSize');
//   let mainLoading = document.querySelector('.main-loading');
//   let scrollTop = document.querySelector('#scrollTop');
//   let bodyScroll = document.body;
//   let coverInfo = document.querySelectorAll('.coverInfo');
//   let aplayer = document.querySelector('.aplayer');
//   let articleToc = document.querySelector('.article-toc');

//   homeIcon.onclick = function (e) {
//     e.stopPropagation();
//     if (tipsBox.classList.value === 'tips-box') {
//       tipsBox.classList.add("tip-show");
//       aplayer.style.opacity = 0;
//       aplayer.style.transition = 'all 0.3s ease';
//     } else {
//       tipsBox.classList.remove("tip-show");
//       aplayer.style.opacity = 1;
//       aplayer.style.transition = 'all 0.3s ease';
//     }
//   }
//   homeIcon.onmouseover = function (e) {
//     tipsBox.classList.add("tip-show");
//     aplayer.style.opacity = 0;
//     aplayer.style.transition = 'all 0.3s ease';
//   }
//   leftCol.onclick = function (e) {
//     tipsBox.classList.remove("tip-show");
//     aplayer.style.opacity = 1;
//     aplayer.style.transition = 'all 0.3s ease';
//   }
//   tipsAs.forEach(i => {
//     i.onclick = function () {
//       tipsBox.classList.remove("tip-show");
//       aplayer.style.opacity = 1;
//       aplayer.style.transition = 'all 0.3s ease';
//     }
//   })

//   scrollTop.onclick = function () {
//     const clock = setInterval(function () {
//       if (wrapper.scrollTop !== 0) {
//         wrapper.scrollTop -= Math.fround(wrapper.scrollTop / 10);
//       } else {
//         clearInterval(clock);
//       }
//     }, 10);
//   }

//   window.onresize = function () {
//     if (bodyScroll.clientWidth <= 800) {
//       scrollTop.style.display = 'none';
//     }
//   };

//   let timer = null;
//   let count = document.createElement('span');
//   count.className = 'scroll-count';
//   wrapper.onscroll = function () {
//     count.innerHTML = `${parseInt((wrapper.scrollTop / (wrapper.scrollHeight - wrapper.offsetHeight) * 100))}%`;
//     scrollTop.appendChild(count);
//     if (bodyScroll.clientWidth <= 800) {
//       scrollTop.style.display = 'none';
//     } else {
//       if (wrapper.scrollTop === 0) {
//         scrollTop.style.display = 'none';
//         clearTimeout(timer);
//       } else if (wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight) {
//         scrollTop.style.display = 'block';
//         clearTimeout(timer);
//       } else {
//         scrollTop.style.display = 'block';
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//           scrollTop.style.display = 'none';
//         }, 2000);
//       }
//     }
//     if (wrapper.scrollTop <= 0) {
//       articleToc.style.height = 'calc(100vh - 246px)';
//     } else {
//       articleToc.style.height = 'calc(100vh - 178px)';
//     }
//   };

//   scrollTop.onmouseenter = function () {
//     clearTimeout(timer);
//     scrollTop.style.display = 'block';
//   }

//   scrollTop.onmouseleave = function () {
//     if (wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight) {
//       clearTimeout(timer);
//       scrollTop.style.display = 'block';
//     } else {
//       timer = setTimeout(() => {
//         scrollTop.style.display = 'none';
//       }, 2000);
//     }
//   }

//   if (decodeURIComponent(path)) {
//     // main.innerHTML = 'Informal Essay';
//     if (path !== '/') {
//       const reg = /\d/;
//       const isArticle = reg.test(decodeURIComponent(path).substr('/'));
//       const res = decodeURIComponent(path).substr(decodeURIComponent(path).lastIndexOf('/', decodeURIComponent(path).lastIndexOf('/') - 1) + 1);
//       const subPath = res.slice(0, res.length - 1);
//       if (subPath === 'informal') {
//         changeSize.style.display = 'block';
//         mainLoading.innerHTML = 'Informal Essay';
//       } else if (isArticle) {
//         changeSize.style.display = 'block';
//         mainLoading.innerHTML = 'Article-' + subPath[0].toUpperCase() + subPath.slice(1);
//       } else {
//         mainLoading.innerHTML = subPath[0].toUpperCase() + subPath.slice(1);
//       }
//       if (coverInfo && coverInfo.length > 0) {
//         coverInfo[0].style.display = 'none';
//         coverInfo[1].style.display = 'none';
//       }
//     } else {
//       mainLoading.innerHTML = 'HOME'
//     }
//   }
// }

// module.exports = {
//   init: init
// }

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
  let articleToc = document.querySelector('.article-toc');
  let articleEntry = document.querySelector('.article-entry');
  let articleTocA = articleToc.querySelectorAll('a');
  let h345 = articleEntry.querySelectorAll('h3,h4,h5');

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

  function getText(path) {
    const pathIndex = decodeURIComponent(path).lastIndexOf("\/");
    const href = decodeURIComponent(path).substring(pathIndex + 1, decodeURIComponent(path).length);
    return href;
  }

  function debounce(fn, wait) {
    let timer = null;
    return function () {
      let arg = arguments;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        fn.apply(this, arg);
      }, wait);
    };
  }

  const toTopId = [];

  function scroll() {
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

    if (wrapper.scrollTop <= 0) {
      articleToc.style.height = 'calc(100vh - 246px)';
    } else {
      articleToc.style.height = 'calc(100vh - 178px)';
    }

    h345.forEach(i => {
      if (wrapper.scrollTop >= i.offsetTop) {
        if (toTopId.length <= 0) {
          toTopId.push(i.id);
        } else {
          toTopId.splice(0, 1, i.id);
        }
      }
    });

    const res = Array.from(articleTocA).filter(i => getText(i.href).includes(toTopId[0]));
    articleTocA.forEach(i => {
      i.style.color = '#ccc';
    })

    if (res.length > 0) {
      res[0].style.color = 'gold';
      articleToc.scrollTop = res[0] && res[0].offsetTop - (wrapper.clientHeight / 2);
    }
  };

  wrapper.addEventListener('scroll', debounce(scroll, 0));

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