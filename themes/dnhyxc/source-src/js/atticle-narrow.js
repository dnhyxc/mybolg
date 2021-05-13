function init() {
  const article = document.querySelector('.article-entry');
  const changeSize = document.querySelector('.changeSize');
  changeSize.onclick = function () {
    if (document.body.clientWidth > 800 && changeSize) {
      article.classList.toggle('narrow');
    }
  }
}

module.exports = {
  init: init
}