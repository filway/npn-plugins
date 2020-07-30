module.exports = {
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      "element-ui": "ELEMENT"
    }
  }
};
