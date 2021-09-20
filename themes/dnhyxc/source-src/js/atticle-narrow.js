import * as Utils from "./public-utils";

function setNarrow() {
  const article = document.querySelector(".article-entry");
  const changeSize = document.querySelector(".changeSize");

  if (document.body.clientWidth > 800 && changeSize) {
    if (Utils.getSSG("hideMenu")) {
      article.classList.remove("narrow");
      article.classList.add("_narrow");
    } else {
      article.classList.add("narrow");
      article.classList.remove("_narrow");
    }
  }
}

function removeNarrow() {
  const article = document.querySelector(".article-entry");
  const changeSize = document.querySelector(".changeSize");

  if (document.body.clientWidth > 800 && changeSize) {
    article.classList.remove("narrow");
    article.classList.remove("_narrow");
  }
}

function init() {
  const article = document.querySelector(".article-entry");
  const changeSize = document.querySelector(".changeSize");
  const articleToc = document.querySelector(".article-toc");
  const headerToc = document.querySelector(".wrap-side-operation");
  const changeInfo = document.querySelector(".change-info");
  const articleInfo = document.querySelector(".article-info");

  changeSize.onclick = function () {
    if (document.body.clientWidth > 800 && changeSize) {
      articleInfo.classList.toggle("artNobb");
    }

    if (article.getAttribute("class").includes("narrow")) {
      removeNarrow();
      articleToc.style.display = "none";
      headerToc.style.display = "none";
      changeInfo.style.right = "75px";
    } else {
      setNarrow();
      articleToc.style.display = "block";
      headerToc.style.display = "block";
      changeInfo.style.right = "120px";
    }
  };
}

module.exports = {
  init,
  setNarrow,
  removeNarrow,
};
