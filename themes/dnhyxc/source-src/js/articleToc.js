function init() {
  const wrapper = document.querySelector('#wrapper');
  const articleToc = document.querySelector('.article-toc');

  articleToc.onmouseover = function () {
    wrapper.style.overflow = 'hidden'
  }

  articleToc.onmouseleave = function () {
    wrapper.style.overflow = 'auto'
  }

  articleToc.onscroll = function () {
    if (wrapper.scrollHeight - wrapper.scrollTop < wrapper.clientHeight) {
      wrapper.style.overflow = 'auto'
    }
  }
}

module.exports = {
  init: init
}