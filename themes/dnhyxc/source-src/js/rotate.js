function init() {
  const profilepic = document.querySelector(".profilepic");

  if (document.body.clientWidth > 800) {
    const profileImg = profilepic.querySelector("img");
    let timer;
    let speedTimer;
    let speed = 2;
    let rotate = 0;

    profileImg.onmouseenter = function () {
      profileImg.style.animation = "initial";
      clearInterval(speedTimer);
      speedTimer = setInterval(() => {
        speed++;
      }, 500);

      clearInterval(timer);
      timer = setInterval(() => {
        rotate += speed;
        profileImg.style.transform = `rotate(${rotate}deg)`;
      }, 30);
    };

    profileImg.onmouseleave = function () {
      profileImg.style.transform = "none";
      profileImg.style.animation = "turnZ 8s linear infinite";
      clearInterval(speedTimer);
      clearInterval(timer);
      speed = 2;
      rotate = 0;
    };
  }
}

module.exports = {
  init,
};
