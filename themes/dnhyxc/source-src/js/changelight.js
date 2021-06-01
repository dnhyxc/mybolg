function init() {
  const container = document.querySelector('#container');
  const toolsCol = document.querySelector('.tools-col');
  const btnctn = document.querySelector('.btnctn');
  const intrudeLess = document.querySelector('#intrude-less');
  const dark = document.querySelector('.dark');
  const toggleMusic = document.querySelector('.toggleMusic');
  const mobileDark = document.querySelector('.mobileDark');
  const toTopDark = document.querySelector('.toTopDark');

  function toggleLight() {
    if (container.getAttribute('class') === 'container') {
      container.classList.remove('container');
      sessionStorage.removeItem('container');
    } else {
      container.classList.add('container');
      sessionStorage.setItem('container', true);
    }
    if (toolsCol.getAttribute('class').includes('lightToolsCol')) {
      toolsCol.classList.remove('lightToolsCol');
      sessionStorage.removeItem('lightToolsCol');
    } else {
      toolsCol.classList.add('lightToolsCol');
      sessionStorage.setItem('lightToolsCol', true);
    }
    if (btnctn.getAttribute('class').includes('lightBtnctn')) {
      btnctn.classList.remove('lightBtnctn');
      sessionStorage.removeItem('lightBtnctn');
    } else {
      btnctn.classList.add('lightBtnctn');
      sessionStorage.setItem('lightBtnctn', true);
    }
    if (intrudeLess.getAttribute('class').includes('lightIntrudeLess')) {
      intrudeLess.classList.remove('lightIntrudeLess');
      sessionStorage.removeItem('lightIntrudeLess');
    } else {
      intrudeLess.classList.add('lightIntrudeLess');
      sessionStorage.setItem('lightIntrudeLess', true);
    }
    if (dark.getAttribute('class').includes('light')) {
      dark.classList.remove('light');
      dark.innerHTML = '白天';
      sessionStorage.removeItem('light');
    } else {
      dark.classList.add('light');
      dark.innerHTML = '炫酷';
      sessionStorage.setItem('light', true);
    }
    if (toggleMusic.getAttribute('class').includes('light')) {
      toggleMusic.classList.remove('light');
    } else {
      toggleMusic.classList.add('light');
    }
    if (mobileDark.getAttribute('class').includes('mobileLight')) {
      mobileDark.classList.remove('mobileLight');
      mobileDark.innerHTML = '白天';
      sessionStorage.removeItem('mobileLight');
    } else {
      mobileDark.classList.add('mobileLight');
      mobileDark.innerHTML = '炫酷';
      sessionStorage.setItem('mobileLight', true);
    }
    if (toTopDark.getAttribute('class').includes('mobileLight')) {
      toTopDark.classList.remove('mobileLight');
      sessionStorage.removeItem('mobileLight');
    } else {
      toTopDark.classList.add('mobileLight');
      sessionStorage.setItem('mobileLight', true);
    }
  }
  // PC端头像
  dark.onclick = function () {
    toggleLight();
  }
  // 移动端头像
  mobileDark.onclick = function () {
    toggleLight();
  }

  if (sessionStorage.getItem('light')) {
    dark.classList.add('light');
    toggleMusic.classList.add('light');
    dark.innerHTML = '炫酷';
  } else {
    dark.classList.remove('light');
    toggleMusic.classList.remove('light');
    dark.innerHTML = '白天';
  }
  if (sessionStorage.getItem('mobileLight')) {
    mobileDark.classList.add('mobileLight')
    toTopDark.classList.add('mobileLight')
    mobileDark.innerHTML = '炫酷';
  } else {
    mobileDark.classList.remove('mobileLight');
    toTopDark.classList.remove('mobileLight');
    mobileDark.innerHTML = '白天';
  }
  if (sessionStorage.getItem('container')) {
    container.classList.add('container');
  } else {
    container.classList.remove('container');
  }
  if (sessionStorage.getItem('lightBtnctn')) {
    btnctn.classList.add('lightBtnctn');
  } else {
    btnctn.classList.remove('lightBtnctn');
  }
  if (sessionStorage.getItem('lightToolsCol')) {
    toolsCol.classList.add('lightToolsCol');
  } else {
    toolsCol.classList.remove('lightToolsCol');
  }
  if (sessionStorage.getItem('lightIntrudeLess')) {
    intrudeLess.classList.add('lightIntrudeLess');
  } else {
    intrudeLess.classList.remove('lightIntrudeLess');
  }

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

  toTopDark.onclick = function () {
    const clock = setInterval(function () {
      if (document.documentElement.scrollTop !== 0) {
        document.documentElement.scrollTop -= Math.fround(document.documentElement.scrollTop / 10);
      } else {
        clearInterval(clock);
      }
    }, 10);
  }
}

module.exports = {
  init: init
}