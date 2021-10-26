import closeShadow from "./closeShadow";
import * as Utils from "./public-utils";

function setLight() {
  const container = document.querySelector("#container");
  const toolsCol = document.querySelector(".tools-col");
  const btnctn = document.querySelector(".btnctn");
  const intrudeLess = document.querySelector("#intrude-less");
  const dark = document.querySelector(".dark");
  const toggleMusic = document.querySelector(".toggleMusic");
  const mobileDark = document.querySelector(".mobileDark");
  const toTopDark = document.querySelector(".toTopDark");

  if (Utils.getSSG("container")) {
    container.classList.add("container");
  } else {
    container.classList.remove("container");
  }

  if (Utils.getSSG("light")) {
    dark.classList.add("light");
    toggleMusic.classList.add("light");
    dark.innerHTML = "炫酷";
  } else {
    dark.classList.remove("light");
    toggleMusic.classList.remove("light");
    dark.innerHTML = "白天";
  }
  if (Utils.getSSG("mobileLight")) {
    mobileDark.classList.add("mobileLight");
    toTopDark.classList.add("mobileLight");
    mobileDark.innerHTML = "炫酷";
  } else {
    mobileDark.classList.remove("mobileLight");
    toTopDark.classList.remove("mobileLight");
    mobileDark.innerHTML = "白天";
  }

  if (Utils.getSSG("lightBtnctn")) {
    btnctn.classList.add("lightBtnctn");
  } else {
    btnctn.classList.remove("lightBtnctn");
  }
  if (Utils.getSSG("lightToolsCol")) {
    toolsCol.classList.add("lightToolsCol");
  } else {
    toolsCol.classList.remove("lightToolsCol");
  }
  if (Utils.getSSG("lightIntrudeLess")) {
    intrudeLess.classList.add("lightIntrudeLess");
  } else {
    intrudeLess.classList.remove("lightIntrudeLess");
  }
}

function initLight() {
  if (Utils.isDarkOfLight() === "light") {
    Utils.setSSG("container", true);
    Utils.setSSG("lightToolsCol", true);
    Utils.setSSG("lightBtnctn", true);
    Utils.setSSG("lightIntrudeLess", true);
    Utils.setSSG("light", true);
    Utils.setSSG("mobileLight", true);
  } else {
    Utils.removeSSG("container", true);
    Utils.removeSSG("lightToolsCol", true);
    Utils.removeSSG("lightBtnctn", true);
    Utils.removeSSG("lightIntrudeLess", true);
    Utils.removeSSG("light", true);
    Utils.removeSSG("mobileLight", true);
  }
}

function init() {
  const container = document.querySelector("#container");
  const toolsCol = document.querySelector(".tools-col");
  const btnctn = document.querySelector(".btnctn");
  const intrudeLess = document.querySelector("#intrude-less");
  const dark = document.querySelector(".dark");
  const toggleMusic = document.querySelector(".toggleMusic");
  const mobileDark = document.querySelector(".mobileDark");
  const toTopDark = document.querySelector(".toTopDark");
  const changeInfo = document.querySelector(".changeInfo");
  const lightChangeInfo = document.querySelector(".lightChangeInfo");

  if (!Utils.getSSG("clearTimeControl")) {
    initLight();
  }

  function toggleLight() {
    if (
      container.getAttribute("class") &&
      container.getAttribute("class").includes("container")
    ) {
      container.classList.remove("container");
      Utils.removeSSG("container");
    } else {
      container.classList.add("container");
      Utils.setSSG("container", true);
    }
    if (toolsCol.getAttribute("class").includes("lightToolsCol")) {
      toolsCol.classList.remove("lightToolsCol");
      Utils.removeSSG("lightToolsCol");
    } else {
      toolsCol.classList.add("lightToolsCol");
      Utils.setSSG("lightToolsCol", true);
    }
    if (btnctn.getAttribute("class").includes("lightBtnctn")) {
      btnctn.classList.remove("lightBtnctn");
      Utils.removeSSG("lightBtnctn");
    } else {
      btnctn.classList.add("lightBtnctn");
      Utils.setSSG("lightBtnctn", true);
    }
    if (intrudeLess.getAttribute("class").includes("lightIntrudeLess")) {
      intrudeLess.classList.remove("lightIntrudeLess");
      Utils.removeSSG("lightIntrudeLess");
    } else {
      intrudeLess.classList.add("lightIntrudeLess");
      Utils.setSSG("lightIntrudeLess", true);
    }
    if (dark.getAttribute("class").includes("light")) {
      dark.classList.remove("light");
      dark.innerHTML = "白天";
      Utils.removeSSG("light");
    } else {
      dark.classList.add("light");
      dark.innerHTML = "炫酷";
      Utils.setSSG("light", true);
    }
    if (toggleMusic.getAttribute("class").includes("light")) {
      toggleMusic.classList.remove("light");
    } else {
      toggleMusic.classList.add("light");
    }
    if (mobileDark.getAttribute("class").includes("mobileLight")) {
      mobileDark.classList.remove("mobileLight");
      mobileDark.innerHTML = "白天";
      Utils.removeSSG("mobileLight");
    } else {
      mobileDark.classList.add("mobileLight");
      mobileDark.innerHTML = "炫酷";
      Utils.setSSG("mobileLight", true);
    }
    if (toTopDark.getAttribute("class").includes("mobileLight")) {
      toTopDark.classList.remove("mobileLight");
      Utils.removeSSG("mobileLight");
    } else {
      toTopDark.classList.add("mobileLight");
      Utils.setSSG("mobileLight", true);
    }
  }

  dark.onclick = function () {
    Utils.setSSG("clearTimeControl", true);
    toggleLight();
    if (Utils.getSSG("container")) {
      changeInfo.style.display = "none";
      closeShadow.removeShadow();
    } else {
      lightChangeInfo.style.opacity = "0";
      if (Utils.getSSG("hideShadow")) {
        closeShadow.addShadow();
      }
    }
  };

  // 移动端头像
  mobileDark.onclick = function () {
    Utils.setSSG("clearTimeControl", true);
    toggleLight();
  };

  setLight();
}

module.exports = {
  init,
  initLight,
};
