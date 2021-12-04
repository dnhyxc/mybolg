import * as Utils from "./public-utils";
import atticleNarrow from "./atticle-narrow";
import { showMusicControl, hideMusicControl } from "./music";
import LockHeader from "./lockHeader";

function hideFooter(fromHideMain) {
  const endFooter = document.querySelector(".end-footer");
  const afterFooter = document.querySelector(".after-footer");
  const bodyWrap = document.querySelector(".body-wrap");
  const articleToc = document.querySelector(".article-toc");
  const perceptionLife = document.querySelector(".perception-life");
  const scrollWrap = document.querySelectorAll(".scrollWrap");
  const changeFooter = document.querySelector(".changeFooter");
  const article = document.querySelector(".article");
  let wrapper = document.querySelector("#wrapper");

  endFooter && endFooter.classList.add("toggleEndFooter");
  afterFooter && afterFooter.classList.add("toggleAfterFooter");
  bodyWrap && bodyWrap.classList.add("toggleWrap");
  articleToc && articleToc.classList.add("toggleArticleToc");
  perceptionLife && perceptionLife.classList.add("togglePerceptionLife");
  scrollWrap &&
    scrollWrap.forEach((i) => {
      i.classList.add("toggleScrollWrap");
    });
  changeFooter.innerHTML = "显底";
  if (Utils.isHome || Utils.isPage) {
    article.classList.add("hasImage-hideFooter");
  }
  if (wrapper.getAttribute("class").includes("hideMain")) {
    wrapper.classList.remove("hideMain");
    wrapper.classList.add("hideMain-hideFooter");
  }
  if (!fromHideMain) wrapper.style.transition = "height 0.3s ease";
}

function showFooter() {
  const endFooter = document.querySelector(".end-footer");
  const afterFooter = document.querySelector(".after-footer");
  const bodyWrap = document.querySelector(".body-wrap");
  const articleToc = document.querySelector(".article-toc");
  const perceptionLife = document.querySelector(".perception-life");
  const scrollWrap = document.querySelectorAll(".scrollWrap");
  const changeFooter = document.querySelector(".changeFooter");
  const article = document.querySelector(".article");

  endFooter && endFooter.classList.remove("toggleEndFooter");
  afterFooter && afterFooter.classList.remove("toggleAfterFooter");
  bodyWrap && bodyWrap.classList.remove("toggleWrap");
  articleToc && articleToc.classList.remove("toggleArticleToc");
  perceptionLife && perceptionLife.classList.remove("togglePerceptionLife");
  scrollWrap &&
    scrollWrap.forEach((i) => {
      i.classList.remove("toggleScrollWrap");
    });
  changeFooter.innerHTML = "隐底";
  if (Utils.isPage || Utils.isHome) {
    article.classList.remove("hasImage-hideFooter");
  }

  if (wrapper.getAttribute("class").includes("hideMain-hideFooter")) {
    wrapper.classList.remove("hideMain-hideFooter");
    wrapper.classList.add("hideMain");
  }
  wrapper.style.transition = "height 0.3s ease";
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
  const listWrap = menuList.querySelector(".listWrap");
  const changeFooter = document.querySelector(".changeFooter");
  const hideMenu = document.querySelector(".hideMenu");
  const aplayer = document.querySelector("#aplayer");
  const goLeft = document.querySelector(".goLeft");
  const goRight = document.querySelector(".goRight");

  if (document.body.clientWidth > 800) {
    authorName.addEventListener("click", () => {
      menuList.classList.toggle("showMenu");
    });

    changeFooter.addEventListener("click", () => {
      if (Utils.getSSG("hideFooterSet")) {
        Utils.removeSSG("hideFooterSet");
      } else {
        Utils.setSSG("hideFooterSet", true);
      }
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
        if (aplayer.getAttribute("class").includes("aplayer-narrow")) {
          hideMusicControl();
        } else {
          showMusicControl();
        }
      }
    });

    // 切换左右list
    let scrollLeft;
    let scrollWidth;
    let menuListCW;

    goLeft.addEventListener("click", () => {
      menuListCW = Math.round(menuList.clientWidth);
      scrollLeft = Math.round(listWrap.scrollLeft);
      scrollWidth = Math.round(listWrap.scrollWidth);

      if (scrollLeft <= 0) {
        listWrap.scrollLeft = scrollWidth;
      } else {
        const newLeft = scrollLeft - menuListCW;
        listWrap.scrollLeft = newLeft;
      }
    });

    goRight.addEventListener("click", () => {
      menuListCW = Math.round(menuList.clientWidth);
      scrollLeft = Math.round(listWrap.scrollLeft);
      scrollWidth = Math.round(listWrap.scrollWidth);

      if (scrollWidth - scrollLeft <= menuListCW) {
        listWrap.scrollLeft = 0;
      } else {
        const newLeft = scrollLeft + menuListCW;
        listWrap.scrollLeft = newLeft;
      }
    });
  }
  LockHeader.init();
}

module.exports = {
  init: init,
  hideFooter,
  showFooter,
  onHideMenu,
};
