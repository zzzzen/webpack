const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Пути к папкам с исходными и собранными файлами
const src = './local/assets/src/';
const dist = './local/assets/dist/';

//Пути к точкам входа
const srcJS = {
  first: './js/first/index.js',
  sec: './js/sec/index.js',
};

//Объект с путям к точкам входа, передаваемый в вебпак
const entry = {};
entry[srcJS.first] = srcJS.first;
entry[srcJS.sec] = srcJS.sec;

module.exports = {
  context: path.resolve(__dirname, src),
  entry: entry,
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, dist),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, src),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, src),
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        },

      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './html/first/index.html',
      filename: './html/first/index.html',
      chunks: []
    }),
  ]
};
