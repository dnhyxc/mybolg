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
  const lightChangeInfo = document.querySelector('.lightChangeInfo');
  const tooltipToc = document.querySelector('.tooltip-toc')

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

  let timer = null;
  function showChangeInfo() {
    if (timer) clearTimeout(timer);
    lightChangeInfo.style.opacity = '1';
    timer = setTimeout(() => {
      lightChangeInfo.style.opacity = '0';
    }, 2000);
  }

  function setColor(color) {
    sessionStorage.setItem('color', color)
  }

  function setTocBgc() {
    if (tooltipToc) {
      tooltipToc.style.backgroundImage = `linear-gradient(to bottom, ${sessionStorage.getItem('color')})`
    }
  }

  xin.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('xin');
    e.stopPropagation();
    setThemes.xin();
    setColor(setThemes.themeColors.xin)
    setTocBgc()
  }

  dao.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('dao');
    e.stopPropagation();
    setThemes.dao();
    setColor(setThemes.themeColors.dao)
    setTocBgc()
  }

  shui.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('shui');
    e.stopPropagation();
    setThemes.shui();
    setColor(setThemes.themeColors.shui)
    setTocBgc()
  }

  qiong.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('qiong');
    e.stopPropagation();
    setThemes.qiong();
    setColor(setThemes.themeColors.qiong)
    setTocBgc()
  }

  chu.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('chu');
    e.stopPropagation();
    setThemes.chu();
    setColor(setThemes.themeColors.chu)
    setTocBgc()
  }

  zuo.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('zuo');
    e.stopPropagation();
    setThemes.zuo();
    setColor(setThemes.themeColors.zuo)
    setTocBgc()
  }

  kan.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('kan');
    e.stopPropagation();
    setThemes.kan();
    setColor(setThemes.themeColors.kan)
    setTocBgc()
  }

  yun.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('yun');
    e.stopPropagation();
    setThemes.yun();
    setColor(setThemes.themeColors.yun)
    setTocBgc()
  }

  qi.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('qi');
    e.stopPropagation();
    setThemes.qi();
    setColor(setThemes.themeColors.qi)
    setTocBgc()
  }

  shi.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('shi');
    e.stopPropagation();
    setThemes.shi();
    setColor(setThemes.themeColors.shi)
    setTocBgc()
  }
}

module.exports = {
  init: init
}