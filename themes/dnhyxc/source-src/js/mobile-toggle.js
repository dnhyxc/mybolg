function init() {
  let timer;
  const mobileDark = document.querySelector(".mobileDark");
  const mobileToggleLight = document.querySelector(".mobileToggleLight");
  const toTopDark = document.querySelector(".toTopDark");

  document.querySelector("#container").onscroll = function () {
    mobileDark.style.visibility = "visible";
    mobileDark.style.transition = "all 0.5s";
    toTopDark.style.visibility = "visible";
    toTopDark.style.transition = "all 0.5s";
    clearTimeout(timer);
    // timer = setTimeout(() => {
    //   mobileDark.style.visibility = "hidden";
    //   mobileDark.style.transition = "all 0.5s";
    //   toTopDark.style.visibility = "hidden";
    //   toTopDark.style.transition = "all 0.5s";
    // }, 2000);
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

  let moveX = 0;
  let moveY = 0;
  let translateY = 65;
  let translateX = 20;
  let tempX = 0;
  let tempY = 0;
  let isDown = false;

  mobileDark.ontouchstart = (e) => {
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    tempX = translateX;
    tempY = translateY;
    moveX = clientX;
    moveY = clientY;
    isDown = true;
  };

  mobileDark.ontouchmove = (e) => {
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    if (isDown) {
      translateX = moveX - parseInt(clientX) + tempX;
      translateY = moveY - parseInt(clientY) + tempY;

      if (translateX < 20) {
        translateX = 20;
        mobileToggleLight.style.right = "20px";
      } else if (parseInt(translateX) + 58 > document.body.offsetWidth) {
        translateX = document.body.offsetWidth - 58;
        mobileToggleLight.style.right = document.body.offsetWidth - 58 + "px";
      } else {
        mobileToggleLight.style.right = translateX + "px";
      }

      if (translateY < 65) {
        translateY = 65;
        mobileToggleLight.style.bottom = "65px";
      } else if (parseInt(translateY) + 85 > document.body.offsetHeight) {
        translateY = document.body.offsetHeight - 85;
        mobileToggleLight.style.bottom = document.body.offsetHeight - 85 + "px";
      } else {
        mobileToggleLight.style.bottom = translateY + "px";
      }
    }
  };

  mobileDark.ontouchend = (e) => {
    isDown = false;
  };
}

export default {
  init,
};
