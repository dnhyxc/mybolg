function init() {
    const tooltipToc = document.querySelector('.tooltip-toc')
    const links = document.querySelectorAll('.toc-link')
    links.forEach(i => {
        i.addEventListener('click', () => {
            links.forEach(i => i.style.color = '#ddd')
            i.style.color = '#ffd900'
            i.style.fontWeight = '700'
        })
    })

    if (tooltipToc) {
        tooltipToc.style.backgroundImage = `linear-gradient(to bottom, ${sessionStorage.getItem('color')})`
    }
}

module.exports = {
    init: init
}