import * as Utils from "./public-utils";

function init() {
  const jsContent = document.querySelector("#js-content");
  if (document.body.clientWidth > 800) {
    const bodyHeight = document.body.clientHeight;
    if (jsContent && jsContent.clientHeight < bodyHeight - 148) {
      if (Utils.getSSG("hideFooter")) {
        jsContent.style.marginBottom =
          bodyHeight - jsContent.clientHeight - 148 + "px";
      } else {
        jsContent.style.marginBottom =
          bodyHeight - jsContent.clientHeight - 158 + "px";
      }
    } else {
      jsContent.style.marginBottom = 0;
    }
    // if(Utils.isCategories)
  }
}

module.exports = {
  init: init,
};
