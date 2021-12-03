function init(isDown, wrapper) {
  const main = document.querySelector(".main");

  if (isDown) {
    main.style.display = "none";
    wrapper.style.height = "calc(100% - 79px)";
  } else {
    main.style.display = "flex";
    wrapper.style.height = "calc(100% - 158px)";
  }

  console.log(main, "----------");
  console.log(isDown, "-isDown---------");
}

module.exports = {
  init,
};
