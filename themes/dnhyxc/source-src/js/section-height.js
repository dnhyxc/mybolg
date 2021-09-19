import { isArchives, isCategories } from "./public-utils";

function init() {
  const jsContent = document.querySelector("#js-content");
  if ((isArchives || isCategories) && document.body.clientWidth > 800) {
    const bodyHeight = document.body.clientHeight;
    if (jsContent && jsContent.clientHeight < bodyHeight - 148) {
      jsContent.style.marginBottom =
        bodyHeight - jsContent.clientHeight - 148 + "px";
    } else {
      jsContent.style.marginBottom = 0;
    }
  }
}

module.exports = {
  init: init,
};
