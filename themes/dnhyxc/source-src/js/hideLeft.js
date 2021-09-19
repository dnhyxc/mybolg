import * as Utils from "./public-utils";

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
}

function init() {
  const leftMenu = document.querySelector(".left-menu");
  // const leftCol = document.querySelector(".left-col");
  // const midCol = document.querySelector(".mid-col");
  // const endfooter = document.querySelector(".end-footer");

  leftMenu.addEventListener("click", () => {
    if (Utils.getSSG("hideMenu")) {
      Utils.removeSSG("hideMenu");
    }
    if (!Utils.getSSG("hideMenu")) {
      onShowMenu();
    }
  });

  // leftMenu.onclick = function () {
  //   leftCol.classList.toggle("hideLeft");
  //   midCol.classList.toggle("fullScreen");
  //   endfooter.classList.toggle("full");
  // };
}

module.exports = {
  init,
  onShowMenu,
};
