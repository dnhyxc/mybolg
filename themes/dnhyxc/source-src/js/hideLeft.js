import * as Utils from "./public-utils";
import atticleNarrow from "./atticle-narrow";

function onShowMenu() {
  const leftCol = document.querySelector(".left-col");
  const midCol = document.querySelector(".mid-col");
  const endfooter = document.querySelector(".end-footer");
  const leftMenu = document.querySelector(".left-menu");
  const toolsCol = document.querySelector(".tools-col");

  leftCol.classList.remove("hideLeft");
  midCol.classList.remove("fullScreen");
  endfooter.classList.remove("full");
  leftMenu.classList.remove("show_menu");
  toolsCol.classList.remove("hideTools");

  // 控制隐藏左侧菜单栏时右侧文章的尺寸
  if (Utils.isArticle && !Utils.isHome && Utils.getSSG("narrow")) {
    atticleNarrow.setNarrow();
  }
}

function init() {
  const leftMenu = document.querySelector(".left-menu");
  leftMenu.addEventListener("click", () => {
    if (Utils.getSSG("hideMenu")) {
      Utils.removeSSG("hideMenu");
    }
    if (!Utils.getSSG("hideMenu")) {
      onShowMenu();
    }
  });
}

module.exports = {
  init,
  onShowMenu,
};
