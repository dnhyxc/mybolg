function init() {
  const jsContent = document.querySelector("#js-content");
  if (document.body.clientWidth > 800) {
    const bodyHeight = document.body.clientHeight;
    if (jsContent && jsContent.clientHeight < bodyHeight - 148) {
      jsContent.style.marginBottom =
        bodyHeight - jsContent.clientHeight - 79 + "px";
    } else {
      jsContent.style.marginBottom = 0;
    }
  }
}

module.exports = {
  init: init,
};
