// 样式
import "../css/main.scss";
// 上报
// import './report'
// 图片查看器
// import Viewer from './viewer'
import Aside from "./aside";

import ChangeLight from "./changelight";

import atticleNarrow from "./atticle-narrow";

import action from "./action";

import Setmargin from "./setmargin";

import articleToc from "./articleToc";

import changeTheme from "./changeTheme";

import e, { addLoadEvent, onDOMContentLoaded } from "./util";

import * as Utils from "./public-utils";

import * as setThemes from "./setThemes";

import copy from "./copy";

import closeShadow from "./closeShadow";

import menuList from "./menuList";

import section from "./section-height";

import hideLeft from "./hideLeft";

import rotate from "./rotate";

import share from "./share";

import music from "./music";

import tocWordsLoop from "./tocWordsLoop";

import articleImage from "./article-image";

import lockHeader from "./lockHeader";
// import emStyle from "./emStyle";
import previewImg from "./previewImg";
import homePage from "./homePage";

const cover = document.querySelector(".cover");
// const hideCoverBtn = document.querySelector(".hideCoverBtn");
const changeInfo = document.querySelector(".changeInfo");

// function closeCover() {
//   hideCoverBtn &&
//     hideCoverBtn.addEventListener("click", function () {
//       cover && cover.classList.add("hideCover");
//     });
// }

onDOMContentLoaded(function () {
  // Share.init()
  // Viewer.init();
  Aside.init();
  Setmargin.init();
  action.init();
  ChangeLight.init();
  atticleNarrow.init();
  articleToc.init();
  changeTheme.init();
  copy.init();
  closeShadow.init();
  menuList.init();
  section.init();
  hideLeft.init();
  rotate.init();
  share.init();
  music.init();
  tocWordsLoop.init();
  articleImage.init();
  previewImg.init();
  homePage.init();
  // emStyle.init();
});

function stopTouchmove(e) {
  e.preventDefault();
}

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    if (document.body.clientWidth <= 800) {
      document.body.style.position = "relative";
      document.body.style.width = "100%";
      document.body.removeEventListener("touchmove", stopTouchmove, {
        passive: false,
      });
    }

    if (
      !Utils.getSSG("container") &&
      !Utils.getSSG("changeInfo") &&
      Utils.isDarkOfLight() !== "light"
    ) {
      let timer = null;
      changeInfo.style.display = "block";
      Utils.setSSG("changeInfo", true);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        changeInfo.style.display = "none";
      }, 3000);
    }
  } else if (document.readyState === "interactive") {
    // closeCover();
    cover && cover.classList.add("hideCover");
    setThemes.initSetThemes();
    if (!Utils.getSSG("container") && Utils.getSSG("hideShadow")) {
      closeShadow.addShadow();
    } else {
      closeShadow.removeShadow();
    }
    if (Utils.getSSG("hideFooter")) {
      menuList.hideFooter();
    } else {
      menuList.showFooter();
    }
    if (!Utils.getSSG("hideFooterSet")) {
      Utils.removeSSG("hideFooter");
      menuList.showFooter();
    } else {
      Utils.setSSG("hideFooter", true);
      menuList.hideFooter();
    }
    if (Utils.getSSG("hideMenu")) {
      menuList.onHideMenu();
      if (Utils.getSSG("narrow") && (Utils.isArticle || Utils.isInformal)) {
        atticleNarrow.setNarrow();
      } else {
        atticleNarrow.removeNarrow();
      }
    } else {
      hideLeft.onShowMenu();
      if (Utils.getSSG("narrow") && (Utils.isArticle || Utils.isInformal)) {
        atticleNarrow.setNarrow();
      } else {
        atticleNarrow.removeNarrow();
      }
    }

    if (
      Utils.getSSG("narrow") &&
      !Utils.isHome &&
      (Utils.isArticle || Utils.isInformal)
    ) {
      atticleNarrow.setNarrow();
    } else {
      atticleNarrow.removeNarrow();
    }

    lockHeader.setLocktext();
  } else {
    document.body.addEventListener("touchmove", stopTouchmove, {
      passive: false,
    });
  }
};
