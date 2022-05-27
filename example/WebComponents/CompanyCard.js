class CompanyCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "closed" });
    const template = document.getElementById("companyCard");
    // cloneNode() 方法克隆所有属性以及它们的值。如果需要克隆所有后代，需要把 deep 参数设置为 true，否则设置为 false。
    const content = template.content.cloneNode(true);
    const name = content.querySelector(".name")
    const desc = content.querySelector(".desc")
    const img = content.querySelector("img")

    img.setAttribute("src", this.getAttribute("image"));
    name.innerText = this.getAttribute("name");
    desc.innerText = this.getAttribute("desc");
    shadow.appendChild(content);

    const actions = shadow.querySelector(".actions")
    const buttons = actions.querySelectorAll("button")

    buttons.forEach(i => {
      i.addEventListener('click', () => {
        switch (i.className) {
          case 'btn':
            desc.innerText = '我被点了，救救我~~~'
            break;
          case 'btn_del':
            document.body.removeChild(document.querySelector('company-card'))
            break;
          case 'btn_modName':
            document.querySelector('company-card').setAttribute('name', 'new_dnhyxc')
            break;
          case 'btn_modDesc':
            document.querySelector('company-card').setAttribute('desc', '行到水穷处，坐看云起时')
            break;
          case 'btn_modType':
            document.querySelector('company-card').setAttribute('type', 'button')
            break;
          default:
            break;
        }
      })
    })
  }

  /* 
   * 在 Class 内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
   */
  static get observedAttributes() {
    return ['name', 'desc'];  // 监听 company-card 自身上的 name 属性
  }

  // customElement 第一次被插入到 DOM 时被调用，通常用来初始化状态，事件监听，创建影子 DOM
  connectedCallback() {
    console.log('当 customElement (company-card 元素) 第一次被插入到DOM时被调用，通常用来初始化状态，事件监听，创建影子DOM');
  }

  // 当 customElement 从 DOM 移除时执行，通常用来做清理工作，例如取消事件监听和定时器
  disconnectedCallback() {
    console.log('当 customElement (company-card 元素) 从 DOM 移除时执行，通常用来做清理工作，例如取消事件监听和定时器');
  }

  // 当 customElement 被移动到新的文档时被调用
  adoptedCallback() {
    console.log('当 customElement (company-card 元素) 被移动到新的文档时被调用');
  }

  /**
   * 需要注意的是，如果需要在元素属性变化后，
   * 触发 attributeChangedCallback() 回调函数，你必须监听这个属性。
   * 这可以通过定义 observedAttributes() get 函数来实现，
   * observedAttributes() 函数体内包含一个 return 语句，返回一个数组，
   * 包含了需要监听的属性名称：
   *   - static get observedAttributes() {return ['name', 'desc']; }
   */

  // 当 customElement 增加、删除、修改自身属性时被调用
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue, 'name, oldValue, newValue');
    console.log('当 customElement (company-card 元素) 增加、删除、修改自身属性时被调用');
  }
}

window.customElements.define("company-card", CompanyCard);