const container = document.querySelector('#container');
const topBar = document.querySelector('.topBar');
const bottomBar = document.querySelector('.bottomBar');
const rightBar = document.querySelector('.rightBar');
const leftBar = document.querySelector('.leftBar');
const dark = document.querySelector('.dark');
const toggleMusic = document.querySelector('.toggleMusic');

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

function xin() {
  container.style.backgroundImage = themes[0];
  // topBar.style.backgroundImage = getColor('to top', colors.xin.color1, colors.xin.color2);
  // bottomBar.style.backgroundImage = getColor('to bottom', colors.xin.color1, colors.xin.color2);
  // rightBar.style.backgroundImage = getColor('to left', colors.xin.color1, colors.xin.color2);
  // leftBar.style.backgroundImage = getColor('to right', colors.xin.color1, colors.xin.color2);
  dark.style.backgroundImage = getColor('to bottom', colors.xin.color1, colors.xin.color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', colors.xin.color1, colors.xin.color2);
}

function dao() {
  container.style.backgroundImage = themes[1];
  // topBar.style.backgroundImage = getColor('to top', colors.dao.color1, colors.dao.color2);
  // bottomBar.style.backgroundImage = getColor('to bottom', colors.dao.color1, colors.dao.color2);
  // rightBar.style.backgroundImage = getColor('to left', colors.dao.color1, colors.dao.color2);
  // leftBar.style.backgroundImage = getColor('to right', colors.dao.color1, colors.dao.color2);
  dark.style.backgroundImage = getColor('to bottom', colors.dao.color1, colors.dao.color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', colors.dao.color1, colors.dao.color2);
}

function shui() {
  container.style.backgroundImage = themes[2];
  // topBar.style.backgroundImage = getColor('to top', colors.shui.color1, colors.shui.color2);
  // bottomBar.style.backgroundImage = getColor('to bottom', colors.shui.color1, colors.shui.color2);
  // rightBar.style.backgroundImage = getColor('to left', colors.shui.color1, colors.shui.color2);
  // leftBar.style.backgroundImage = getColor('to right', colors.shui.color1, colors.shui.color2);
  dark.style.backgroundImage = getColor('to bottom', colors.shui.color1, colors.shui.color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', colors.shui.color1, colors.shui.color2);
}

function qiong() {
  container.style.backgroundImage = themes[3];
  // topBar.style.backgroundImage = getColor('to top', colors.qiong.color1, colors.qiong.color2);
  // bottomBar.style.backgroundImage = getColor('to bottom', colors.qiong.color1, colors.qiong.color2);
  // rightBar.style.backgroundImage = getColor('to left', colors.qiong.color1, colors.qiong.color2);
  // leftBar.style.backgroundImage = getColor('to right', colors.qiong.color1, colors.qiong.color2);
  dark.style.backgroundImage = getColor('to bottom', colors.qiong.color1, colors.qiong.color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', colors.qiong.color1, colors.qiong.color2);
}

function chu() {
  container.style.backgroundImage = themes[4];
  // topBar.style.backgroundImage = getColor('to top', colors.chu.color1, colors.chu.color2);
  // bottomBar.style.backgroundImage = getColor('to bottom', colors.chu.color1, colors.chu.color2);
  // rightBar.style.backgroundImage = getColor('to left', colors.chu.color1, colors.chu.color2);
  // leftBar.style.backgroundImage = getColor('to right', colors.chu.color1, colors.chu.color2);
  dark.style.backgroundImage = getColor('to bottom', colors.chu.color1, colors.chu.color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', colors.chu.color1, colors.chu.color2);
}

function zuo() {
  container.style.backgroundImage = themes[5];
  // topBar.style.backgroundImage = getColor('to top', colors.zuo.color1, colors.zuo.color2);
  // bottomBar.style.backgroundImage = getColor('to bottom', colors.zuo.color1, colors.zuo.color2);
  // rightBar.style.backgroundImage = getColor('to left', colors.zuo.color1, colors.zuo.color2);
  // leftBar.style.backgroundImage = getColor('to right', colors.zuo.color1, colors.zuo.color2);
  dark.style.backgroundImage = getColor('to bottom', colors.zuo.color1, colors.zuo.color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', colors.zuo.color1, colors.zuo.color2);
}

function kan() {
  container.style.backgroundImage = themes[6];
  // topBar.style.backgroundImage = getColor('to top', colors.kan.color1, colors.kan.color2);
  // bottomBar.style.backgroundImage = getColor('to bottom', colors.kan.color1, colors.kan.color2);
  // rightBar.style.backgroundImage = getColor('to left', colors.kan.color1, colors.kan.color2);
  // leftBar.style.backgroundImage = getColor('to right', colors.kan.color1, colors.kan.color2);
  dark.style.backgroundImage = getColor('to bottom', colors.kan.color1, colors.kan.color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', colors.kan.color1, colors.kan.color2);
}

function yun() {
  container.style.backgroundImage = themes[7];
  // topBar.style.backgroundImage = getColor('to top', colors.yun.color1, colors.yun.color2);
  // bottomBar.style.backgroundImage = getColor('to bottom', colors.yun.color1, colors.yun.color2);
  // rightBar.style.backgroundImage = getColor('to left', colors.yun.color1, colors.yun.color2);
  // leftBar.style.backgroundImage = getColor('to right', colors.yun.color1, colors.yun.color2);
  dark.style.backgroundImage = getColor('to bottom', colors.yun.color1, colors.yun.color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', colors.yun.color1, colors.yun.color2);
}

function qi() {
  container.style.backgroundImage = themes[8];
  // topBar.style.backgroundImage = getColor('to top', colors.qi.color1, colors.qi.color2);
  // bottomBar.style.backgroundImage = getColor('to bottom', colors.qi.color1, colors.qi.color2);
  // rightBar.style.backgroundImage = getColor('to left', colors.qi.color1, colors.qi.color2);
  // leftBar.style.backgroundImage = getColor('to right', colors.qi.color1, colors.qi.color2);
  dark.style.backgroundImage = getColor('to bottom', colors.qi.color1, colors.qi.color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', colors.qi.color1, colors.qi.color2);
}

function shi() {
  container.style.backgroundImage = themes[9];
  // topBar.style.backgroundImage = getColor('to top', colors.shi.color1, colors.shi.color2);
  // bottomBar.style.backgroundImage = getColor('to bottom', colors.shi.color1, colors.shi.color2);
  // rightBar.style.backgroundImage = getColor('to left', colors.shi.color1, colors.shi.color2);
  // leftBar.style.backgroundImage = getColor('to right', colors.shi.color1, colors.shi.color2);
  dark.style.backgroundImage = getColor('to bottom', colors.shi.color1, colors.shi.color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', colors.shi.color1, colors.shi.color2);
}

module.exports = {
  xin: xin,
  dao: dao,
  shui: shui,
  qiong: qiong,
  chu: chu,
  zuo: zuo,
  kan: kan,
  yun: yun,
  qi: qi,
  shi: shi,
  themes: themes,
  themeColors: themeColors,
  colors: colors,
}