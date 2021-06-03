import * as setThemes from './setThemes';

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
  const zuo = document.querySelector('.zuo');
  const kan = document.querySelector('.kan');
  const yun = document.querySelector('.yun');
  const qi = document.querySelector('.qi');
  const shi = document.querySelector('.shi');

  const themes = setThemes.themes;

  function getBarThemes(direction) {
    const topBarThemes = [
      `linear-gradient(${direction}, #23262e 0%, #23262e 100%)`,
      `linear-gradient(${direction}, rgb(43, 88, 118) 0%, rgb(78, 67, 118) 100%)`,
      `linear-gradient(${direction}, #8c8c8c 0%, #304352 100%)`,
      `linear-gradient(${direction}, #13547a 0%, #67ada5 100%)`,
      `linear-gradient(${direction}, #a5a99e 0%, #386b96 100%)`,
      `linear-gradient(${direction}, #09203f 0%, #537895 100%)`,
      `linear-gradient(${direction}, #3c6382 0%, #3c6382 100%)`,
      `linear-gradient(${direction}, #535c68 0%, #535c68 100%)`,
      `linear-gradient(${direction}, #336750 0%, #1b6950 100%)`,
      `linear-gradient(${direction}, #60a3bc 0%, #60a3bc 100%)`,
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

  async function changeSSItems(type) {
    const actionType = ['xin', 'dao', 'shui', 'qiong', 'chu', 'zuo', 'kan', 'yun', 'qi', 'shi'];
    await actionType.filter(i => i !== type).forEach(i => {
      sessionStorage.removeItem(i);
    })
    actionType.filter(i => i === type).forEach(i => {
      sessionStorage.setItem(i, true);
    })
  }

  xin.onclick = function (e) {
    changeSSItems('xin');
    e.stopPropagation();
    setThemes.xin();
  }

  dao.onclick = function (e) {
    changeSSItems('dao');
    e.stopPropagation();
    setThemes.dao();
  }

  shui.onclick = function (e) {
    changeSSItems('shui');
    e.stopPropagation();
    setThemes.shui();
  }

  qiong.onclick = function (e) {
    changeSSItems('qiong');
    e.stopPropagation();
    setThemes.qiong();
  }

  chu.onclick = function (e) {
    changeSSItems('chu');
    e.stopPropagation();
    setThemes.chu();
  }

  zuo.onclick = function (e) {
    changeSSItems('zuo');
    e.stopPropagation();
    setThemes.zuo();
  }

  kan.onclick = function (e) {
    changeSSItems('kan');
    e.stopPropagation();
    setThemes.kan();
  }

  yun.onclick = function (e) {
    changeSSItems('yun');
    e.stopPropagation();
    setThemes.yun();
  }

  qi.onclick = function (e) {
    changeSSItems('qi');
    e.stopPropagation();
    setThemes.qi();
  }

  shi.onclick = function (e) {
    changeSSItems('shi');
    e.stopPropagation();
    setThemes.shi();
  }
}

module.exports = {
  init: init
}