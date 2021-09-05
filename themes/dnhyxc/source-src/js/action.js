import * as Utils from "./public-utils";

function init() {
  let leftCol = document.querySelector(".left-col");
  let homeIcon = document.querySelector("#home-icon");
  let tipsBox = document.querySelector(".tips-box");
  let tipsAs = tipsBox.querySelectorAll(".tips-a");
  let wrapper = document.querySelector("#wrapper");
  let changeSize = document.querySelector(".changeSize");
  let mainLoading = document.querySelector(".main-loading");
  let scrollTop = document.querySelectorAll("#scrollTop");
  let scrollCount = document.querySelectorAll(".scroll-count");

  let scroll_top = document.querySelector(".scroll_top");
  let topBar = document.querySelector(".topBar");
  let scrollbottom = document.querySelector(".scrollbottom");
  let bottomBar = document.querySelector(".bottomBar");
  let scroll_right = document.querySelector(".scrollright");
  let rightBar = document.querySelector(".rightBar");
  let scroll_left = document.querySelector(".scrollLeft");
  let leftBar = document.querySelector(".leftBar");
  let artBar = document.querySelectorAll(".artBar");
  let art_bar = document.querySelectorAll(".art_bar");
  let leftColBar = document.querySelector(".leftColBar");
  let leftCol_bar = document.querySelector(".leftCol_bar");
  let headerBar = document.querySelector(".headerBar");
  let header_bar = document.querySelector(".header_bar");
  let footerBar = document.querySelectorAll(".footerBar");
  let footer_bar = document.querySelectorAll(".footer_bar");

  let bodyScroll = document.body;
  let coverInfo = document.querySelectorAll(".coverInfo");
  let aplayer = document.querySelector(".aplayer");
  let articleEntry = document.querySelector(".article-entry");
  let articleToc = document.querySelector(".article-toc");
  let articleTocA = articleToc && articleToc.querySelectorAll("a");
  let h345 = articleEntry && articleEntry.querySelectorAll("h3,h4,h5");

  let path = location.pathname;

  homeIcon.onclick = function (e) {
    e.stopPropagation();
    if (tipsBox.classList.value === "tips-box") {
      tipsBox.classList.add("tip-show");
      aplayer.style.opacity = 0;
      aplayer.style.transition = "all 0.3s ease";
    } else {
      tipsBox.classList.remove("tip-show");
      aplayer.style.opacity = 1;
      aplayer.style.transition = "all 0.3s ease";
    }
  };

  leftCol.onclick = function (e) {
    tipsBox.classList.remove("tip-show");
    aplayer.style.opacity = 1;
    aplayer.style.transition = "all 0.3s ease";
  };

  tipsAs.forEach((i) => {
    i.onclick = function () {
      tipsBox.classList.remove("tip-show");
      aplayer.style.opacity = 1;
      aplayer.style.transition = "all 0.3s ease";
    };
  });

  scrollTop.forEach((i) => {
    i.onclick = function () {
      const clock = setInterval(function () {
        if (wrapper.scrollTop !== 0) {
          wrapper.scrollTop -= Math.fround(wrapper.scrollTop / 10);
        } else {
          clearInterval(clock);
        }
      }, 10);
    };
  });

  window.onresize = function () {
    if (bodyScroll.clientWidth <= 800) {
      scrollTop.forEach((i) => {
        i.style.display = "none";
      });
    }
  };

  let timer = null;

  function getText(path) {
    const pathIndex = decodeURIComponent(path).lastIndexOf("/");
    const href = decodeURIComponent(path).substring(
      pathIndex + 1,
      decodeURIComponent(path).length
    );
    return href;
  }

  function debounce(fn, wait) {
    let timer = null;
    return function () {
      let arg = arguments;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        fn.apply(this, arg);
      }, wait);
    };
  }

  const toTopId = [];
  const toTopHref = [];
  let mainLoadingText;
  let scrollTimer = null;

  // 滚动事件
  function scroll() {
    const countInfo = `${parseInt(
      (wrapper.scrollTop / (wrapper.scrollHeight - wrapper.offsetHeight)) * 100
    )}%`;
    scrollCount.forEach((i) => {
      i.innerHTML = countInfo;
    });
    topBar.style.width = countInfo;
    bottomBar.style.width = countInfo;
    rightBar.style.height = countInfo;
    leftBar.style.height = countInfo;
    art_bar.forEach((i) => {
      i.style.width = countInfo;
    });
    leftCol_bar.style.height = countInfo;
    header_bar.style.width = countInfo;
    footer_bar.forEach((i) => {
      i.style.width = countInfo;
    });
    if (bodyScroll.clientWidth <= 800) {
      scrollTop.forEach((i) => {
        i.style.display = "none";
      });
      scroll_top.style.display = "none";
      scrollbottom.style.display = "none";
      scroll_right.style.display = "none";
      scroll_left.style.display = "none";
      artBar.forEach((i) => {
        i.style.display = "none";
      });
      leftColBar.style.display = "none";
      s;
      headerBar.style.display = "none";
      footerBar.forEach((i) => {
        i.style.display = "none";
      });
    } else {
      if (wrapper.scrollTop === 0) {
        scrollTop.forEach((i) => {
          i.style.display = "none";
        });
        scroll_top.style.display = "none";
        scrollbottom.style.display = "none";
        scroll_right.style.display = "none";
        scroll_left.style.display = "none";
        artBar.forEach((i) => {
          i.style.display = "none";
        });
        leftColBar.style.display = "none";
        headerBar.style.display = "none";
        footerBar.forEach((i) => {
          i.style.display = "none";
        });
        clearTimeout(timer);
      } else if (
        Math.floor(wrapper.scrollHeight - wrapper.scrollTop) <=
        wrapper.clientHeight
      ) {
        scrollTop.forEach((i) => {
          i.style.display = "block";
        });
        scroll_top.style.display = "block";
        scrollbottom.style.display = "block";
        scroll_right.style.display = "block";
        scroll_left.style.display = "block";
        artBar.forEach((i) => {
          i.style.display = "block";
        });
        leftColBar.style.display = "block";
        headerBar.style.display = "block";
        footerBar.forEach((i) => {
          i.style.display = "block";
        });
        clearTimeout(timer);
      } else {
        scrollTop.forEach((i) => {
          i.style.display = "block";
        });
        scroll_top.style.display = "block";
        scrollbottom.style.display = "block";
        scroll_right.style.display = "block";
        scroll_left.style.display = "block";
        artBar.forEach((i) => {
          i.style.display = "block";
        });
        leftColBar.style.display = "block";
        headerBar.style.display = "block";
        footerBar.forEach((i) => {
          i.style.display = "block";
        });
        clearTimeout(timer);
        timer = setTimeout(() => {
          scrollTop.forEach((i) => {
            i.style.display = "none";
          });
          scroll_top.style.display = "none";
          scrollbottom.style.display = "none";
          scroll_right.style.display = "none";
          scroll_left.style.display = "none";
          artBar.forEach((i) => {
            i.style.display = "none";
          });
          leftColBar.style.display = "none";
          headerBar.style.display = "none";
          footerBar.forEach((i) => {
            i.style.display = "none";
          });
        }, 2000);
      }
    }

    if (
      Utils.isInformal ||
      (Utils.isArticle && !Utils.isArchives && !Utils.isCategories)
    ) {
      if (wrapper.scrollTop <= 0) {
        articleToc.style.height = "calc(100vh - 225px)";
      } else {
        articleToc.style.height = "calc(100vh - 158px)";
      }

      // 处理目录逻辑
      h345.forEach((i) => {
        if (wrapper.scrollTop + 20 >= i.offsetTop) {
          if (toTopHref.length <= 0) {
            toTopId.push(i.innerText);
            toTopHref.push(getText(i.children[0].href));
          } else {
            toTopId.splice(0, 1, i.innerText);
            toTopHref.splice(0, 1, getText(i.children[0].href));
          }
        }
      });

      const isSelect = Array.from(articleTocA).filter(
        (i) => getText(i.href) === toTopHref[0]
      );
      articleTocA.forEach((i) => {
        i.classList && i.classList.remove("select-toc");
      });

      if (isSelect.length > 0) {
        isSelect[0].classList && isSelect[0].classList.add("select-toc");
        articleToc.scrollTop =
          isSelect[0] && isSelect[0].offsetTop - wrapper.clientHeight / 2;
      }

      if (toTopId && toTopId[0]) {
        mainLoading.innerHTML = toTopId[0];
        mainLoading.title = toTopId[0];
      }

      if (wrapper.scrollTop === 0) {
        isSelect.length &&
          isSelect[0].classList &&
          isSelect[0].classList.remove("select-toc");
        mainLoading.innerHTML = mainLoadingText;
        mainLoading.title = mainLoadingText;
      }
    }

    // 处理滚动条
    if (
      (articleEntry &&
        !articleEntry.getAttribute("class").includes("narrow")) ||
      Utils.isArchives ||
      Utils.isCategories ||
      Utils.isPerception
    ) {
      clearTimeout(scrollTimer);
      wrapper.classList.add("onscroll");
      scrollTimer = setTimeout(() => {
        wrapper.classList.remove("onscroll");
      }, 500);
    } else {
      clearTimeout(scrollTimer);
      wrapper.classList.remove("onscroll");
    }
  }

  wrapper.addEventListener("scroll", debounce(scroll, 0));

  function wrapperOnMouseMove(e) {
    if (
      (articleEntry &&
        !articleEntry.getAttribute("class").includes("narrow")) ||
      Utils.isArchives ||
      Utils.isCategories ||
      Utils.isPerception
    ) {
      if (
        e.pageX - leftCol.offsetWidth + 10 > wrapper.offsetWidth &&
        wrapper.scrollHeight > wrapper.clientHeight
      ) {
        clearTimeout(scrollTimer);
        wrapper.classList.add("onscroll");
      } else {
        wrapper.classList.remove("onscroll");
      }
      if (e.pageX - leftCol.offsetWidth > wrapper.offsetWidth) {
        document.documentElement.style.cursor = "pointer";
      } else {
        document.documentElement.style.cursor = "initial";
      }
    }
  }

  document.addEventListener("mousemove", debounce(wrapperOnMouseMove, 100));

  // 置顶逻辑
  scrollTop.forEach((i) => {
    i.onmouseenter = function () {
      clearTimeout(timer);
      i.style.display = "block";
      scroll_top.style.display = "block";
      scrollbottom.style.display = "block";
      scroll_right.style.display = "block";
      scroll_left.style.display = "block";
      artBar.forEach((j) => {
        j.style.display = "block";
      });
      leftColBar.style.display = "block";
      headerBar.style.display = "block";
      footerBar.forEach((i) => {
        i.style.display = "block";
      });
    };
  });

  scrollTop.forEach((i) => {
    i.onmouseleave = function () {
      if (
        Math.floor(wrapper.scrollHeight - wrapper.scrollTop) <=
        wrapper.clientHeight
      ) {
        clearTimeout(timer);
        i.style.display = "block";
        scroll_top.style.display = "block";
        scrollbottom.style.display = "block";
        scroll_right.style.display = "block";
        scroll_left.style.display = "block";
        artBar.forEach((i) => {
          i.style.display = "block";
        });
        leftColBar.style.display = "block";
        headerBar.style.display = "block";
        footerBar.forEach((i) => {
          i.style.display = "block";
        });
      } else {
        timer = setTimeout(() => {
          i.style.display = "none";
          scroll_top.style.display = "none";
          scrollbottom.style.display = "none";
          scroll_right.style.display = "none";
          scroll_left.style.display = "none";
          artBar.forEach((i) => {
            i.style.display = "none";
          });
          leftColBar.style.display = "none";
          headerBar.style.display = "none";
          footerBar.forEach((i) => {
            i.style.display = "none";
          });
        }, 2000);
      }
    };
  });

  // 处理header中的title逻辑
  if (decodeURIComponent(path)) {
    if (path !== "/") {
      const res = decodeURIComponent(path).substr(
        decodeURIComponent(path).lastIndexOf(
          "/",
          decodeURIComponent(path).lastIndexOf("/") - 1
        ) + 1
      );

      if (res === "/") {
        const newPath = decodeURIComponent(path).slice(
          0,
          decodeURIComponent(path).length - 2
        );
        const res = decodeURIComponent(newPath).substr(
          decodeURIComponent(newPath).lastIndexOf(
            "/",
            decodeURIComponent(newPath).lastIndexOf("/") - 1
          ) + 1
        );
        mainLoading.innerHTML = `${
          res.split("/")[0][0].toUpperCase() + res.split("/")[0].slice(1)
        }-${res.split("/")[1]}`;
      } else {
        const subPath = res.slice(0, res.length - 1);
        if (subPath === "informal") {
          changeSize.style.display = "block";
          mainLoading.innerHTML = "Informal Essay";
          mainLoading.innerHTML = "Informal Essay";
          mainLoadingText = "Informal Essay";
        } else if (
          Utils.isArticle &&
          !Utils.isCategories &&
          !Utils.isArchives
        ) {
          changeSize.style.display = "block";
          mainLoading.innerHTML =
            "Article-" + subPath[0].toUpperCase() + subPath.slice(1);
          mainLoading.title =
            "Article-" + subPath[0].toUpperCase() + subPath.slice(1);
          mainLoadingText =
            "Article-" + subPath[0].toUpperCase() + subPath.slice(1);
        } else {
          mainLoading.innerHTML = subPath[0].toUpperCase() + subPath.slice(1);
        }
      }

      if (coverInfo && coverInfo.length > 0) {
        coverInfo[0].style.display = "none";
        coverInfo[1].style.display = "none";
      }
    } else {
      mainLoading.innerHTML = "HOME";
    }
  }
}

module.exports = {
  init: init,
};
