const container = document.querySelector('#container');
const topBar = document.querySelector('.topBar');
const bottomBar = document.querySelector('.bottomBar');
const rightBar = document.querySelector('.rightBar');
const leftBar = document.querySelector('.leftBar');
const dark = document.querySelector('.dark');
const toggleMusic = document.querySelector('.toggleMusic');

const themes = [
  'linear-gradient(to top, #23262e 0%, #23262e 100%)', // 行
  'linear-gradient(-45deg, rgb(43, 88, 118) 0%, rgb(78, 67, 118) 100%)', // 时
  'linear-gradient(to top, #8c8c8c 0%, #304352 100%)', // 到
  'linear-gradient(15deg, #13547a 0%, #67ada5 100%)',  // 水
  'linear-gradient(to top, #a5a99e 0%, #386b96 100%)', // 穷
  'linear-gradient(to top, #09203f 0%, #537895 100%)', // 处
  'linear-gradient(to top, #3c6382 0%, #3c6382 100%)', // 坐
  'linear-gradient(to top, #535c68 0%, #535c68 100%)', // 看
  'linear-gradient(to top, #336750 0%, #1b6950 100%)', // 云
  'linear-gradient(to top, #60a3bc 0%, #60a3bc 100%)', // 起
]

function getColor(direction, color1, color2) {
  return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
}

function xin() {
  const color1 = 'rgb(43, 88, 118)';
  const color2 = 'rgb(78, 67, 118)';
  container.style.backgroundImage = themes[1];
  topBar.style.backgroundImage = getColor('to top', color1, color2);
  bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
  rightBar.style.backgroundImage = getColor('to left', color1, color2);
  leftBar.style.backgroundImage = getColor('to right', color1, color2);
  dark.style.backgroundImage = getColor('to bottom', color1, color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
}

function dao() {
  const color1 = '#8c8c8c';
  const color2 = '#304352';
  container.style.backgroundImage = themes[2];
  topBar.style.backgroundImage = getColor('to top', color1, color2);
  bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
  rightBar.style.backgroundImage = getColor('to left', color1, color2);
  leftBar.style.backgroundImage = getColor('to right', color1, color2);
  dark.style.backgroundImage = getColor('to bottom', color1, color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
}

function shui() {
  const color1 = '#13547a';
  const color2 = '#67ada5';
  container.style.backgroundImage = themes[3];
  topBar.style.backgroundImage = getColor('to top', color1, color2);
  bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
  rightBar.style.backgroundImage = getColor('to left', color1, color2);
  leftBar.style.backgroundImage = getColor('to right', color1, color2);
  dark.style.backgroundImage = getColor('to bottom', color1, color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
}

function qiong() {
  const color1 = '#a5a99e';
  const color2 = '#386b96';
  container.style.backgroundImage = themes[4];
  topBar.style.backgroundImage = getColor('to top', color1, color2);
  bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
  rightBar.style.backgroundImage = getColor('to left', color1, color2);
  leftBar.style.backgroundImage = getColor('to right', color1, color2);
  dark.style.backgroundImage = getColor('to bottom', color1, color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
}

function chu() {
  const color1 = '#09203f';
  const color2 = '#537895';
  container.style.backgroundImage = themes[5];
  topBar.style.backgroundImage = getColor('to top', color1, color2);
  bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
  rightBar.style.backgroundImage = getColor('to left', color1, color2);
  leftBar.style.backgroundImage = getColor('to right', color1, color2);
  dark.style.backgroundImage = getColor('to bottom', color1, color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
}

function zuo() {
  const color1 = '#3c6382';
  const color2 = '#3c6382';
  container.style.backgroundImage = themes[6];
  topBar.style.backgroundImage = getColor('to top', color1, color2);
  bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
  rightBar.style.backgroundImage = getColor('to left', color1, color2);
  leftBar.style.backgroundImage = getColor('to right', color1, color2);
  dark.style.backgroundImage = getColor('to bottom', color1, color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
}

function kan() {
  const color1 = '#535c68';
  const color2 = '#535c68';
  container.style.backgroundImage = themes[7];
  topBar.style.backgroundImage = getColor('to top', color1, color2);
  bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
  rightBar.style.backgroundImage = getColor('to left', color1, color2);
  leftBar.style.backgroundImage = getColor('to right', color1, color2);
  dark.style.backgroundImage = getColor('to bottom', color1, color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
}

function yun() {
  const color1 = '#336750';
  const color2 = '#1b6950';
  container.style.backgroundImage = themes[8];
  topBar.style.backgroundImage = getColor('to top', color1, color2);
  bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
  rightBar.style.backgroundImage = getColor('to left', color1, color2);
  leftBar.style.backgroundImage = getColor('to right', color1, color2);
  dark.style.backgroundImage = getColor('to bottom', color1, color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
}

function qi() {
  const color1 = '#60a3bc';
  const color2 = '#60a3bc';
  container.style.backgroundImage = themes[9];
  topBar.style.backgroundImage = getColor('to top', color1, color2);
  bottomBar.style.backgroundImage = getColor('to bottom', color1, color2);
  rightBar.style.backgroundImage = getColor('to left', color1, color2);
  leftBar.style.backgroundImage = getColor('to right', color1, color2);
  dark.style.backgroundImage = getColor('to bottom', color1, color2);
  toggleMusic.style.backgroundImage = getColor('to bottom', color1, color2);
}

function shi() {
  const color1 = '#23262e';
  container.style.backgroundImage = themes[0];
  topBar.style.backgroundImage = getColor('to top', color1, color1);
  bottomBar.style.backgroundImage = getColor('to bottom', color1, color1);
  rightBar.style.backgroundImage = getColor('to left', color1, color1);
  leftBar.style.backgroundImage = getColor('to right', color1, color1);
  dark.style.backgroundImage = getColor('to bottom', color1, color1);
  toggleMusic.style.backgroundImage = getColor('to bottom', color1, color1);
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
}