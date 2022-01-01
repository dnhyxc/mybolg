const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin()],

  devServer: {
    client: {
      overlay: false,
    },
  },
};
