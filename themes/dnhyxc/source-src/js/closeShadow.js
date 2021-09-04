function removeShadow() {
  const articles = document.querySelectorAll(".article");
  const archivesWrap = document.querySelectorAll(".archives-wrap");
  const menuTexts = document.querySelectorAll(".menu-text");
  const tipsText = document.querySelectorAll(".tips-text");
  const leftCol = document.querySelector(".left-col");
  const main = document.querySelector(".main");
  const outer = document.querySelectorAll(".outer");
  const dark = document.querySelector(".dark");
  const toggleMusic = document.querySelector(".toggleMusic");
  const toolsSection = document.querySelector(".tools-section");
  const articleMoreLink = document.querySelectorAll(".article-more-link");
  const headerBar = document.querySelector(".headerBar");
  const leftColBar = document.querySelector(".leftColBar");
  const artBar = document.querySelectorAll(".artBar");

  articles.forEach((i) => {
    i.classList.remove("isShowShadow");
  });
  archivesWrap.forEach((i) => {
    i.classList.remove("isShowShadow");
  });
  menuTexts.forEach((i) => {
    i.classList.remove("isShowShadow");
  });
  tipsText.forEach((i) => {
    i.classList.remove("toggleShadow");
  });
  articleMoreLink.forEach((i) => {
    i.classList.remove("isShowShadow-a");
  });
  artBar.forEach((i) => {
    i.classList.remove("isShowShadow-art");
  });
  outer.forEach((i) => {
    i.classList.remove("isShowShadow");
  });
  leftCol.classList.remove("isShowShadow");
  headerBar.classList.remove("isShowShadow-header");
  leftColBar.classList.remove("isShowShadow-left");
  main.classList.remove("isShowShadow");
  // outer.classList.remove("isShowShadow");
  toolsSection.classList.remove("isShowShadow");
  dark.classList.remove("isShow-shadow");
  toggleMusic.classList.remove("isShow-shadow");
}

function addShadow() {
  const articles = document.querySelectorAll(".article");
  const archivesWrap = document.querySelectorAll(".archives-wrap");
  const menuTexts = document.querySelectorAll(".menu-text");
  const tipsText = document.querySelectorAll(".tips-text");
  const leftCol = document.querySelector(".left-col");
  const main = document.querySelector(".main");
  const outer = document.querySelectorAll(".outer");
  const dark = document.querySelector(".dark");
  const toggleMusic = document.querySelector(".toggleMusic");
  const toolsSection = document.querySelector(".tools-section");
  const articleMoreLink = document.querySelectorAll(".article-more-link");
  const headerBar = document.querySelector(".headerBar");
  const leftColBar = document.querySelector(".leftColBar");
  const artBar = document.querySelectorAll(".artBar");

  articles.forEach((i) => {
    i.classList.add("isShowShadow");
  });
  archivesWrap.forEach((i) => {
    i.classList.add("isShowShadow");
  });
  menuTexts.forEach((i) => {
    i.classList.add("isShowShadow");
  });
  tipsText.forEach((i) => {
    i.classList.add("toggleShadow");
  });
  articleMoreLink.forEach((i) => {
    i.classList.add("isShowShadow-a");
  });
  artBar.forEach((i) => {
    i.classList.add("isShowShadow-art");
  });
  outer.forEach((i) => {
    i.classList.add("isShowShadow");
  });
  leftCol.classList.add("isShowShadow");
  main.classList.add("isShowShadow");
  // outer.classList.add("isShowShadow");
  toolsSection.classList.add("isShowShadow");
  headerBar.classList.add("isShowShadow-header");
  leftColBar.classList.add("isShowShadow-left");
  dark.classList.add("isShow-shadow");
  toggleMusic.classList.add("isShow-shadow");
}

function setShadow() {
  if (sessionStorage.getItem("hideShadow")) {
    addShadow()
  } else {
    removeShadow()
  }
}

function init() {
  const profilepic = document.querySelector(".profilepic");
  const toggleShadow = function () {
    if (!sessionStorage.getItem("container")) {
      if (sessionStorage.getItem("hideShadow")) {
        sessionStorage.removeItem("hideShadow");
      } else {
        sessionStorage.setItem("hideShadow", true);
      }
      setShadow();
    }
  };
  profilepic.onclick = toggleShadow;
}

module.exports = {
  init: init,
  removeShadow: removeShadow,
  addShadow: addShadow,
};
