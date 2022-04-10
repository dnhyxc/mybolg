// const wrap = document.createElement('div')
// wrap.innerHTML = '我是插入的文本'
// wrap.style.position = 'fixed'
// wrap.style.top = '26px'
// wrap.style.left = '20px'
// wrap.style.color = 'glod'
// document.body.append(wrap)

/**
 * chrome.runtime.sendMessage()
 * chrome.runtime.onMessage()
 * chrome.tts.speak()
 */


const copyToClipboard = (str) => {
  console.log(str, 'str')
  const el = document.createElement("textarea");
  el.value = str;
  // 防止唤起虚拟键盘
  el.setAttribute("readonly", "");
  // 让文本域不显示在页面可视区域内
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;

  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};


document.addEventListener('mouseup', () => {
  const txt = window.getSelection().toString()
  if (txt !== '') {
    copyToClipboard(txt)
    chrome.runtime.sendMessage(
      { text: txt },
      (res) => { }
    )
  }
})