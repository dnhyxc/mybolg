import * as Utils from "./public-utils";

function setNarrow() {
  const article = document.querySelector(".article-entry");
  const changeSize = document.querySelector(".changeSize");
  const articleToc = document.querySelector(".article-toc");
  const headerToc = document.querySelector(".wrap-side-operation");
  const changeInfo = document.querySelector(".change-info");
  const articleAction = document.querySelector(".article-action");
  const share = document.querySelector(".share");
  const articleInfo = document.querySelector(".article-info");

  if (
    document.body.clientWidth > 800 &&
    changeSize &&
    !Utils.isHome &&
    !Utils.isPage
  ) {
    if (Utils.getSSG("hideMenu")) {
      article.classList.remove("narrow");
      article.classList.add("_narrow");
      articleAction && articleAction.classList.add("_share-narrow");
      articleAction && articleAction.classList.remove("_share-_narrow");
    } else {
      article.classList.add("narrow");
      article.classList.remove("_narrow");
      articleAction && articleAction.classList.add("_share-_narrow");
      articleAction && articleAction.classList.remove("_share-narrow");
    }
    if (share) share.style.display = "none";
    if (articleAction) articleAction.style.display = "flex";
  }

  if (!Utils.isHome && !Utils.isPage) {
    articleInfo.classList.add("artNobb");
    articleToc.style.display = "block";
    headerToc.style.display = "none";
    changeInfo.style.right = "75px";
  }
}

function removeNarrow() {
  const article = document.querySelector(".article-entry");
  const changeSize = document.querySelector(".changeSize");
  const articleToc = document.querySelector(".article-toc");
  const headerToc = document.querySelector(".wrap-side-operation");
  const changeInfo = document.querySelector(".change-info");
  const articleAction = document.querySelector(".article-action");
  const share = document.querySelector(".share");
  const articleInfo = document.querySelector(".article-info");

  if (
    document.body.clientWidth > 800 &&
    changeSize &&
    !Utils.isHome &&
    !Utils.isPage
  ) {
    article.classList.remove("narrow");
    article.classList.remove("_narrow");
    articleAction && articleAction.classList.remove("_share-narrow");
    articleAction && articleAction.classList.remove("_share-_narrow");
    if (share) share.style.display = "block";
    if (articleAction) articleAction.style.display = "none";
  }

  if (!Utils.isHome && !Utils.isPage) {
    articleInfo.classList.remove("artNobb");
    articleToc.style.display = "none";
    headerToc.style.display = "block";
    changeInfo.style.right = "123px";
  }
}

function init() {
  const changeSize = document.querySelector(".changeSize");

  changeSize.onclick = function () {
    if (document.body.clientWidth > 800 && changeSize) {
      if (!Utils.getSSG("narrow")) {
        Utils.setSSG("narrow", true);
        setNarrow();
      } else {
        Utils.removeSSG("narrow");
        removeNarrow();
      }
    }
  };
}

module.exports = {
  init,
  setNarrow,
  removeNarrow,
};
