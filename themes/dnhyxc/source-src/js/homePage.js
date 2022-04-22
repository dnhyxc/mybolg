import * as Utils from "./public-utils";

function insertAfter(newNode, curNode) {
  curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling);
}

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
      console.log(data, "data");
      loading.style.display = "none";
      Utils.setSSG("data", "true");

      const box = document.createElement("div");
      box.className = "homePageArticleWrap";

      data.forEach((item) => {
        const date = Utils.formatDate(item.date);
        const timeEl = document.createElement("div");
        timeEl.className = "art_time";
        timeEl.innerHTML = date;

        const tagList = item.tags;
        const tagsEl = document.createElement("div");
        const tagLabel = document.createElement("span");
        tagLabel.innerHTML = "tags：";
        tagLabel.className = "tags_label";
        tagsEl.className = "tagList";
        tagsEl.appendChild(tagLabel);

        tagList.forEach((i) => {
          const tagA = document.createElement("a");
          tagA.innerHTML = i.name;
          tagA.href = i.permalink;
          tagA.className = "art_tag";
          tagsEl.appendChild(tagA);
        });

        const a = document.createElement("a");
        a.href = `/${item.path}`;
        a.innerHTML = item.title;
        a.id = "title_a";

        const div = document.createElement("div");
        div.className = "artWrap_a";
        div.appendChild(a);

        insertAfter(timeEl, a);
        insertAfter(tagsEl, timeEl);

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
      console.log(err);
    });
}

module.exports = {
  init,
};
