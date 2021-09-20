function init() {
    const tooltipToc = document.querySelector('.tooltip-toc')
    const links = document.querySelectorAll('.toc-link')
    links.forEach(i => {
        i.addEventListener('click', () => {
            links.forEach(i => {
                i.classList.remove('select-toc')
            })
            i.classList.add('select-toc')
        })
    })

    if (tooltipToc) {
        tooltipToc.style.backgroundImage = `linear-gradient(to bottom, ${sessionStorage.getItem('color')})`
    }
}

module.exports = {
    init: init
}