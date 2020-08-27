const path = require("path");
const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.common.js");
const chokidar = require("chokidar");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  output: {
    publicPath: "/assets/",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: true },
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    before(app, server) {
      chokidar.watch(["./build/**/*.html"]).on("all", function () {
        server.sockWrite(server.sockets, "content-changed");
      });
    },
    hot: true,
    overlay: true,
    contentBase: path.resolve(__dirname, "build"),
    index: "index.html",
    host: "localhost",
    port: 3000,
    open: false,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new WebpackAssetsManifest({
      output: path.resolve(__dirname, "src", "_data", "assets.json"),
      publicPath: "/assets/",
      // writeToDisk: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
