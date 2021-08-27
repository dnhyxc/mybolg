const path = location.pathname;
const reg = /\d/;
const isArticle = reg.test(decodeURIComponent(path).substr("/"));
const isInformal = decodeURIComponent(path).substr("/").includes("informal");
const isCategories = decodeURIComponent(path)
  .substr("/")
  .includes("categories");
const isArchives = decodeURIComponent(path).substr("/").includes("archives");
const isHome = path === '/'

module.exports = {
  isArticle: isArticle,
  isInformal: isInformal,
  isCategories: isCategories,
  isArchives: isArchives,
  isHome: isHome,
};
