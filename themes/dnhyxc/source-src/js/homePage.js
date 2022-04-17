import * as Utils from "./public-utils";

function init() {
  const homePage = document.querySelector(".homePage");
  const articleBoxWrap = document.querySelector(".articleBoxWrap");
  const articleBox = document.querySelector(".articleBox");
  const loading = articleBox.querySelector(".loading");
  const closeHomePageWrap = document.querySelector(".closeHomePageWrap");
  const articleLine = document.querySelector(".articleLine");

  if (Utils.getSSG("homePage")) {
    homePage.style.display = "none";
  } else {
    homePage.style.display = "block";
  }

  closeHomePageWrap.addEventListener("click", () => {
    homePage.style.top = "-100%";
    Utils.setSSG("homePage", true);
    Utils.removeSSG("data");
  });

  loading.style.display = "block";

  window
    .fetch(window.yiliaConfig.root + "content.json?t=" + +new Date(), {
      method: "get",
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      loading.style.display = "none";
      Utils.setSSG("data", "true");
      const box = document.createElement("div");
      box.className = "homePageArticleWrap";
      data.forEach((item) => {
        const div = document.createElement("div");
        div.className = "artWrap_a";
        const a = document.createElement("a");
        a.href = `/${item.path}`;
        a.innerHTML = item.title;
        div.appendChild(a);
        box.appendChild(div);
        articleBoxWrap.appendChild(box);
        articleLine.style.display = "block";
        a.addEventListener("click", () => {
          Utils.setSSG("homePage", true);
          document.onreadystatechange = function () {
            if (document.readyState === "complete") {
              homePage.style.display = "none";
              Utils.removeSSG("data");
            }
          };
        });
      });
    })
    .catch((err) => {
      app.$set("jsonFail", true);
    });
}

module.exports = {
  init,
};
