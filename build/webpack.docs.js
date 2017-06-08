const path = require('path')
var webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: {
    'app.min' : '../docs/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../docs', 'resources'),
    filename: '[name].js',
    publicPath: '/resources/',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loaders: 'vue-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    })
  ]
};