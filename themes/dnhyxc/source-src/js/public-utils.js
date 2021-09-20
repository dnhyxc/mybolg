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
};
