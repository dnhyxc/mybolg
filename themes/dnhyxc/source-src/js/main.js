// 样式
import '../css/main.scss'
// 上报
// import './report'
// 图片查看器
// import Viewer from './viewer'
// 分享
// import Share from './share'
// 边缘
// import Aside from './aside'

import ChangeLight from './changelight'

import atticleNarrow from './atticle-narrow'

import action from './action'

import Setmargin from './setmargin'

import articleToc from './articleToc'

import changeTheme from './changeTheme'

import { addLoadEvent } from './util'

import * as setThemes from './setThemes'

const cover = document.querySelector('.cover');
const hideCoverBtn = document.querySelector('.hideCoverBtn');

addLoadEvent(function () {
	// Share.init()
	// Viewer.init();
	// Aside.init();
	Setmargin.init();
	action.init();
	ChangeLight.init();
	atticleNarrow.init();
	articleToc.init();
	changeTheme.init();
})

function stopTouchmove(e) {
	e.preventDefault();
}

document.onreadystatechange = function () {
	if (document.readyState === "complete") {
		cover.classList.add('hideCover');
		if (document.body.clientWidth <= 800) {
			document.body.style.position = 'relative';
			document.body.style.width = '100%';
			document.body.removeEventListener('touchmove', stopTouchmove, { passive: false });
		}
	} else if (document.readyState === "interactive") {
		hideCoverBtn.addEventListener('click', function () {
			cover.classList.add('hideCover');
		})
		if (sessionStorage.getItem('xin')) {
			setThemes.xin();
		} else if (sessionStorage.getItem('dao')) {
			setThemes.dao();
		} else if (sessionStorage.getItem('shui')) {
			setThemes.shui();
		} else if (sessionStorage.getItem('qiong')) {
			setThemes.qiong();
		} else if (sessionStorage.getItem('chu')) {
			setThemes.chu();
		} else if (sessionStorage.getItem('zuo')) {
			setThemes.zuo();
		} else if (sessionStorage.getItem('kan')) {
			setThemes.kan();
		} else if (sessionStorage.getItem('yun')) {
			setThemes.yun();
		} else if (sessionStorage.getItem('qi')) {
			setThemes.qi();
		} else {
			setThemes.shi();
		}
	} else {
		document.body.addEventListener('touchmove', stopTouchmove, { passive: false });
	}
}