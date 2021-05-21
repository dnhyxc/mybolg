function init() {
  const article = document.querySelector('.article-entry');
  const changeSize = document.querySelector('.changeSize');
  const articleToc = document.querySelector('.article-toc');
  const headerToc = document.querySelector('.wrap-side-operation');

  changeSize.onclick = function () {
    if (document.body.clientWidth > 800 && changeSize) {
      article.classList.toggle('narrow');
    }

    if (article.getAttribute('class').includes('narrow')) {
      articleToc.style.display = 'block';
      headerToc.style.display = 'none';
      // changeSize.style.marginRight = '30px';
    } else {
      articleToc.style.display = 'none';
      headerToc.style.display = 'block';
      // changeSize.style.marginRight = '77px';
    }
  }
}

module.exports = {
  init: init
}