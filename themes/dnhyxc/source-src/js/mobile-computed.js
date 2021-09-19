function init() {
  const wrapper = document.querySelector("#wrapper");
  const offsetTop = wrapper.offsetTop;
  const offsetHeight = wrapper.offsetHeight;
  const bodyHeight = document.body.offsetHeight;
  const height = offsetHeight + offsetTop;
  if (bodyHeight > height + 75) {
    wrapper.style.marginBottom = bodyHeight - height - 75 + "px";
  }
}

module.exports = {
  init,
};
