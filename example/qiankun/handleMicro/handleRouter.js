import { importHtml } from "./importHtmlEntry";
import { getApps } from "./index";
import { getPrevRoute, getNextRoute } from "./rewriteRouter";

// 处理路由变化
export const handleRouter = async () => {
  /**
   * 2. 匹配子应用
   *  - 获取到当前的路由路径
   *  - 从 apps 中查找对应的路径
   */
  const apps = getApps();

  // 获取上一个应用
  const prevApp = apps.find((i) => getPrevRoute().startsWith(i.activeRule));

  if (prevApp) {
    await unmount(prevApp);
  }

  // 获取下一个应用
  const app = apps.find((i) => getNextRoute().startsWith(i.activeRule));

  if (!app) return;

  /**
   * 3. 加载子应用
   *  - 请求获取子应用的资源：HTML、CSS、JS。请求方式可以使用 fetch、ajax、axios 等。
   */
  // const html = await fetch(app.entry).then((res) => res.text());
  // const container = document.querySelector(app.container);
  /**
   * 1. 客户端渲染需要通过执行 JS 来生成内容
   * 2. 浏览器出于安全考虑，innerHTML 中的 script 不会加载执行，要想执行其中的代码，需要通过 evel() 方法或者 new Function 执行。
   */
  // container.innerHTML = html;
  const container = document.querySelector(app.container);

  // 4. 渲染子应用
  const { template, execScripts } = await importHtml(app.entry);

  container.appendChild(template);

  // 配置全局环境变量
  window.__POWERED_BY_QIANKUN__ = true;
  // 设置该全局变量用于解决子应用中图片无法加载出来的问题
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = `${app.entry}/`;

  const appExports = await execScripts();
  // 将从 module.exports 中获取到的 bootstrap、mount、unmount设置到 app 上。
  app.bootstrap = appExports.bootstrap;
  app.mount = appExports.mount;
  app.unmount = appExports.unmount;

  // 调用从 module.exports 中获取到的子应用中定义的 bootstrap 方法。
  await bootstrap(app);
  // 调用从 module.exports 中获取到的子应用中定义的 mount 方法。
  await mount(app);
};

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}

async function mount(app) {
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }));
}

async function unmount(app) {
  app.unmount &&
    (await app.unmount({
      container: document.querySelector(app.container),
    }));
}
