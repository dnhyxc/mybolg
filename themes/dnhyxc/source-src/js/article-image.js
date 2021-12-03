import * as Utils from "./public-utils";

function init() {
  const article = document.querySelector('.article');
  const articleInner = article.querySelector('.article-inner')
  if (Utils.isHome || Utils.isPage) {
    article.classList.add('hasImage')
    articleInner.classList.add('hasImage-inner')
  } else {
    article.classList.remove('hasImage')
    articleInner.classList.remove('hasImage-inner')
  }
}

module.exports = {
  init
}