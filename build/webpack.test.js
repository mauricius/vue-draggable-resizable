var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  devtool: '#inline-source-map',
  plugins: [
  	new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
