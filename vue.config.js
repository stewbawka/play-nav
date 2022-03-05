module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      host: "localhost",
      disableHostCheck: true,
      port: 8083,
      headers: { "Access-Control-Allow-Origin": "*" }
    },
    externals: [/^@discostudebaker\/.+/]
  },
};
