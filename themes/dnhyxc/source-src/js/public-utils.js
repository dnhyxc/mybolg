const path = location.pathname;
const reg = /\d/;
const isArticle = reg.test(decodeURIComponent(path).substr("/"));
const isInformal = decodeURIComponent(path).substr("/").includes("informal");
const isCategories = decodeURIComponent(path)
  .substr("/")
  .includes("categories");
const isArchives = decodeURIComponent(path).substr("/").includes("archives");
const isPerception = decodeURIComponent(path)
  .substr("/")
  .includes("perception");
const isHome = path === "/";

const getSSG = function (name) {
  return sessionStorage.getItem(name);
};

const setSSG = function (name, value) {
  sessionStorage.setItem(name, value);
};

const removeSSG = function (name) {
  sessionStorage.removeItem(name);
};

// 获取元素旋转角度
const getRotate = function (el) {
  const st = window.getComputedStyle(el, null);
  const tr =
    st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform") ||
    "FAIL";
  const values = tr.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];
  const c = values[2];
  const d = values[3];
  const scale = Math.sqrt(a * a + b * b);
  const sin = b / scale;
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return angle;
};

function toBottom(domWrapper, time) {
  function scrollToBottom() {
    (function smoothscroll() {
      const currentScroll = domWrapper.scrollTop;
      const clientHeight = domWrapper.offsetHeight;
      const scrollHeight = domWrapper.scrollHeight;
      if (scrollHeight - 10 > currentScroll + clientHeight) {
        requestAnimationFrame(smoothscroll);
        domWrapper.scrollTo(
          0,
          currentScroll + (scrollHeight - currentScroll - clientHeight) / 2
        );
      }
    })();
  }
  setTimeout(scrollToBottom, time);
}

const getSystem = function () {
  const agent = navigator.userAgent.toLowerCase();
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
    return "windows32";
  }
  if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
    return "windows64";
  }
  if (isMac) {
    return "mac";
  }
};

const DPR = window.devicePixelRatio;

let getTimeState = () => {
  // 获取当前时间
  let timeNow = new Date();
  // 获取当前小时
  let hours = timeNow.getHours();
  // 设置默认文字
  let text = ``;
  // 判断当前时间段
  if (hours >= 0 && hours <= 10) {
    text = `早上好`;
  } else if (hours > 10 && hours <= 14) {
    text = `中午好`;
  } else if (hours > 14 && hours <= 18) {
    text = `下午好`;
  } else if (hours > 18 && hours <= 24) {
    text = `晚上好`;
  }
  // 返回当前时间段对应的状态
  return text;
};

const isDarkOfLight = () => {
  // 获取当前时间
  let timeNow = new Date();
  // 获取当前小时
  let hours = timeNow.getHours();

  if (hours >= 0 && hours <= 18) {
    return "light";
  } else {
    return "dark";
  }
};

module.exports = {
  isArticle,
  isInformal,
  isCategories,
  isArchives,
  isPerception,
  isHome,
  getSSG,
  setSSG,
  removeSSG,
  getRotate,
  toBottom,
  getSystem,
  DPR,
  isDarkOfLight,
  getTimeState,
};
