function init() {
  const profilepic = document.querySelector('.profilepic');
  const container = document.querySelector('#container');
  const topBar = document.querySelector('.topBar');
  const bottomBar = document.querySelector('.bottomBar');
  const rightBar = document.querySelector('.rightBar');
  const leftBar = document.querySelector('.leftBar');
  const dark = document.querySelector('.dark');
  const toggleMusic = document.querySelector('.toggleMusic');
  const xin = document.querySelector('.xin');
  const dao = document.querySelector('.dao');
  const shui = document.querySelector('.shui');
  const qiong = document.querySelector('.qiong');
  const chu = document.querySelector('.chu');
  const shi = document.querySelector('.shi');

  const themes = [
    'linear-gradient(-45deg, rgb(43, 88, 118) 0%, rgb(78, 67, 118) 100%)', // 时
    'linear-gradient(to top, #23262e 0%, #23262e 100%)', // 行
    'linear-gradient(to top, #8c8c8c 0%, #304352 100%)', // 到
    'linear-gradient(15deg, #13547a 0%, #67ada5 100%)',  // 水
    'linear-gradient(to top, #a5a99e 0%, #386b96 100%)', // 穷
    'linear-gradient(to top, #09203f 0%, #537895 100%)', // 处
  ]

  function getBarThemes(direction) {
    const topBarThemes = [
      `linear-gradient(${direction}, rgb(43, 88, 118) 0%, rgb(78, 67, 118) 100%)`,
      `linear-gradient(${direction}, #23262e 0%, #23262e 100%)`,
      `linear-gradient(${direction}, #8c8c8c 0%, #304352 100%)`,
      `linear-gradient(${direction}, #13547a 0%, #67ada5 100%)`,
      `linear-gradient(${direction}, #a5a99e 0%, #386b96 100%)`,
      `linear-gradient(${direction}, #09203f 0%, #537895 100%)`,
    ];
    return topBarThemes;
  }

  let flag = 0;
  profilepic.onclick = function () {
    if (flag >= themes.length - 1) {
      flag = 0
    } else {
      flag++;
    }
    container.style.backgroundImage = themes[flag];
    topBar.style.backgroundImage = getBarThemes('to top')[flag];
    bottomBar.style.backgroundImage = getBarThemes('to bottom')[flag];
    rightBar.style.backgroundImage = getBarThemes('to left')[flag];
    leftBar.style.backgroundImage = getBarThemes('to right')[flag];
    dark.style.backgroundImage = getBarThemes('to bottom')[flag];
    toggleMusic.style.backgroundImage = getBarThemes('to bottom')[flag];
  }

  function getColor(direction, color1, color2) {
    return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
  }

  xin.onclick = function (e) {
    const color1 = '#23262e';
    e.stopPropagation();
    container.style.backgroundImage = themes[1];
    topBar.style.backgroundImage = getColor('to top', color1, color1);
    bottomBar.style.backgroundImage = getColor('to bottom', color1, color1);
    rightBar.style.backgroundImage = getColor('to left', color1, color1);
    leftBar.style.backgroundImage = getColor('to right', color1, color1);
    dark.style.backgroundImage = getColor('to bottom', color1, color1);
    toggleMusic.style.backgroundImage = getColor('to bottom', color1, color1);
  }

  dao.onclick = function (e) {
    const color1 = '#8c8c8c';
    const color2 = '#304352';
    e.stopPropagation();
    container.style.backgroundImage = themes[2];
    topBar.style.backgroundImage = getColor('to top', color1, color2);
    bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
    rightBar.style.backgroundImage = getColor('to left', color1, color2);
    leftBar.style.backgroundImage = getColor('to right', color1, color2);
    dark.style.backgroundImage = getColor('to bottom', color1, color2);
    toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
  }

  shui.onclick = function (e) {
    const color1 = '#13547a';
    const color2 = '#67ada5';
    e.stopPropagation();
    container.style.backgroundImage = themes[3];
    topBar.style.backgroundImage = getColor('to top', color1, color2);
    bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
    rightBar.style.backgroundImage = getColor('to left', color1, color2);
    leftBar.style.backgroundImage = getColor('to right', color1, color2);
    dark.style.backgroundImage = getColor('to bottom', color1, color2);
    toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
  }

  qiong.onclick = function (e) {
    const color1 = '#a5a99e';
    const color2 = '#386b96';
    e.stopPropagation();
    container.style.backgroundImage = themes[4];
    topBar.style.backgroundImage = getColor('to top', color1, color2);
    bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
    rightBar.style.backgroundImage = getColor('to left', color1, color2);
    leftBar.style.backgroundImage = getColor('to right', color1, color2);
    dark.style.backgroundImage = getColor('to bottom', color1, color2);
    toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
  }

  chu.onclick = function (e) {
    const color1 = '#09203f';
    const color2 = '#537895';
    e.stopPropagation();
    container.style.backgroundImage = themes[5];
    topBar.style.backgroundImage = getColor('to top', color1, color2);
    bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
    rightBar.style.backgroundImage = getColor('to left', color1, color2);
    leftBar.style.backgroundImage = getColor('to right', color1, color2);
    dark.style.backgroundImage = getColor('to bottom', color1, color2);
    toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
  }

  shi.onclick = function (e) {
    const color1 = 'rgb(43, 88, 118)';
    const color2 = 'rgb(78, 67, 118)';
    e.stopPropagation();
    container.style.backgroundImage = themes[0];
    topBar.style.backgroundImage = getColor('to top', color1, color2);
    bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
    rightBar.style.backgroundImage = getColor('to left', color1, color2);
    leftBar.style.backgroundImage = getColor('to right', color1, color2);
    dark.style.backgroundImage = getColor('to bottom', color1, color2);
    toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
  }
}

module.exports = {
  init: init
}