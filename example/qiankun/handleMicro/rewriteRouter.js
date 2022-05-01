import { handleRouter } from "./handleRouter";

/**
 * 1. 监视路由变化
 *  - hash 路由：使用 window.onhashchange 方法监视
 *  - history 路由：
 *    - history.go、history.back、history.forword 使用 popstate 事件进行监视。
 *    - pushState、replaceState 需要通过函数重写的方式进行劫持。
 */

export const rewriteRouter = () => {
  window.addEventListener("popstate", () => {
    handleRouter();
  });

  const rawPushState = window.history.pushState;
  window.history.pushState = (...args) => {
    rawPushState.apply(window.history, args);
    handleRouter();
  };

  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    rawReplaceState.apply(window.history, args);
    handleRouter();
  };
};
