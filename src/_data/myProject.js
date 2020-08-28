module.exports = {
  isDev: process.env.NODE_ENV === "development",
  rootPath:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://y2j964.github.io/psych-blog",
  // ending prefix should match prefix added in package.json build script
};
