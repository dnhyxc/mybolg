import * as Utils from "./public-utils";

function setNarrow() {
  const article = document.querySelector(".article-entry");
  const changeSize = document.querySelector(".changeSize");
  const articleToc = document.querySelector(".article-toc");
  const headerToc = document.querySelector(".wrap-side-operation");
  const changeInfo = document.querySelector(".change-info");

  if (document.body.clientWidth > 800 && changeSize) {
    if (Utils.getSSG("hideMenu")) {
      article.classList.remove("narrow");
      article.classList.add("_narrow");
    } else {
      article.classList.add("narrow");
      article.classList.remove("_narrow");
    }
  }

  articleToc.style.display = "block";
  headerToc.style.display = "none";
  changeInfo.style.right = "75px";
}

function removeNarrow() {
  const article = document.querySelector(".article-entry");
  const changeSize = document.querySelector(".changeSize");
  const articleToc = document.querySelector(".article-toc");
  const headerToc = document.querySelector(".wrap-side-operation");
  const changeInfo = document.querySelector(".change-info");

  if (document.body.clientWidth > 800 && changeSize) {
    article.classList.remove("narrow");
    article.classList.remove("_narrow");
  }

  articleToc.style.display = "none";
  headerToc.style.display = "block";
  changeInfo.style.right = "120px";
}

function init() {
  const changeSize = document.querySelector(".changeSize");
  const articleInfo = document.querySelector(".article-info");

  changeSize.onclick = function () {
    if (document.body.clientWidth > 800 && changeSize) {
      articleInfo.classList.toggle("artNobb");
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
