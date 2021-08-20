function init() {
  const articles = document.querySelectorAll(".article");
  const archivesWrap = document.querySelectorAll(".archives-wrap");
  const menuTexts = document.querySelectorAll(".menu-text");
  const tipsText = document.querySelectorAll(".tips-text");
  const profilepic = document.querySelector(".profilepic");
  const leftCol = document.querySelector(".left-col");
  const main = document.querySelector(".main");
  const outer = document.querySelector(".outer");
  const dark = document.querySelector(".dark");
  const toggleMusic = document.querySelector(".toggleMusic");
  const toolsSection = document.querySelector(".tools-section");

  function setShadow() {
    if (sessionStorage.getItem("hideShadow")) {
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
      leftCol.classList.add("isShowShadow");
      main.classList.add("isShowShadow");
      outer.classList.add("isShowShadow");
      toolsSection.classList.add("isShowShadow");
      dark.classList.add("isShow-shadow");
      toggleMusic.classList.add("isShow-shadow");
    } else {
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
      leftCol.classList.remove("isShowShadow");
      main.classList.remove("isShowShadow");
      outer.classList.remove("isShowShadow");
      toolsSection.classList.remove("isShowShadow");
      dark.classList.remove("isShow-shadow");
      toggleMusic.classList.remove("isShow-shadow");
    }
  }

  const toggleShadow = function () {
    if (sessionStorage.getItem("hideShadow")) {
      sessionStorage.removeItem("hideShadow");
    } else {
      sessionStorage.setItem("hideShadow", true);
    }
    if (!sessionStorage.getItem("container")) {
      setShadow();
    }
  };

  if (!sessionStorage.getItem("container")) {
    profilepic.onclick = toggleShadow;
  }
  return setShadow;
}

module.exports = {
  init: init,
};
