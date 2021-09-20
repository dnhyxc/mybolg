import QRcode from "./qrcode.js";
import {
  isArticle,
  isInformal,
  isCategories,
  isArchives,
  isPerception,
  isHome,
  toBottom,
  getSSG,
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
    const qrcode = document.querySelector("#qrcode");
    const qrcodeNarrow = document.querySelector("#qrcode-narrow");
    const talkNarrow = document.querySelector(".talk-narrow");
    const domWrapper = document.querySelector("#wrapper");
    // const talkCount = document.querySelector(".talk-count");

    new QRcode(qrcodeNarrow, `https://dnhyxc.github.io/${url}`);
    new QRcode(qrcode, `https://dnhyxc.github.io/${url}`);

    talkNarrow.onclick = function () {
      toBottom(domWrapper, 200);
    };

    // talkCount.innerHTML = getSSG("cnt");
  }
}

module.exports = {
  init,
};
