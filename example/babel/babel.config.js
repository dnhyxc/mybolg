const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        ie: "11",
        edge: "11",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
  // 编译typescript的配置
  "@babel/preset-typescript"
];

// 如果不使用 @babel/plugin-transform-runtime，将会在全局引入了 core-js/modules/es7.array.includes.js 等js，直接在对象的构造函数或者原型上添加方法，会出现污染全局变量的情况
const plugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: 3,
    },
  ],
  // 编译typescript的配置
  "@babel/plugin-proposal-class-properties",  // 支持类属性
  "@babel/plugin-proposal-object-rest-spread" // 支持剩余扩展操作符
]

module.exports = { presets, plugins };