import QRcode from "./qrcode.js";
import {
  isArticle,
  isInformal,
  isCategories,
  isArchives,
  isPerception,
  isHome,
} from "./public-utils";

function init() {
  if (
    (isArticle || isInformal) &&
    !isCategories &&
    !isArchives &&
    !isPerception &&
    !isHome
  ) {
    const url = location.pathname;
    new QRcode(
      document.getElementById("qrcode"),
      `https://dnhyxc.github.io/${url}`
    );
  }
}

module.exports = {
  init,
};
