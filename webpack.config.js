const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require("autoprefixer");

//Проверка на тип сборки
const isDev = process.env.NODE_ENV === 'production';

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
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, src),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  grid: true
                })
              ],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './html/first/index.html',
      filename: './html/first/index.html',
      chunks: []
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
