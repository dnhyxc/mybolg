import * as Utils from "./public-utils";

function init() {
  if (Utils.isArticle || Utils.isInformal) {
    const article = document.querySelector(".article-entry");
    const code = article && article.querySelectorAll("figure");

    function throttle(fn, time) {
      let lastTime = null;
      return function () {
        let nowTime = Date.now();
        if (nowTime - lastTime > time || !lastTime) {
          fn();
          lastTime = nowTime;
        }
      };
    }

    if (article && code) {
      const copyToClipboard = (str, dom) => {
        const el = document.createElement("textarea");
        el.value = str;
        // 防止唤起虚拟键盘
        el.setAttribute("readonly", "");
        // 让文本域不显示在页面可视区域内
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);

        const selected =
          document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false;

        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);

        if (selected) {
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(selected);
          dom.classList.add("showCopyInfo");
          if (dom.getAttribute("class").includes("showCopyInfo")) {
            clearTimeout(timer);
            const timer = setTimeout(() => {
              dom.classList.remove("showCopyInfo");
            }, 1500);
          }
        }
      };

      if (document.body.clientWidth >= 800) {
        code.forEach((i) => {
          const btn = document.createElement("div");
          const info = document.createElement("info");
          btn.className = "copyBtn";
          info.className = "copyInfo";
          btn.innerHTML = "复制代码";
          info.innerHTML = "复制成功";
          if (i.previousElementSibling) {
            i.previousElementSibling.style.position = "relative";
            i.previousElementSibling.appendChild(btn);
            i.previousElementSibling.appendChild(info);
          }

          const onCopy = function () {
            let code = "";
            i.querySelector(".code")
              .querySelectorAll(".line")
              .forEach((i) => {
                code += i.innerText + "\n";
              });
            copyToClipboard(code, info);
          };

          btn.addEventListener("click", throttle(onCopy, 1500));
        });
      }
    }
  }
}

module.exports = {
  init: init,
};
