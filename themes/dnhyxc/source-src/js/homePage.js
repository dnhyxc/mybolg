import * as Utils from "./public-utils";

class Init {
  constructor() {
    this.init()
  }

  init() {
    const homePage = document.querySelector(".homePage");
    const links = homePage.querySelectorAll('.btn_link')

    if (Utils.getSSG("homePage")) {
      homePage.style.display = "none";
    }

    if (links && links.length) {
      links.forEach(i => {
        i.addEventListener('click', () => {
          console.log(i)
          Utils.setSSG("homePage", true);
          homePage.classList.add('close_home_page')
        })
      })
    }
  }
}

module.exports = {
  Init
}