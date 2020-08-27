const path = require("path");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const ImageminWebP = require("imagemin-webp");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: [
    path.resolve(__dirname, "src", "js", "main.js"),
    path.resolve(__dirname, "src", "main.css"),
  ],
  output: {
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: "./src/images/**/*.{png,jpg,jpeg}",
    //       to: "./assets/images/[name].webp",
    //     },
    //   ],
    // }),
    // new ImageminWebpackPlugin({
    //   plugins: [
    //     ImageminWebP({
    //       quality: 75,
    //     }),
    //   ],
    // }),
  ],
};
