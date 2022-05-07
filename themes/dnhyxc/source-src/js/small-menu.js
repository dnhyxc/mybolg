function menageMemu(needClick = false) {
  const showMenuIcon = document.querySelector(".showMenuIcon");
  const smallWrap = document.querySelector(".smallWrap");
  const smallMenu = document.querySelector(".smallMenu");

  if (needClick) {
    showMenuIcon.addEventListener("click", () => {
      smallWrap.classList.toggle("showSmallWrap");
      smallMenu.classList.toggle("showSmallMenu");
      showMenuIcon.classList.toggle("menuIcon");
    });
  } else {
    smallWrap.classList.remove("showSmallWrap");
    smallMenu.classList.remove("showSmallMenu");
    showMenuIcon.classList.remove("menuIcon");
  }
}

function init() {
  menageMemu(true);
}

module.exports = {
  init,
  menageMemu,
};
