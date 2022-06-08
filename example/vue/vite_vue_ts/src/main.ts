import { createApp } from "vue";
import "./styles/element.scss";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn
});

app.mount("#app");
