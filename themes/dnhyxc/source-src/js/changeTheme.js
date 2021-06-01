function init() {
  const profilepic = document.querySelector('.profilepic');
  const container = document.querySelector('#container');
  const topBar = document.querySelector('.topBar');
  const bottomBar = document.querySelector('.bottomBar');
  const rightBar = document.querySelector('.rightBar');
  const leftBar = document.querySelector('.leftBar');
  const dark = document.querySelector('.dark');
  const toggleMusic = document.querySelector('.toggleMusic');

  const themes = [
    'linear-gradient(-45deg, rgb(43, 88, 118) 0%, rgb(78, 67, 118) 100%)',
    'linear-gradient(to top, #23262e 0%, #23262e 100%)',
    'linear-gradient(to top, #8c8c8c 0%, #304352 100%)',
    'linear-gradient(to top, #a5a99e 0%, #386b96 100%)',
  ]

  function getBarThemes(direction) {
    const topBarThemes = [
      `linear-gradient(${direction}, rgb(43, 88, 118) 0%, rgb(78, 67, 118) 100%)`,
      `linear-gradient(${direction}, #23262e 0%, #23262e 100%)`,
      `linear-gradient(${direction}, #8c8c8c 0%, #304352 100%)`,
      `linear-gradient(${direction}, #a5a99e 0%, #386b96 100%)`,
    ];
    return topBarThemes;
  }

  let flag = 0;
  profilepic.onclick = function () {
    console.log(themes[flag], flag, themes.length);
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
}

module.exports = {
  init: init
}