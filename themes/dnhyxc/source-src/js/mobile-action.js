function init() {
  const tocArticle = document.querySelector(".toc-article");
  const btnctnname = document.querySelector(".btnctn-name");
  let coverInfo = document.querySelectorAll(".coverInfo");
  let profilepic = document.querySelector("#profilepic");
  const container = document.querySelector("#container");
  const mobileDark = document.querySelector(".mobileDark");
  const toTopDark = document.querySelector(".toTopDark");
  const btnctn = document.querySelector(".btnctn");

  const themeColors = [
    "rgb(43, 88, 118) 0%, rgb(78, 67, 118) 100%",
    "#8c8c8c 0%, #304352 100%",
    "#13547a 0%, #67ada5 100%",
    "#a5a99e 0%, #386b96 100%",
    "#879d89 0%, #537895 100%",
    "#39707b 0%, #39707b 100%",
    "#535c68 0%, #535c68 100%",
    "#336750 0%, #1b6950 100%",
    "#2c3e50 0%, #2c3e50 100%",
    "#23262e 0%, #23262e 100%",
  ];

  const colors = [
    { color1: "rgb(43, 88, 118)", color2: "rgb(78, 67, 118)" },
    { color1: "#8c8c8c", color2: "#304352" },
    { color1: "#13547a", color2: "#67ada5" },
    { color1: "#a5a99e", color2: "#386b96" },
    { color1: "#879d89", color2: "#537895" },
    { color1: "#39707b", color2: "#39707b" },
    { color1: "#535c68", color2: "#535c68" },
    { color1: "#336750", color2: "#336750" },
    { color1: "#2c3e50", color2: "#2c3e50" },
    { color1: "#23262e", color2: "#23262e" },
  ];

  const themes = [
    `linear-gradient(-45deg, ${themeColors[0]})`, // 行
    `linear-gradient(to top, ${themeColors[1]})`, // 到
    `linear-gradient(15deg, ${themeColors[2]})`, // 水
    `linear-gradient(to top, ${themeColors[3]})`, // 穷
    `linear-gradient(to top, ${themeColors[4]})`, // 处
    `linear-gradient(to top, ${themeColors[5]})`, // 坐
    `linear-gradient(to top, ${themeColors[6]})`, // 看
    `linear-gradient(to top, ${themeColors[7]})`, // 云
    `linear-gradient(to top, ${themeColors[8]})`, // 起
    `linear-gradient(to top, ${themeColors[9]})`, // 时
  ];

  const actionType = [
    "xin",
    "dao",
    "shui",
    "qiong",
    "chu",
    "zuo",
    "kan",
    "yun",
    "qi",
    "shi",
  ];

  async function changeSSItems(type) {
    await actionType
      .filter((i) => i !== type)
      .forEach((i) => {
        sessionStorage.removeItem(i);
      });
    actionType
      .filter((i) => i === type)
      .forEach((i) => {
        sessionStorage.setItem(i, true);
      });
  }

  function getColor(direction, color1, color2) {
    return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
  }

  function isLight() {
    if (sessionStorage.getItem("container")) {
      return true;
    } else {
      return false;
    }
  }

  let index = -1;
  profilepic.onclick = function () {
    if (isLight()) return;
    if (index >= themes.length - 1) {
      index = 0;
    } else {
      index++;
    }
    changeSSItems(actionType[index]);
    container.style.backgroundImage = themes[index];
    mobileDark.style.backgroundImage = getColor(
      "to bottom",
      colors[index].color1,
      colors[index].color2
    );
    toTopDark.style.backgroundImage = getColor(
      "to bottom",
      colors[index].color1,
      colors[index].color2
    );
    btnctn.style.backgroundImage = getColor(
      "to top",
      colors[index].color1,
      colors[index].color2
    );
  };

  let initialClientY;

  tocArticle &&
    tocArticle.addEventListener("touchstart", function (e) {
      initialClientY = e.targetTouches[0].clientY;
    });

  tocArticle &&
    tocArticle.addEventListener("touchmove", function (event) {
      const clientY = event.targetTouches[0].clientY - initialClientY;
      if (
        tocArticle &&
        tocArticle.scrollTop === 0 &&
        clientY > 0 &&
        event.cancelable
      ) {
        return event.preventDefault();
      }
      if (
        tocArticle &&
        tocArticle.scrollHeight - 1 - tocArticle.scrollTop <=
          tocArticle.clientHeight &&
        clientY < 0 &&
        event.cancelable
      ) {
        return event.preventDefault();
      }
      event.stopPropagation();
      return true;
    });

  let path = location.pathname;
  if (decodeURIComponent(path)) {
    const reg = /\d/;
    const isArticle = reg.test(decodeURIComponent(path).substr("/"));
    if (path !== "/" && document.body.clientWidth <= 800) {
      console.log(path, "path");
      const res = decodeURIComponent(path).substr(
        decodeURIComponent(path).lastIndexOf(
          "/",
          decodeURIComponent(path).lastIndexOf("/") - 1
        ) + 1
      );
      if (res === "/") {
        mainLoading.innerHTML = "Article";
      } else {
        const subPath = res.slice(0, res.length - 1);
        if (subPath === "informal") {
          btnctnname.innerHTML = "Informal Essay";
        } else if (isArticle) {
          btnctnname.innerHTML =
            "Article-" + subPath[0].toUpperCase() + subPath.slice(1);
        } else {
          btnctnname.innerHTML = subPath[0].toUpperCase() + subPath.slice(1);
        }
      }

      if (
        document.body.clientWidth >= 800 &&
        coverInfo &&
        coverInfo.length > 0
      ) {
        coverInfo[0].style.display = "none";
        coverInfo[1].style.display = "none";
      }
    } else {
      btnctnname.innerHTML = "HOME";
    }
  }
}

module.exports = {
  init: init,
};
