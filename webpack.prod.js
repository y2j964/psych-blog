const path = require("path");
const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  output: {
    filename: "assets/[name].[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/[name].[chunkhash].css",
    }),
    new WebpackAssetsManifest({
      output: path.resolve(__dirname, "src", "_data/assets.json"),
      publicPath: "/",
      writeToDisk: true,
      apply(manifest) {
        manifest.set("year", new Date().getFullYear());
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
      }),
    ],
  },
});
