var path = require('path')
var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('tests')]
      },
      {
        test: /\.vue$/,
        loader: ['vue-loader']
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: [resolve('src'), resolve('tests')]
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    })
  ]
}
