const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");


//Пути к папкам с исходными и собранными файлами
const src = "./local/assets/src/";
const dist = "./local/assets/dist/";
const srcImg = "img";
const srcFonts = "fonts";

//Пути к точкам входа
const srcJS = {
  first: "./js/first/index.js",
  sec: "./js/sec/index.js",
};


const prodRules = [
  {
    test: /\.m?js$/,
    include: path.resolve(__dirname, src),
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: ["babel-plugin-transform-class-properties"]
      }
    }
  },
  {
    test: /\.html$/,
    include: path.resolve(__dirname, src),
    use: {
      loader: "html-loader",
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
          hmr: false,
        }
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: false
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
          sourceMap: false
        }
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: false
        }
      }
    ]
  }
];

const devRules = [
  {
    test: /\.m?js$/,
    include: path.resolve(__dirname, src),
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: ["babel-plugin-transform-class-properties"]
      }
    }
  },
  {
    test: /\.html$/,
    include: path.resolve(__dirname, src),
    use: [
      {
        loader: "html-loader",
        options: {
          interpolate: true
        }
      }
    ]
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: "file-loader",
    options: {
      outputPath: srcImg
    }
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
  }
];

const prodPlugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: "./html/first/index.html",
    filename: "./html/first/index.html",
    chunks: ["first"]
  }),
  new MiniCssExtractPlugin({
    filename: "css/[name].css"
  }),
  new CopyPlugin([
    {
      from: path.resolve(__dirname, src + srcFonts),
      to: path.resolve(__dirname, dist + srcFonts),
      force: true
    }
  ]),
];

const devPlugins = [
  new ESLintPlugin({
    files: "./js",
    cache: true,
    emitWarning: true
  }),
  new HtmlWebpackPlugin({
    template: "./html/first/index.html",
    filename: "./html/first/index.html",
    chunks: ["first"]
  }),
  new StyleLintPlugin({
    configFile: "./.stylelintrc",
    emitWarning: true,
    syntax: "scss"
  }),
  new MiniCssExtractPlugin({
    filename: "css/[name].css"
  }),
  new CopyPlugin([
    {
      from: path.resolve(__dirname, src + srcFonts),
      to: path.resolve(__dirname, dist + srcFonts),
      force: true
    },
    {
      from: path.resolve(__dirname, src + srcImg),
      to: path.resolve(__dirname, dist + srcImg),
      force: true
    }
  ])
];

module.exports = (env, options) => {
  const isDev = options.mode === "development";
  return {
    optimization: {
      minimize: !isDev,
      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    },
    stats: "errors-warnings",
    context: path.resolve(__dirname, src),
    entry: srcJS,
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname, dist),
    },
    devServer: {
      contentBase: path.resolve(__dirname, dist),
      compress: !isDev,
      hot: isDev,
      port: 3000
    },
    module: {
      rules: isDev ? devRules : prodRules
    },
    devtool: isDev ? "source-map" : false,
    plugins: isDev ? devPlugins : prodPlugins
  };
};
