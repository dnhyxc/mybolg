function init() {
  const ems = document.querySelectorAll('em')
  ems.forEach(i => {
    i.parentNode.classList.add('em-parent')
  })
}

module.exports = {
  init
}