(function () {
  const template = document.createElement("template");
  template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: sans-serif;
      text-align: center;
    }
    button {
      border: none;
      cursor: pointer;
    }
    ul {
      list-style: none;
      padding: 0;
    }
  </style>
  <h3>Raw web components</h3>
  <br>
  <h1>todo list</h1>
    <input type="text" placeholder="Add a new to do"></input>
    <button>添加</button>
  <ul id="todos"></ul>
`;

  class TodoApp extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));

      this.$todoList = this._shadowRoot.querySelector("ul");
      this.$input = this._shadowRoot.querySelector("input");

      this.todos = [];

      this.$submitButton = this._shadowRoot.querySelector("button");
      this.$submitButton.addEventListener("click", this._addTodo.bind(this));
    }

    _removeTodo(e) {
      this.todos.splice(e.detail, 1);
      this._renderTodoList();
    }

    _toggleTodo(e) {
      const todo = this.todos[e.detail];
      this.todos[e.detail] = Object.assign({}, todo, {
        checked: !todo.checked
      });
      this._renderTodoList();
    }

    _addTodo() {
      if (this.$input.value.length > 0) {
        this.todos.push({ text: this.$input.value, checked: false });
        this._renderTodoList();
        this.$input.value = "";
      }
    }

    _renderTodoList() {
      this.$todoList.innerHTML = "";

      this.todos.forEach((todo, index) => {
        let $todoItem = document.createElement("to-do-item");
        $todoItem.setAttribute("text", todo.text);

        if (todo.checked) {
          $todoItem.setAttribute("checked", "");
        }

        $todoItem.setAttribute("index", index);

        $todoItem.addEventListener("onRemove", this._removeTodo.bind(this));
        $todoItem.addEventListener("onToggle", this._toggleTodo.bind(this));

        this.$todoList.appendChild($todoItem);
      });
    }
  }

  window.customElements.define("todo-app", TodoApp);
})()