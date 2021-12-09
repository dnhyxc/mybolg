import * as setThemes from './setThemes';
import * as Utils from './public-utils'

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
      Utils.removeSSG(i);
    })
    actionType.filter(i => i === type).forEach(i => {
      Utils.setSSG(i, true);
    })
  }

  function isLight() {
    if (Utils.getSSG('container')) {
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
    Utils.setSSG('color', color)
  }

  function setTocBgc() {
    if (tooltipToc) {
      tooltipToc.style.backgroundImage = `linear-gradient(to bottom, ${Utils.getSSG('color')})`
    }
  }

  xin.onclick = function (e) {
    if (isLight()) {
      showChangeInfo();
      return
    };
    changeSSItems('xin');
    e.stopPropagation();
    setThemes.setBgcThemes(0, 'xin');
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
    setThemes.setBgcThemes(1, 'dao');
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
    setThemes.setBgcThemes(2, 'shui');
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
    setThemes.setBgcThemes(3, 'qiong');
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
    setThemes.setBgcThemes(4, 'chu');
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
    setThemes.setBgcThemes(5, 'zuo');
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
    setThemes.setBgcThemes(6, 'kan');
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
    setThemes.setBgcThemes(7, 'yun');
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
    setThemes.setBgcThemes(8, 'qi');
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
    setThemes.setBgcThemes(9, 'shi');
    setColor(setThemes.themeColors.shi)
    setTocBgc()
  }
}

module.exports = {
  init: init
}
