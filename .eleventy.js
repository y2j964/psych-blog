const htmlmin = require("html-minifier");
const fs = require("fs");
const path = require("path");

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

  eleventyConfig.addPassthroughCopy({ "src/admin": "/admin" });

  eleventyConfig.addFilter("getObjectProperty", function (obj, prop) {
    return obj[prop];
  });

  eleventyConfig.addFilter("toDateString", function (date) {
    return date.toDateString();
  });

  eleventyConfig.addFilter("toISOString", function (date) {
    return date.toISOString();
  });

  return {
    dir: {
      input: "src/templates",
      includes: "../_includes",
      data: "../_data",
      output: "build",
    },
  };
};
