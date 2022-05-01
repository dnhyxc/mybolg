import { handleRouter } from "./handleRouter";

/**
 * 1. 监视路由变化
 *  - hash 路由：使用 window.onhashchange 方法监视
 *  - history 路由：
 *    - history.go、history.back、history.forword 使用 popstate 事件进行监视。
 *    - pushState、replaceState 需要通过函数重写的方式进行劫持。
 */

let prevRoute = ""; // 上一个路由
let nextRoute = window.location.pathname; // 下一个路由

export const getPrevRoute = () => prevRoute;
export const getNextRoute = () => nextRoute;

export const rewriteRouter = () => {
  window.addEventListener("popstate", () => {
    // popstate 事件触发时，路由已经完成导航了，因此需要通过如下方式进行设置。
    prevRoute = nextRoute;
    nextRoute = window.location.pathname;
    handleRouter();
  });

  const rawPushState = window.history.pushState;
  window.history.pushState = (...args) => {
    prevRoute = window.location.pathname;
    rawPushState.apply(window.history, args); // 执行完这句代码之后，就改变了路由的历史纪录
    nextRoute = window.location.pathname;
    handleRouter();
  };

  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    prevRoute = window.location.pathname;
    rawReplaceState.apply(window.history, args);
    nextRoute = window.location.pathname;
    handleRouter();
  };
};
