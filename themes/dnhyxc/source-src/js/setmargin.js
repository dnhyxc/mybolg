function init() {
  const path = location.pathname;
  const res = decodeURIComponent(path).substr(decodeURIComponent(path));
  const jsContent = document.querySelector('#js-content');

  if ((res.includes('tags') || (res.includes('categories') && ((res.split('/')).length - 1) > 2)) && document.body.clientWidth <= 800) {
    if (jsContent.childElementCount < 2) {
      document.querySelector('#container').style.height = '100vh';
    }
  }

  const mobileDark = document.querySelector('.mobileDark');
  const toTopDark = document.querySelector('.toTopDark');

  let timer;
  document.body.onscroll = function () {
    mobileDark.style.visibility = 'visible';
    mobileDark.style.transition = 'all 0.5s';
    toTopDark.style.visibility = 'visible';
    toTopDark.style.transition = 'all 0.5s';
    clearTimeout(timer);
    timer = setTimeout(() => {
      mobileDark.style.visibility = 'hidden';
      mobileDark.style.transition = 'all 0.5s';
      toTopDark.style.visibility = 'hidden';
      toTopDark.style.transition = 'all 0.5s';
    }, 2000);
  }
}

module.exports = {
  init: init
}