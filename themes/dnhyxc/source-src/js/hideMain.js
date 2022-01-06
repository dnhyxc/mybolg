/*
 * @Description: 滚动隐藏header及footer
 * @Author: dnh
 * @Date: 2021-12-10 10:04:57
 * @LastEditTime: 2022-01-06 21:22:01
 * @LastEditors: dnh
 * @FilePath: \themes\dnhyxc\source-src\js\hideMain.js
 */
import * as Utils from "./public-utils";
import menuList from "./menuList";

function init(isDown, wrapper) {
  const main = document.querySelector(".main");
  const article = document.querySelector(".article");

  if (isDown) {
    main.classList.add("hide");
    if (Utils.isHome || Utils.isPage) {
      article.classList.add("hasImage-hideHeader");
    }

    if (wrapper.getAttribute("class").includes("toggleWrap")) {
      wrapper.classList.add("hideMain-hideFooter");
    } else {
      wrapper.classList.add("hideMain");
    }
    Utils.setSSG("hideFooter", true);
    menuList.hideFooter(true);
    wrapper.style.transition = "none";
  } else {
    main.classList.remove("hide");
    if (Utils.isHome || Utils.isPage) {
      article.classList.remove("hasImage-hideHeader");
    }

    wrapper.classList.remove("hideMain");
    wrapper.classList.remove("hideMain-hideFooter");
    if (!Utils.getSSG("hideFooterSet")) {
      Utils.removeSSG("hideFooter");
      menuList.showFooter(true);
    }
  }

  // 首页不隐藏header和footer

  // if (isDown && (Utils.isArticle || Utils.isInformal)) {
  //   main.classList.add("hide");
  //   if (wrapper.getAttribute("class").includes("toggleWrap")) {
  //     wrapper.classList.add("hideMain-hideFooter");
  //   } else {
  //     wrapper.classList.add("hideMain");
  //   }
  //   Utils.setSSG("hideFooter", true);
  //   menuList.hideFooter(true);
  //   wrapper.style.transition = "none";
  // } else if (Utils.isArticle || Utils.isInformal) {
  //   main.classList.remove("hide");
  //   wrapper.classList.remove("hideMain");
  //   wrapper.classList.remove("hideMain-hideFooter");
  //   if (!Utils.getSSG("hideFooterSet")) {
  //     Utils.removeSSG("hideFooter");
  //     menuList.showFooter(true);
  //   }
  // }
}

module.exports = {
  init,
};
