//vue.config.js
module.exports = {
  publicPath: process.env.NODE.ENV === "production" ? "" : "",
  outputDir: process.env.NODE.ENV === "production" ? "dist" : "devDist",
  //关闭语法的自动检测
  lintOnSave: false
}