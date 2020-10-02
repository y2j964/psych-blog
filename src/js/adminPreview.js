import * as assets from "../_data/assets.json";

const cssFile = assets["main.css"];
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

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

const dateFormatter = new Intl.DateTimeFormat("en-us", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const getDateDayMonthYear = (date) => {
  const dateArr = date.replace(",", "").split(" ");
  return `${dateArr[1]} ${dateArr[0]} ${dateArr[2]}`;
};

const PostPreview = createClass({
  render: function () {
    const { entry } = this.props;
    const thumbnail = entry.getIn(["data", "thumbnail"]);
    const imgSrc = thumbnail && this.props.getAsset(thumbnail);
    const thumbnailDescription = entry.getIn(["data", "thumbnailDescription"]);
    const date = entry.getIn(["data", "date"]);
    const title = entry.getIn(["data", "title"]);
    const author = entry.getIn(["data", "author"]);
    const body = entry.getIn(["data", "body"]);
    const description = entry.getIn(["data", "description"]);
    const bodyRendered = markdownLibrary.render(body || "");

    return h(
      "article",
      { className: "post" },
      h("h2", { className: "post__title" }, title),
      h("p", { className: "post__teaser" }, description),
      h(
        "div",
        { className: "post__meta" },
        h("span", {}, `${author} | `),
        h("time", {}, getDateDayMonthYear(dateFormatter.format(date)))
      ),
      h(
        "div",
        { className: "post__img-container" },
        h("img", { src: imgSrc.toString(), alt: thumbnailDescription })
      ),
      h("div", {
        className: "post__body",
        dangerouslySetInnerHTML: { __html: bodyRendered },
      }),
      h("div", { className: "tooltip-container" })
    );
  },
});

CMS.registerPreviewTemplate("blog", PostPreview);
CMS.registerPreviewStyle(cssFile);
