import * as Utils from "./public-utils";
import menuList from "./menuList";

function init(isDown, wrapper) {
  const main = document.querySelector(".main");
  wrapper.style.transition = "none";
  if (isDown && !Utils.isHome && !Utils.isPage) {
    main.classList.add("hide");
    if (wrapper.getAttribute("class").includes("toggleWrap")) {
      wrapper.classList.add("hideMain-hideFooter");
    } else {
      wrapper.classList.add("hideMain");
    }

    Utils.setSSG("hideFooter", true);
    menuList.hideFooter(true);
  } else {
    main.classList.remove("hide");
    wrapper.classList.remove("hideMain");
    wrapper.classList.remove("hideMain-hideFooter");
    if (!Utils.isHome && !Utils.isPage && !Utils.getSSG("hideFooterSet")) {
      Utils.removeSSG("hideFooter");
      menuList.showFooter(true);
    }
  }
}

module.exports = {
  init,
};
