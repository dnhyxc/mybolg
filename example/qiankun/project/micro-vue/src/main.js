import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import routes from "./router";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
let instance = null;

function render(props = {}) {
  const { container, routerBase } = props;

  /**
   * mode：代表路由模式
   * base：代表应用的基路径，process.env.BASE_URL是指从从环境进程中根据运行环境获取的api的base_url
   * routes：具体的路由配置列表，这个参数最核心也最关键
   */
  const router = new VueRouter({
    mode: "history",
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    routes,
  });

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log(" vue app bootstraped");
}

export async function mount(props) {
  render(props);

  // 获取主应用中传递的全局参数
  props.onGlobalStateChange((state, prev) => {
    console.log("主应用: 变更前");
    console.log(prev);
    console.log("主应用: 变更后");
    console.log(state);
  });

  // 更改主应用中传递的全局参数
  props.setGlobalState({ name: "sub-vue" });
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
