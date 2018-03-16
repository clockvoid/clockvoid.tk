module.exports = {
  entry: './script/script.js',
  output: {
    filename: './script.js',
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "scss-loader",
        options: {
          includePaths: ["./node_modules/mini.css/src/flavors/"]
        }
      }]
    }]
  }
};
