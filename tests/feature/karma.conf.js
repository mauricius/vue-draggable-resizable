var path = require('path')
var webpackConfig = require('../../webpack.test')

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'chai'],
    // reporters: ['spec',  'coverage'],
    port: 9876, // karma web server port
    colors: true,
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    // coverageReporter: {
    //   dir: './coverage',
    //   reporters: [
    //     { type: 'lcov', subdir: '.' },
    //     { type: 'text-summary' }
    //   ]
    // },

    reporters: ['spec', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['lcov', 'text-summary'],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
      'report-config': {
        lcov: {
          subdir: '.'
        }
      }
    }
  })
}
