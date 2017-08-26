const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'js'),
  entry: {
    index: './index.js',
    vendor: [
      'jquery',
      'slick-carousel',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../js/'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }]
    },{
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: 'jQuery'
      },{
        loader: 'expose-loader',
        options: '$'
      }]
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
    })
  ],
};

