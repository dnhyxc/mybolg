// 插件的后台脚本
chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  const letter = new RegExp("^[A-Za-z]+$").test(req.text)
  if (letter) {
    chrome.tts.speak(req.text)
  }
  sendRes({ msg: 'ok' })
})