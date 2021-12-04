import * as Utils from "./public-utils";

function init() {
  const article = document.querySelector(".article");
  const articleInner = article && article.querySelector(".article-inner");
  if (Utils.isHome || Utils.isPage) {
    article && article.classList.add("hasImage");
    articleInner && articleInner.classList.add("hasImage-inner");
  } else {
    article && article.classList.remove("hasImage");
    articleInner && articleInner.classList.remove("hasImage-inner");
  }
}

module.exports = {
  init,
};
