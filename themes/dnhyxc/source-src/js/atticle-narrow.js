function init() {
  const article = document.querySelector('.article-entry');
  const changeSize = document.querySelector('.changeSize');
  const articleToc = document.querySelector('.article-toc');
  const headerToc = document.querySelector('.wrap-side-operation');
  const changeInfo = document.querySelector('.change-info');

  changeSize.onclick = function () {
    if (document.body.clientWidth > 800 && changeSize) {
      article.classList.toggle('narrow');
    }

    if (article.getAttribute('class').includes('narrow')) {
      articleToc.style.display = 'block';
      headerToc.style.display = 'none';
      changeInfo.style.right = "75px";
    } else {
      articleToc.style.display = 'none';
      headerToc.style.display = 'block';
      changeInfo.style.right = "120px";
    }
  }
}

module.exports = {
  init: init
}