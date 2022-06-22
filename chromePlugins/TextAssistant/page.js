const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  const message = document.createElement("message");

  message.innerHTML = '复制成功'
  message.id = '_CHROME_PLUGIN_APPEND_MESSAGE_'
  message.style.position = "fixed";
  message.style.right = "50px";
  message.style.top = "100px";
  message.style.color = '#40a9ff'
  message.style.fontSize = '16px'
  message.style.width = '180px'
  message.style.height = '55px'
  message.style.display = 'flex'
  message.style.justifyContent = 'center'
  message.style.alignItems = 'center'
  message.style.backgroundColor = '#e6f7ff'
  message.style.border = '1px solid skyblue'
  message.style.borderRadius = '5px'

  el.value = str;
  el.setAttribute("readonly", "");
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
    document.body.appendChild(message);
    const appendMessage = document.body.querySelector('#_CHROME_PLUGIN_APPEND_MESSAGE_')
    if (appendMessage) {
      setTimeout(() => {
        document.body.removeChild(message)
      }, 1000)
    }
  }
};


// chrome.tabs.query(
//   { active: true, currentWindow: true },
//   function (tabs) {
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       { greeting: "hello" },
//       function (response) {
//         console.log(response.farewell);
//       });
//   });

document.addEventListener('mouseup', () => {
  const txt = window.getSelection().toString()

  if (txt !== '') {
    copyToClipboard(txt)
  }

  if (txt !== '' && txt.length < 50) {
    copyToClipboard(txt)
    chrome.runtime.sendMessage(
      { text: txt },
      (res) => {
        window.getSelection().removeAllRanges();
      }
    )
  }
})