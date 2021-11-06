// (function () {
//   // 请求主体传递给服务器的数据格式：FormData//x-www-form-urlencoded/json字符串/普通文本字符串/Burrer
//   let fm = new FormData()
//   fm.append('file', '')
//   fm.append('filename', '')
//   instance.post('upload_single', fm).then(data => {

//   }).catch(reason => {

//   })

//   // xxx=xxx&xxx=xxx
//   instance.post('/upload_single_base64', {
//     file: '',
//     filename: ''
//   }, {
//     herders: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// })

(function () {
  const upload = document.querySelector('#upload1')
  const upload_inp = upload.querySelector('.upload_inp')
  const upload_button_select = upload.querySelector('.upload_button.select')
  const upload_button_upload = upload.querySelector('.upload_button.upload')
  const upload_tip = upload.querySelector('.upload_tip')
  const upload_list = upload.querySelector('.upload_list')

  // 监听用户选择文件的操作
  upload_inp.addEventListener('change', function () {
    // 获取用户选择的文件
    let file = upload_inp.files[0]
    if (!file) return

    // 限制文件上传的格式
    if (!/(PNG|JPG|JPEG)/i.test(file.type)) {
      alert('只能上传PNG|JPG|JPEG格式的文件')
      return
    }
  })

  // 点击选择文件按钮，触发上传文件input框选择文件的行为
  upload_button_select.addEventListener('click', function () {
    upload_inp.click()
  })
})()