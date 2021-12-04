import * as Utils from "./public-utils";

function init() {
  const lockHeader = document.querySelector(".lockHeader");
  lockHeader.addEventListener("click", () => {
    if (Utils.getSSG("lockHeader")) {
      Utils.removeSSG("lockHeader");
      lockHeader.innerHTML = "锁定";
    } else {
      Utils.setSSG("lockHeader", true);
      lockHeader.innerHTML = "解锁";
    }
  });
}

module.exports = {
  init,
};
