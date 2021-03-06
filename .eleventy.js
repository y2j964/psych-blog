const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

const dateFormatter = new Intl.DateTimeFormat("en-us", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const getDateDayMonthYear = (date) => {
  const dateArr = date.replace(",", "").split(" ");
  return `${dateArr[1]} ${dateArr[0]} ${dateArr[2]}`;
};

module.exports = function (eleventyConfig) {
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }).use(markdownItFootnote);

  // remove brackets from footnote ref return value
  markdownLibrary.renderer.rules.footnote_caption = (tokens, idx) => {
    let n = Number(tokens[idx].meta.id + 1).toString();

    if (tokens[idx].meta.subId > 0) {
      n += ":" + tokens[idx].meta.subId;
    }

    return n;
  };

  eleventyConfig.setLibrary("md", markdownLibrary);

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

  eleventyConfig.addHandlebarsHelper("ifEq", function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  eleventyConfig.addFilter("getObjectProperty", function (obj, prop) {
    return obj[prop];
  });

  eleventyConfig.addFilter("toDateString", function (date) {
    return getDateDayMonthYear(dateFormatter.format(date));
  });

  eleventyConfig.addFilter("toISOString", function (date) {
    return date.toISOString();
  });

  eleventyConfig.addFilter("getCurrentYear", function () {
    return new Date().getFullYear();
  });

  eleventyConfig.addFilter("reverse", function (arr) {
    return arr.slice().reverse();
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
