import { fetchResource } from "./fetchResource";

export const importHtml = async (url) => {
  const html = await fetchResource(url);
  const template = document.createElement("div");
  template.innerHTML = html;

  const scripts = template.querySelectorAll("script");

  // 获取所有 script 标签的代码
  function getExternalScripts() {
    return Promise.all(
      Array.from(scripts).map((script) => {
        const src = script.getAttribute("src");
        if (!src) {
          return Promise.resolve(script.innerHTML);
        } else {
          return fetchResource(src.startsWith("http") ? src : `${url}${src}`);
        }
      })
    );
  }

  // 获取并执行所有的 script 脚本代码
  async function execScripts() {
    const scripts = await getExternalScripts();

    // 手动构造一个 CommonJS 模块执行环境，此时会将子应用挂载到 module.exports 上。这种方式就可以不依赖子应用的名字了。
    const module = { exports: {} };
    const exports = module.exports;

    scripts.forEach((code) => {
      // eslint-disable-next-line no-eval
      eval(code);
      // 这里能通过window["micro-react-main"]拿到子应用的内容是因为在子应用打包时通过 library 打出了 umd 格式的包，最终会将 micro-react-main 挂载到 window 上
      // console.log(window["micro-react-main"]);
      // 使用 window 获取子应用的方式需要知道每个子应用的打包出来的名字，比较麻烦，因此不推荐该写法。
      // return window["micro-react-main"];
    });

    return module.exports;
  }

  return {
    template,
    getExternalScripts,
    execScripts,
  };
};
