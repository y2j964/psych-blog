module.exports = {
  isDev: process.env.NODE_ENV === "development",
  rootPath:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://stoic-joliot-29217f.netlify.app/",
};
