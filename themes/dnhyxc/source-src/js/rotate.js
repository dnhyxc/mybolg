function init() {
  const profilepic = document.querySelector(".profilepic");
  if (document.body.clientWidth > 800) {
    const profileImg = profilepic.querySelector("img");
    let timer;
    let speedTimer;
    let speed = 2;
    let rotate = 0;

    profileImg.onmouseenter = function () {
      clearInterval(speedTimer);
      speedTimer = setInterval(() => {
        speed++;
        if (speed >= 70) {
          clearInterval(timer);
          speed = 2;
          rotate = 0;
        }
        if (speed === 2) {
          clearInterval(timer);
          timer = setInterval(() => {
            rotate += speed;
            profileImg.style.transform = `rotate(${rotate}deg)`;
          }, 30);
        }
      }, 500);
    };

    profileImg.onmouseleave = function () {
      clearInterval(speedTimer);
      speed = 2;
    };

    clearInterval(timer);
    timer = setInterval(() => {
      if (speed >= 70) {
        rotate = 0;
      }
      rotate += speed;
      profileImg.style.transform = `rotate(${rotate}deg)`;
    }, 30);
  }
}

module.exports = {
  init,
};
