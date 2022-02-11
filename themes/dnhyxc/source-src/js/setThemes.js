import * as Utils from "./public-utils";
const container = document.querySelector('#container');
const dark = document.querySelector('.dark');
const toggleMusic = document.querySelector('.toggleMusic');
const mobileDark = document.querySelector('.mobileDark');
const toTopDark = document.querySelector('.toTopDark');
const btnctn = document.querySelector('.btnctn');
const menuText = document.querySelectorAll('.menu-text');
const tips_a = document.querySelectorAll('.tips-a');

const themeColors = {
  xin: 'rgb(43, 88, 118) 0%, rgb(78, 67, 118) 100%',
  dao: '#8c8c8c 0%, #304352 100%',
  shui: '#13547a 0%, #67ada5 100%',
  qiong: '#a5a99e 0%, #386b96 100%',
  chu: '#879d89 0%, #537895 100%',
  zuo: '#39707b 0%, #39707b 100%',
  kan: '#535c68 0%, #535c68 100%',
  yun: '#336750 0%, #1b6950 100%',
  qi: '#2c3e50 0%, #2c3e50 100%',
  shi: '#23262e 0%, #23262e 100%',
}

const colors = {
  xin: { color1: 'rgb(43, 88, 118)', color2: 'rgb(78, 67, 118)' },
  dao: { color1: '#8c8c8c', color2: '#304352' },
  shui: { color1: '#13547a', color2: '#67ada5' },
  qiong: { color1: '#a5a99e', color2: '#386b96' },
  chu: { color1: '#879d89', color2: '#537895' },
  zuo: { color1: '#39707b', color2: '#39707b' },
  kan: { color1: '#535c68', color2: '#535c68' },
  yun: { color1: '#336750', color2: '#336750' },
  qi: { color1: '#2c3e50', color2: '#2c3e50' },
  shi: { color1: '#23262e', color2: '#23262e' },
}

const themes = [
  `linear-gradient(-45deg, ${themeColors.xin})`, // 行
  `linear-gradient(to top, ${themeColors.dao})`, // 到
  `linear-gradient(15deg, ${themeColors.shui})`,  // 水
  `linear-gradient(to top, ${themeColors.qiong})`, // 穷
  `linear-gradient(to top, ${themeColors.chu})`, // 处
  `linear-gradient(to top, ${themeColors.zuo})`, // 坐
  `linear-gradient(to top, ${themeColors.kan})`, // 看
  `linear-gradient(to top, ${themeColors.yun})`, // 云
  `linear-gradient(to top, ${themeColors.qi})`, // 起
  `linear-gradient(to top, ${themeColors.shi})`, // 时
]

function getColor(direction, color1, color2) {
  return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
}

const textColor = {
  0: '#ddd',
  1: '#fff',
  2: '#000',
  3: '#000',
  4: '#000',
  5: '#fff',
  6: '#ddd',
  7: '#ddd',
  8: '#c9c9c9',
  9: '#c9c9c9',
}

function setBgcThemes(index, name) {
  menuText.forEach(i => {
    i.firstElementChild.classList.add('restColor')
  })
  tips_a.forEach(i => {
    i.classList.add('restColor')
  })
  dark.classList.add('restColor')
  toggleMusic.classList.add('restColor')
  container.style.color = textColor[index];
  container.style.backgroundImage = themes[index];
  mobileDark.style.backgroundImage = getColor('to bottom', colors[name].color1, colors[name].color2);
  toTopDark.style.backgroundImage = getColor('to bottom', colors[name].color1, colors[name].color2);
  btnctn.style.backgroundImage = getColor('to top', colors[name].color1, colors[name].color2);
}

function initSetThemes() {
  if (Utils.getSSG("xin")) {
    setBgcThemes(0, 'xin')
  } else if (Utils.getSSG("dao")) {
    setBgcThemes(1, 'dao')
  } else if (Utils.getSSG("shui")) {
    setBgcThemes(2, 'shui')
  } else if (Utils.getSSG("qiong")) {
    setBgcThemes(3, 'qiong')
  } else if (Utils.getSSG("chu")) {
    setBgcThemes(4, 'chu')
  } else if (Utils.getSSG("zuo")) {
    setBgcThemes(5, 'zuo')
  } else if (Utils.getSSG("kan")) {
    setBgcThemes(6, 'kan')
  } else if (Utils.getSSG("yun")) {
    setBgcThemes(7, 'yun')
  } else if (Utils.getSSG("qi")) {
    setBgcThemes(8, 'qi')
  } else {
    setBgcThemes(9, 'shi')
  }
}

module.exports = {
  themes: themes,
  themeColors: themeColors,
  colors: colors,
  initSetThemes,
  setBgcThemes
}
