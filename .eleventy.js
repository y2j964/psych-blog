const htmlmin = require("html-minifier");
const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("getObjectProperty", function (obj, prop) {
    return obj[prop];
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.NODE_ENV === "production" &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      input: "src/pages",
      includes: "../_includes",
      data: "../_data",
      output: "build",
    },
    dataTemplateEngine: "hbs",
  };
};
