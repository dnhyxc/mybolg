const ap = new APlayer({
  container: document.getElementById('aplayer'),
  autoplay: false, //自动播放
  listFolded: true, //播放列表默认折叠
  listMaxHeight: '280px', //播放列表最大高度
  order: 'list', //音频循环顺序, 可选值: 'list', 'random'
  loop: 'all', //音频循环播放, 可选值: 'all', 'one', 'none'
  theme: '#666', //切换音频时的主题色，优先级低于audio.theme
  preload: 'none', //音频预加载，可选值: 'none', 'metadata', 'auto'
  mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
  lrcType: 3, //歌词格式，可选值：3（LRC文件歌词格式），1（JS字符串歌词格式）
  volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
  fixed: true, //吸底模式（fixed:true），迷你模式（mini:true），普通模式（注释此行或者设置fixed:false）
  audio: [
    {
      name: "这世界那么多人",
      artist: '莫文蔚',
      lrc: '/downloads/musicLrc/zsjnmdr.lrc',
      url: '/downloads/musicUrl/zsjnmdr.mp3',
      cover: '/downloads/musicCover/zsjnmdr.jpg',
    },
    {
      name: "空山新雨后",
      artist: '音阙诗听-锦零',
      lrc: '/downloads/musicLrc/ksxyh.lrc',
      url: '/downloads/musicUrl/ksxyh.mp3',
      cover: '/downloads/musicCover/ksxyh.jpg',
    },
    {
      name: "漫长的告白",
      artist: '双笙',
      lrc: '/downloads/musicLrc/mcdgb.lrc',
      url: '/downloads/musicUrl/mcdgb.mp3',
      cover: '/downloads/musicCover/mcdgb.jpg',
    },
    {
      name: "昨夜书",
      artist: '许嵩',
      lrc: '/downloads/musicLrc/zys.lrc',
      url: '/downloads/musicUrl/zys.m4a',
      cover: '/downloads/musicCover/zys.jpg',
    },
    {
      name: "旅行",
      artist: '许巍',
      lrc: '/downloads/musicLrc/lx.lrc',
      url: '/downloads/musicUrl/lx.mp3',
      cover: '/downloads/musicCover/lx.jpg',
    },
    {
      name: "亲爱的旅人啊 (Cover: 木村弓)",
      artist: '周深',
      lrc: '/downloads/musicLrc/qadlr.lrc',
      url: '/downloads/musicUrl/qadlr.mp3',
      cover: '/downloads/musicCover/love.jpeg',
    },
    {
      name: "定风波",
      artist: '谭咏麟',
      lrc: '/downloads/musicLrc/dfb.lrc',
      url: '/downloads/musicUrl/dfb.mp3',
      cover: '/downloads/musicCover/dfb.jpg',
    },
    {
      name: '白月光与朱砂痣',
      artist: '大籽',
      lrc: '/downloads/musicLrc/bygzsz.lrc',
      url: '/downloads/musicUrl/bygzsz.mp3',
      cover: '/downloads/musicCover/byg.jpg',
    },
    {
      name: '星辰大海',
      artist: '黄霄雲',
      lrc: '/downloads/musicLrc/xcdh.lrc',
      url: '/downloads/musicUrl/xcdh.mp3',
      cover: '/downloads/musicCover/xcdh.jpg',
    },
    {
      name: '千千万万',
      artist: '深海鱼子酱',
      lrc: '/downloads/musicLrc/qqww.lrc',
      url: '/downloads/musicUrl/qqww.mp3',
      cover: '/downloads/musicCover/qqww.jpg',
    },
  ]
});

const aplayerMiniswitcher = document.querySelector('.aplayer-miniswitcher');
const aplayerLrc = document.querySelector('.aplayer-lrc');
const aplayerBody = document.querySelector('.aplayer-body');
const aplayerList = document.querySelector('.aplayer-list');
const aplayer = document.querySelector('#aplayer');
const changeInfo = document.querySelector('.changeInfo');
const lightChangeInfo = document.querySelector('.lightChangeInfo');

const list = aplayerList.querySelectorAll('li');

list.forEach(i => {
  i.onclick = function () {
    aplayerList.classList.add('aplayer-list-hide');
  }
})

aplayerMiniswitcher.addEventListener('click', function () {
  aplayerBody.classList.toggle('showBody');
  aplayerLrc.classList.toggle('hideLrc');
  if (!aplayerList.getAttribute('class').includes('.aplayer-list-hide')) {
    aplayerList.classList.add('aplayer-list-hide');
  }
})

// 隐藏body aplayer.classList.add("aplayer-narrow");

const toggleMusic = document.querySelector('.toggleMusic');

toggleMusic.onclick = function () {
  aplayer.classList.toggle("aplayer-narrow");
  aplayerBody.classList.toggle('showBody');
  aplayerLrc.classList.toggle('hideLrc');
  if (!aplayerList.getAttribute('class').includes('.aplayer-list-hide')) {
    aplayerList.classList.add('aplayer-list-hide');
  }
  if (aplayerBody.classList.value.includes('showBody')) {
    toggleMusic.innerHTML = '隐藏'
  } else {
    toggleMusic.innerHTML = '音乐'
  }
  changeInfo.style.display = 'none';
  lightChangeInfo.style.opacity = '0';
}