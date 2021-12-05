import * as Utils from "./public-utils";

function init() {
  const article = document.querySelector(".article");
  const articleInfo = document.querySelector(".article-info");
  const articleInner = article && article.querySelector(".article-inner");
  if (Utils.isHome) {
    article && article.classList.add("hasImage");
    articleInner && articleInner.classList.add("hasImage-inner");
  } else {
    article && article.classList.remove("hasImage");
    articleInner && articleInner.classList.remove("hasImage-inner");
  }
  if (Utils.isCategories) {
    article && article.classList.add("noBorder");
  } else {
    article && article.classList.remove("noBorder");
  }
  if (Utils.isInformal) {
    article && articleInfo && articleInfo.classList.add("noBorderB");
  } else {
    article && articleInfo && articleInfo.classList.remove("noBorderB");
  }
}

module.exports = {
  init,
};
