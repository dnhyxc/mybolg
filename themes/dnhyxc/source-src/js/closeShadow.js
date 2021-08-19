function init() {
  const profilepic = document.querySelector(".profilepic");
  const leftCol = document.querySelector(".left-col");
  const articles = document.querySelectorAll(".article");
  const main = document.querySelector(".main");
  const outer = document.querySelector(".outer");
  const archivesWrap = document.querySelectorAll(".archives-wrap");

  function setShadow() {
    if (sessionStorage.getItem("hideShadow")) {
      articles.forEach((i) => {
        i.classList.add("isShowShadow");
      });
      archivesWrap.forEach((i) => {
        i.classList.add("isShowShadow");
      });
      leftCol.classList.add("isShowShadow");
      main.classList.add("isShowShadow");
      outer.classList.add("isShowShadow");
    } else {
      articles.forEach((i) => {
        i.classList.remove("isShowShadow");
      });
      archivesWrap.forEach((i) => {
        i.classList.remove("isShowShadow");
      });
      leftCol.classList.remove("isShowShadow");
      main.classList.remove("isShowShadow");
      outer.classList.remove("isShowShadow");
    }
  }

  const toggleShadow = function () {
    if (sessionStorage.getItem("hideShadow")) {
      sessionStorage.removeItem("hideShadow");
    } else {
      sessionStorage.setItem("hideShadow", true);
    }
    setShadow();
  };
  profilepic.onclick = toggleShadow;
  return setShadow;
}

module.exports = {
  init: init,
};
