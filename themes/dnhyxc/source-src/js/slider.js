// 动画
import Anm from "./anm";
// 浏览器判断
import Browser from "./browser";
// Q 基础库
import Q from "./Q";
// 神特么safari不支持fetch
import * as promise from "es6-promise";
import * as fetch from "fetch-ie8";

window.Promise = window.Promise || promise.Promise;
window.fetch = window.fetch || fetch;

let localTagKey = "dnhyxc-tag";
let localSearchKey = "dnhyxc-search";
const isMobile = Browser.versions.mobile && window.screen.width < 800;

function fixzero(str) {
  str = str + "";
  return str.length === 1 ? "0" + str : str;
}

function setScrollZero() {
  let $sct = document.querySelectorAll(".tools-section");
  $sct.forEach((em) => {
    em.scrollTop = 0;
  });
}

let elScrollTop;

function init() {
  let app = new Q({
    el: "#container",
    data: {
      isCtnShow: false,
      isShow: 0,
      isShowEndFooter: 0,
      innerArchive: false,
      friends: false,
      aboutme: false,
      items: [],
      jsonFail: false,
      showTags: false,
      search: "",
    },
    methods: {
      stop: (e) => {
        e.stopPropagation();
      },
      choseTag: (e, name) => {
        app.$set("search", "#" + (name ? name : e.target.innerHTML));
      },
      clearChose: (e) => {
        app.$set("search", "");
      },
      toggleTag: (e) => {
        app.$set("showTags", !app.showTags);
        window.localStorage &&
          window.localStorage.setItem(localTagKey, app.showTags);
      },
      openSlider: (e, type) => {
        e.stopPropagation();
        if (!type) {
          type = "innerArchive";
        }
        app.$set("innerArchive", false); // innerArchive: '所有文章'
        app.$set("friends", false); // friends: '友情链接'
        app.$set("aboutme", false); // aboutme: '关于我'
        app.$set(type, true);
        app.$set("isShow", true);
        app.$set("isShowEndFooter", true);
        app.$set("isCtnShow", true);
        setScrollZero();
        if (app.isShow && document.body.clientWidth <= 800) {
          elScrollTop = document.documentElement.scrollTop;
          document.querySelector("#container").style.position = "fixed";
          if (elScrollTop) {
            document.querySelector("#container").style.top =
              -elScrollTop + "px";
          }
        }
      },
    },
    filters: {
      isFalse: (val) => {
        return val === false;
      },
      isEmptyStr: (str) => {
        return str === "";
      },
      isNotEmptyStr: (str) => {
        return str !== "";
      },
      urlformat: (str) => {
        if (window.yiliaConfig && window.yiliaConfig.root) {
          return window.yiliaConfig.root + str;
        }
        return "/" + str;
      },
      tagformat: (str) => {
        return "#" + str;
      },
      dateformat: (str) => {
        let d = new Date(str);
        return (
          d.getFullYear() +
          "-" +
          fixzero(d.getMonth() + 1) +
          "-" +
          fixzero(d.getDate())
        );
      },
    },
    ready: () => {},
  });

  function handleSearch(val) {
    val = (val || "").toLowerCase();
    let type = "title";
    if (val.indexOf("#") === 0) {
      val = val.substr(1, val.length);
      type = "tag";
    }
    let items = app.items;
    items.forEach((item) => {
      let matchTitle = false;
      if (item.title.toLowerCase().indexOf(val) > -1) {
        matchTitle = true;
      }

      let matchTags = false;
      item.tags.forEach((tag) => {
        if (tag.name.toLowerCase().indexOf(val) > -1) {
          matchTags = true;
        }
      });

      if ((type === "title" && matchTitle) || (type === "tag" && matchTags)) {
        item.isShow = true;
        item.isShowEndFooter = true;
      } else {
        item.isShow = false;
        item.isShowEndFooter = false;
      }
    });
    app.$set("items", items);
  }

  app.$watch("search", function (val, oldVal) {
    window.localStorage && window.localStorage.setItem(localSearchKey, val);
    handleSearch(val);
  });

  window
    .fetch(window.yiliaConfig.root + "content.json?t=" + +new Date(), {
      method: "get",
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((em) => {
        em.isShow = true;
        em.isShowEndFooter = true;
      });
      app.$set("items", data);
      // 搜索
      let searchWording =
        (window.localStorage && window.localStorage.getItem(localSearchKey)) ||
        "";
      app.$set("search", searchWording);
      searchWording !== "" && handleSearch(searchWording);
    })
    .catch((err) => {
      app.$set("jsonFail", true);
    });

  // 隐藏
  document.querySelector("#container").onclick = (e) => {
    if (app.isShow) {
      app.$set("isShow", false);
      app.$set("isShowEndFooter", false);
      document.querySelector("#container").style.position = "relative";
      document.querySelector("#container").style.top = "0px";
      document.documentElement.scrollTop = elScrollTop;
      setTimeout(() => {
        app.$set("isCtnShow", false);
      }, 300);
    }
  };

  let startx, starty;
  //获得角度
  function getAngle(angx, angy) {
    return (Math.atan2(angy, angx) * 180) / Math.PI;
  }

  //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
  function getDirection(startx, starty, endx, endy) {
    let angx = endx - startx;
    let angy = endy - starty;
    let result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }

    let angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if (
      (angle >= 135 && angle <= 180) ||
      (angle >= -180 && angle < -135)
    ) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }
    return result;
  }
  //手指接触屏幕
  document.addEventListener(
    "touchstart",
    function (e) {
      startx = e.touches[0].pageX;
      starty = e.touches[0].pageY;
    },
    false
  );
  //手指离开屏幕
  document.addEventListener(
    "touchend",
    function (e) {
      let endx, endy;
      endx = e.changedTouches[0].pageX;
      endy = e.changedTouches[0].pageY;
      let direction = getDirection(startx, starty, endx, endy);
      if (direction === 3) {
        if (app.isShow) {
          app.$set("isShow", false);
          app.$set("isShowEndFooter", false);
          document.querySelector("#container").style.position = "relative";
          document.querySelector("#container").style.top = "0px";
          document.documentElement.scrollTop = elScrollTop;
          setTimeout(() => {
            app.$set("isCtnShow", false);
          }, 300);
        }
      }
    },
    false
  );

  // tag 显示/隐藏
  let localTag = false;
  if (window.localStorage) {
    localTag = window.localStorage.getItem(localTagKey);
  }
  let isTagOn = "false";
  if (localTag === null) {
    isTagOn =
      window.yiliaConfig && window.yiliaConfig.showTags ? "true" : "false";
  } else {
    isTagOn =
      (window.localStorage && window.localStorage.getItem(localTagKey)) ||
      "false";
  }
  app.$set("showTags", JSON.parse(isTagOn));

  // 其他标签点击
  // 标签
  let $tags = document.querySelectorAll(".tagcloud a.js-tag");
  for (var i = 0, len = $tags.length; i < len; i++) {
    let $em = $tags[i];
    $em.setAttribute("href", "javascript:void(0)");
    $em.onclick = (e) => {
      e.stopPropagation();
      app.$set("innerArchive", true);
      app.$set("friends", false);
      app.$set("aboutme", false);
      app.$set("isShow", true);
      app.$set("isShowEndFooter", true);
      app.$set("isCtnShow", true);
      app.$set("search", "#" + $em.innerHTML);
      setScrollZero();
      return false;
    };
  }
}

init();
if (!isMobile) {
  Anm.init();
}

module.exports = {};
