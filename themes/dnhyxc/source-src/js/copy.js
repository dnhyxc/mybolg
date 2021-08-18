function init() {
  const article = document.querySelector(".article-entry");
  const code = article.querySelectorAll("figure");

  const copyToClipboard = (str, dom) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
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
      i.previousElementSibling.style.position = "relative";
      i.previousElementSibling.appendChild(btn);
      i.previousElementSibling.appendChild(info);
      btn.onclick = function () {
        let code = "";
        i.querySelector(".code")
          .querySelectorAll(".line")
          .forEach((i) => {
            code += i.innerText + "\n";
          });
        copyToClipboard(code, info);
      };
    });
  }
}

module.exports = {
  init: init,
};
