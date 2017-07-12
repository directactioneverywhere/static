var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: "./src/fundraiser.js",
  output: {
    path: path.join(__dirname, 'out'),
    filename: "fundraiser.js",
    library: "fundraiser",
    libraryTarget: "var",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve('src'),
        ],
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ]);
}
