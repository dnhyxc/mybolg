// 样式
import "../css/main.scss";
// 上报
// import './report'
// 图片查看器
// import Viewer from './viewer'
// 分享
// import Share from './share'
// 边缘
// import Aside from './aside'

import ChangeLight from "./changelight";

import atticleNarrow from "./atticle-narrow";

import action from "./action";

import Setmargin from "./setmargin";

import articleToc from "./articleToc";

import changeTheme from "./changeTheme";

import { addLoadEvent } from "./util";

import * as setThemes from "./setThemes";

import copy from "./copy";

const cover = document.querySelector(".cover");
const hideCoverBtn = document.querySelector(".hideCoverBtn");
const changeInfo = document.querySelector(".changeInfo");

addLoadEvent(function () {
  // Share.init()
  // Viewer.init();
  // Aside.init();
  Setmargin.init();
  action.init();
  ChangeLight.init();
  atticleNarrow.init();
  articleToc.init();
  changeTheme.init();
  copy.init();
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
      !sessionStorage.getItem("container") &&
      !sessionStorage.getItem("changeInfo")
    ) {
      let timer = null;
      changeInfo.style.display = "block";
      sessionStorage.setItem("changeInfo", true);
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
    if (sessionStorage.getItem("xin")) {
      setThemes.xin();
    } else if (sessionStorage.getItem("dao")) {
      setThemes.dao();
    } else if (sessionStorage.getItem("shui")) {
      setThemes.shui();
    } else if (sessionStorage.getItem("qiong")) {
      setThemes.qiong();
    } else if (sessionStorage.getItem("chu")) {
      setThemes.chu();
    } else if (sessionStorage.getItem("zuo")) {
      setThemes.zuo();
    } else if (sessionStorage.getItem("kan")) {
      setThemes.kan();
    } else if (sessionStorage.getItem("yun")) {
      setThemes.yun();
    } else if (sessionStorage.getItem("qi")) {
      setThemes.qi();
    } else {
      setThemes.shi();
    }
  } else {
    document.body.addEventListener("touchmove", stopTouchmove, {
      passive: false,
    });
  }
};
