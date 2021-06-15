import * as setThemes from './setThemes';

function init() {
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

  async function changeSSItems(type) {
    const actionType = ['xin', 'dao', 'shui', 'qiong', 'chu', 'zuo', 'kan', 'yun', 'qi', 'shi'];
    await actionType.filter(i => i !== type).forEach(i => {
      sessionStorage.removeItem(i);
    })
    actionType.filter(i => i === type).forEach(i => {
      sessionStorage.setItem(i, true);
    })
  }

  function isLight() {
    if (sessionStorage.getItem('container')) {
      return true;
    } else {
      return false;
    }
  }

  xin.onclick = function (e) {
    if (isLight()) return;
    changeSSItems('xin');
    e.stopPropagation();
    setThemes.xin();
  }

  dao.onclick = function (e) {
    if (isLight()) return;
    changeSSItems('dao');
    e.stopPropagation();
    setThemes.dao();
  }

  shui.onclick = function (e) {
    if (isLight()) return;
    changeSSItems('shui');
    e.stopPropagation();
    setThemes.shui();
  }

  qiong.onclick = function (e) {
    if (isLight()) return;
    changeSSItems('qiong');
    e.stopPropagation();
    setThemes.qiong();
  }

  chu.onclick = function (e) {
    if (isLight()) return;
    changeSSItems('chu');
    e.stopPropagation();
    setThemes.chu();
  }

  zuo.onclick = function (e) {
    if (isLight()) return;
    changeSSItems('zuo');
    e.stopPropagation();
    setThemes.zuo();
  }

  kan.onclick = function (e) {
    if (isLight()) return;
    changeSSItems('kan');
    e.stopPropagation();
    setThemes.kan();
  }

  yun.onclick = function (e) {
    if (isLight()) return;
    changeSSItems('yun');
    e.stopPropagation();
    setThemes.yun();
  }

  qi.onclick = function (e) {
    if (isLight()) return;
    changeSSItems('qi');
    e.stopPropagation();
    setThemes.qi();
  }

  shi.onclick = function (e) {
    if (isLight()) return;
    changeSSItems('shi');
    e.stopPropagation();
    setThemes.shi();
  }
}

module.exports = {
  init: init
}