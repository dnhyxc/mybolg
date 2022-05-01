import { getApps } from "./index";

// 处理路由变化
export const handleRouter = async () => {
  /**
   * 2. 匹配子应用
   *  - 获取到当前的路由路径
   *  - 从 apps 中查找对应的路径
   */
  const apps = getApps();

  const app = apps.find((i) =>
    window.location.pathname.startsWith(i.activeRule)
  );

  if (!app) return;

  /**
   * 3. 加载子应用
   *  - 请求获取子应用的资源：HTML、CSS、JS。请求方式可以使用 fetch、ajax、axios 等。
   */
  const html = await fetch(app.entry).then((res) => res.text());
  console.log(html);
  const container = document.querySelector(app.container);
  /**
   * 1. 客户端渲染需要通过执行 JS 来生成内容
   * 2. 浏览器出于安全考虑
   */
  container.innerHTML = html;
};
