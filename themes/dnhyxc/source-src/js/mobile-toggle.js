function init() {
  const mobileDark = document.querySelector(".mobileDark");
  const mobileToggleLight = document.querySelector(".mobileToggleLight");
  const toTopDark = document.querySelector(".toTopDark");
  const toTop = document.querySelector(".toTop");

  document.querySelector("#container").onscroll = function () {
    mobileDark.style.visibility = "visible";
    mobileDark.style.transition = "all 0.5s";
    toTopDark.style.visibility = "visible";
    toTopDark.style.transition = "all 0.5s";
  };

  console.log(document.querySelector("#container").scrollHeight, 'document.querySelector("#container").scrollHeight')
  console.log(document.querySelector("#container").clientHeight, 'document.querySelector("#container").innerHeight')

  if (document.querySelector("#container").scrollHeight <= document.querySelector("#container").clientHeight) {
    console.log('有滚动条')
    mobileDark.style.visibility = "visible";
  }

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

  const params = {
    moveX: 0,
    moveY: 0,
    translateY: 65,
    translateX: 10,
    tempX: 0,
    tempY: 0,
    isDown: false,
  };

  const toTopParams = {
    moveX: 0,
    moveY: 0,
    translateY: 10,
    translateX: 10,
    tempX: 0,
    tempY: 0,
    isDown: false,
  };

  function touchStart(params, clientX, clientY) {
    params.tempX = params.translateX;
    params.tempY = params.translateY;
    params.moveX = clientX;
    params.moveY = clientY;
    params.isDown = true;
  }

  function touchMove(params, clientX, clientY, dom, bottomSize) {
    if (params.isDown) {
      params.translateX = params.moveX - parseInt(clientX) + params.tempX;
      params.translateY = params.moveY - parseInt(clientY) + params.tempY;

      if (params.translateX < 10) {
        params.translateX = 10;
        dom.style.right = "10px";
      } else if (parseInt(params.translateX) + 47 > document.body.offsetWidth) {
        params.translateX = document.body.offsetWidth - 47;
        dom.style.right = document.body.offsetWidth - 47 + "px";
      } else {
        dom.style.right = params.translateX + "px";
      }

      if (params.translateY < bottomSize) {
        params.translateY = bottomSize;
        dom.style.bottom = bottomSize + "px";
      } else if (
        parseInt(params.translateY) + 85 >
        document.body.offsetHeight
      ) {
        params.translateY = document.body.offsetHeight - 85;
        dom.style.bottom = document.body.offsetHeight - 85 + "px";
      } else {
        dom.style.bottom = params.translateY + "px";
      }
    }
  }

  function touchEnd(params, dom) {
    if (params.translateX + 10 > document.body.offsetWidth / 2) {
      params.translateX = document.body.offsetWidth - 47;
      dom.style.right = document.body.offsetWidth - 47 + "px";
    } else {
      params.translateX = 10;
      dom.style.right = "10px";
    }
    params.isDown = false;
  }

  mobileDark.ontouchstart = (e) => {
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    touchStart(params, clientX, clientY);
  };

  mobileDark.ontouchmove = (e) => {
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    touchMove(params, clientX, clientY, mobileToggleLight, 65);
  };

  mobileDark.ontouchend = () => {
    touchEnd(params, mobileToggleLight);
  };

  // 置顶移动
  toTop.ontouchstart = (e) => {
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    touchStart(toTopParams, clientX, clientY);
  };

  toTop.ontouchmove = (e) => {
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    touchMove(toTopParams, clientX, clientY, toTop, 20);
  };

  toTop.ontouchend = () => {
    touchEnd(toTopParams, toTop);
  };
}

export default {
  init,
};
