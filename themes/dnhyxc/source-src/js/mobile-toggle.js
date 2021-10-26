function init() {
  let timer;
  const mobileDark = document.querySelector(".mobileDark");
  const toTopDark = document.querySelector(".toTopDark");
  document.querySelector("#container").onscroll = function () {
    mobileDark.style.visibility = "visible";
    mobileDark.style.transition = "all 0.5s";
    toTopDark.style.visibility = "visible";
    toTopDark.style.transition = "all 0.5s";
    clearTimeout(timer);
    timer = setTimeout(() => {
      mobileDark.style.visibility = "hidden";
      mobileDark.style.transition = "all 0.5s";
      toTopDark.style.visibility = "hidden";
      toTopDark.style.transition = "all 0.5s";
    }, 2000);
  };

  toTopDark.onclick = function () {
    const clock = setInterval(function () {
      if (document.querySelector("#container").scrollTop !== 0) {
        document.querySelector("#container").scrollTop -= Math.fround(
          document.querySelector("#container").scrollTop / 10
        );
      } else {
        clearInterval(clock);
      }
    }, 10);
  };
}

export default {
  init
}