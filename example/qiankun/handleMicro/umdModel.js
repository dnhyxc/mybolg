// eslint-disable-next-line no-unused-expressions
!(function (e, o) {
  /**
   * e 表示 window，
   * o 表示回调函数：
   *    function () { 子应用代码 return { ... } 导出结果};
   */

  // 兼容 CommonJS 模块规范
  "object" === typeof exports && "object" === typeof module
    ? (module.exports = o())
    : // 兼容 AMD 模块规范
    "function" === typeof define && define.amd
    ? // eslint-disable-next-line no-undef
      define([], o)
    : // 也是兼容 CommonJS 模块规范
    "object" === typeof exports
    ? (exports["micro-react-main"] = o())
    : // 都不匹配的情况下设置 window[xxx] = o() 此时 window 下就会存在 micro-react-main 对象
      (e["micro-react-main"] = o());
})(window, function () {
  // 最终返回导出的结果
  return {
    a: 1,
    b: 2,
  };
});
