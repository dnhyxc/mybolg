// 样式
import "../css/main.scss";
// 上报
// import './report'
// 图片查看器
// import Viewer from './viewer'
// 分享
// import Share from './share'
// 边缘
import Aside from './aside'

import ChangeLight from "./changelight";

import atticleNarrow from "./atticle-narrow";

import action from "./action";

import Setmargin from "./setmargin";

import articleToc from "./articleToc";

import changeTheme from "./changeTheme";

import e, { addLoadEvent } from "./util";

import * as Utils from './public-utils'

import * as setThemes from "./setThemes";

import copy from "./copy";

import closeShadow from "./closeShadow";

import menuList from "./menuList";

import section from "./section-height";

const cover = document.querySelector(".cover");
const hideCoverBtn = document.querySelector(".hideCoverBtn");
const changeInfo = document.querySelector(".changeInfo");

addLoadEvent(function () {
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
});

function stopTouchmove(e) {
  e.preventDefault();
}

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    cover && cover.classList.add("hideCover");
    if (document.body.clientWidth <= 800) {
      document.body.style.position = "relative";
      document.body.style.width = "100%";
      document.body.removeEventListener("touchmove", stopTouchmove, {
        passive: false,
      });
    }

    if (
      !Utils.getSSG("container") &&
      !Utils.getSSG("changeInfo")
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
    hideCoverBtn &&
      hideCoverBtn.addEventListener("click", function () {
        cover && cover.classList.add("hideCover");
      });
    if (Utils.getSSG("xin")) {
      setThemes.xin();
    } else if (Utils.getSSG("dao")) {
      setThemes.dao();
    } else if (Utils.getSSG("shui")) {
      setThemes.shui();
    } else if (Utils.getSSG("qiong")) {
      setThemes.qiong();
    } else if (Utils.getSSG("chu")) {
      setThemes.chu();
    } else if (Utils.getSSG("zuo")) {
      setThemes.zuo();
    } else if (Utils.getSSG("kan")) {
      setThemes.kan();
    } else if (Utils.getSSG("yun")) {
      setThemes.yun();
    } else if (Utils.getSSG("qi")) {
      setThemes.qi();
    } else {
      setThemes.shi();
    }
    if (!Utils.getSSG('container') && Utils.getSSG("hideShadow")) {
      closeShadow.addShadow()
    } else {
      closeShadow.removeShadow()
    }
    if (Utils.getSSG('hideFooter')) {
      menuList.hideFooter()
    } else {
      menuList.showFooter()
    }
  } else {
    document.body.addEventListener("touchmove", stopTouchmove, {
      passive: false,
    });
  }
};
