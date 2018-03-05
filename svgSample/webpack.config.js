const webpack = require('webpack');
const path = require('path');

module.exports = [{

  entry: {
    index: './resource/js/index.js',
    vendor: ['jquery','slick-carousel']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './webroot/js')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]

}];