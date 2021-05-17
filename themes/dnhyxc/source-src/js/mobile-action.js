function init() {
  const tocArticle = document.querySelector('.toc-article');
  const btnctnname = document.querySelector('.btnctn-name');
  let coverInfo = document.querySelectorAll('.coverInfo');

  let initialClientY;

  tocArticle && tocArticle.addEventListener('touchstart', function (e) {
    initialClientY = e.targetTouches[0].clientY;
  })

  tocArticle && tocArticle.addEventListener('touchmove', function (event) {
    const clientY = event.targetTouches[0].clientY - initialClientY;
    if (tocArticle && tocArticle.scrollTop === 0 && clientY > 0 && event.cancelable) {
      return event.preventDefault();
    }
    if (tocArticle && (tocArticle.scrollHeight - 1 - tocArticle.scrollTop <= tocArticle.clientHeight) && clientY < 0 && event.cancelable) {
      return event.preventDefault();
    }
    event.stopPropagation()
    return true
  })

  let path = location.pathname;
  if (decodeURIComponent(path)) {
    const reg = /\d/;
    const isArticle = reg.test(decodeURIComponent(path).substr('/'));
    if (path !== '/') {
      const res = decodeURIComponent(path).substr(decodeURIComponent(path).lastIndexOf('/', decodeURIComponent(path).lastIndexOf('/') - 1) + 1);
      const subPath = res.slice(0, res.length - 1);
      if (subPath === 'informal') {
        btnctnname.innerHTML = 'Informal Essay';
      } else if (isArticle) {
        btnctnname.innerHTML = 'Article-' + subPath[0].toUpperCase() + subPath.slice(1);
      } else {
        btnctnname.innerHTML = subPath[0].toUpperCase() + subPath.slice(1);
      }
      if (document.body.clientWidth >= 800 && coverInfo && coverInfo.length > 0) {
        coverInfo[0].style.display = 'none';
        coverInfo[1].style.display = 'none';
      }
    } else {
      btnctnname.innerHTML = 'HOME'
    }
  }
}

module.exports = {
  init: init
}