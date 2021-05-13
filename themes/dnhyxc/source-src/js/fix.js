function init() {
	// 由于hexo分页不支持，手工美化
	var $nav = document.querySelector('#page-nav')

	let $a = document.createElement('a');
	$a.setAttribute('class', 'extend prev disabled');
	$a.setAttribute('rel', 'prev');

	if ($nav && !document.querySelector('#page-nav .extend.prev')) {
		$a.innerHTML = '<< 上一页';
		$nav.insertBefore($a, $nav.firstElementChild);
	}
	if ($nav && !document.querySelector('#page-nav .extend.next')) {
		$a.innerHTML = '下一页 >>';
		$nav.appendChild($a);
	}

	// 新窗口打开
	if (yiliaConfig && yiliaConfig.open_in_new) {
		let $a = document.querySelectorAll(('.article-entry a:not(.article-more-a)'))
		$a.forEach(($em) => {
			let target = $em.getAttribute('target');
			if (!target || target === '') {
				$em.setAttribute('target', '_blank');
			}
		})
	}
	// 目录序号
	if (yiliaConfig && yiliaConfig.toc_hide_index) {
		let $a = document.querySelectorAll(('.toc-number'))
		$a.forEach(($em) => {
			$em.style.display = 'none';
		})
	}

	// about me 转义
	var $aboutme = document.querySelector('#js-aboutme')
	if ($aboutme && $aboutme.length !== 0) {
		$aboutme.innerHTML = $aboutme.innerText
	}

}

module.exports = {
	init: init
}