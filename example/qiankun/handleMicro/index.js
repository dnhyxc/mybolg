import { handleRouter } from "./handleRouter";
import { rewriteRouter } from "./rewriteRouter";

// 注册子应用方法
let _apps = [];

export const getApps = () => _apps;

export const registerMicroApps = (apps) => {
  _apps = apps;
};

export const start = () => {
  rewriteRouter();

  // 初始化时手动执行匹配
  handleRouter();
};
