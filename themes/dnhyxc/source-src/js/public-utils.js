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

module.exports = {
  isArticle: isArticle,
  isInformal: isInformal,
  isCategories: isCategories,
  isArchives: isArchives,
  isPerception,
  isHome: isHome,
  getSSG: getSSG,
  setSSG: setSSG,
  removeSSG: removeSSG,
};
