const webpack = require('webpack')
const debug = require('debug')('app:build:webpack-compiler')
const config = require('../config')

function webpackCompiler (webpackConfig, statsFormat) {
  statsFormat = statsFormat || config.compiler_stats

  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      if (err) {
        debug('webpack编译 致命错误！！.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      debug('Webpack compile completed.')
      debug(stats.toString(statsFormat))

      if (jsonStats.errors.length > 0) {
        debug('webpack编译出错！.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('webpack编译出错！'))
      } else if (jsonStats.warnings.length > 0) {
        debug('webpack编译报警.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('编译无错，无报警')
      }
      resolve(jsonStats)
    })
  })
}

module.exports = webpackCompiler
