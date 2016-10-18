const express = require('express')
// 此处暂用debug工具：https://github.com/visionmedia/debug
// 推荐用使用node-inspector工具调试：https://github.com/node-inspector/node-inspector
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')

const app = express()
const paths = config.utils_paths

// 这里复写所有的路由请求，默认路由到根目录下的index.html，而不是到文件夹，
// 如果考虑用前后端普适渲染，可以注释这里
app.use(require('connect-history-api-fallback')())

// ------------------------------------
// Webpack HMR 热模块更换中间件
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('允许webpack开发环境和HMR')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : paths.client(),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(paths.client('static')))
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.dist()))
}

module.exports = app
