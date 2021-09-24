import * as Utils from "./public-utils";
import atticleNarrow from "./atticle-narrow";

function hideFooter() {
  const endFooter = document.querySelector(".end-footer");
  const afterFooter = document.querySelector(".after-footer");
  const bodyWrap = document.querySelector(".body-wrap");
  const articleToc = document.querySelector(".article-toc");
  const browserCover = document.querySelector(".browserCover");
  const perceptionLife = document.querySelector(".perception-life");
  const scrollWrap = document.querySelectorAll(".scrollWrap");
  const changeFooter = document.querySelector(".changeFooter");

  endFooter && endFooter.classList.add("toggleEndFooter");
  afterFooter && afterFooter.classList.add("toggleAfterFooter");
  bodyWrap && bodyWrap.classList.add("toggleWrap");
  articleToc && articleToc.classList.add("toggleArticleToc");
  perceptionLife && perceptionLife.classList.add("togglePerceptionLife");
  scrollWrap &&
    scrollWrap.forEach((i) => {
      i.classList.add("toggleScrollWrap");
    });
  if (Utils.getSystem() === 'mac') {
    browserCover && browserCover.classList.add("toggleBrowserCover");
  } else {
    browserCover && browserCover.classList.add("toggleBrowserCover-windows");
  }
  changeFooter.innerHTML = "显底";
}

function showFooter() {
  const endFooter = document.querySelector(".end-footer");
  const afterFooter = document.querySelector(".after-footer");
  const bodyWrap = document.querySelector(".body-wrap");
  const articleToc = document.querySelector(".article-toc");
  const browserCover = document.querySelector(".browserCover");
  const perceptionLife = document.querySelector(".perception-life");
  const scrollWrap = document.querySelectorAll(".scrollWrap");
  const changeFooter = document.querySelector(".changeFooter");

  endFooter && endFooter.classList.remove("toggleEndFooter");
  afterFooter && afterFooter.classList.remove("toggleAfterFooter");
  bodyWrap && bodyWrap.classList.remove("toggleWrap");
  articleToc && articleToc.classList.remove("toggleArticleToc");
  perceptionLife && perceptionLife.classList.remove("togglePerceptionLife");
  scrollWrap &&
    scrollWrap.forEach((i) => {
      i.classList.remove("toggleScrollWrap");
    });
  if (Utils.getSystem() === 'mac') {
    browserCover && browserCover.classList.remove("toggleBrowserCover");
  } else {
    browserCover && browserCover.classList.remove("toggleBrowserCover-windows");
  }
  changeFooter.innerHTML = "隐底";
}

function onHideMenu() {
  const leftCol = document.querySelector(".left-col");
  const midCol = document.querySelector(".mid-col");
  const endfooter = document.querySelector(".end-footer");
  const leftMenu = document.querySelector(".left-menu");
  const toolsCol = document.querySelector(".tools-col");

  leftCol.classList.add("hideLeft");
  midCol.classList.add("fullScreen");
  endfooter.classList.add("full");
  leftMenu.classList.add("show_menu");
  toolsCol.classList.add("hideTools");
  // 控制隐藏左侧菜单栏时右侧文章的尺寸
  if (Utils.getSSG("narrow")) atticleNarrow.setNarrow();
}

function init() {
  const authorName = document.querySelector(".authorName");
  const menuList = document.querySelector(".menuList");
  const changeFooter = document.querySelector(".changeFooter");
  const hideMenu = document.querySelector(".hideMenu");

  if (document.body.clientWidth > 800) {
    authorName.addEventListener("click", () => {
      menuList.classList.toggle("showMenu");
    });

    changeFooter.addEventListener("click", () => {
      if (Utils.getSSG("hideFooter")) {
        Utils.removeSSG("hideFooter");
      } else {
        Utils.setSSG("hideFooter", true);
      }
      if (Utils.getSSG("hideFooter")) {
        hideFooter();
      } else {
        showFooter();
      }
    });

    hideMenu.addEventListener("click", () => {
      if (!Utils.getSSG("hideMenu")) {
        Utils.setSSG("hideMenu", true);
      }
      if (Utils.getSSG("hideMenu")) {
        onHideMenu();
      }
    });
  }
}

module.exports = {
  init: init,
  hideFooter,
  showFooter,
  onHideMenu,
};
