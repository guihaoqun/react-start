/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const debug = require('debug')('app:config')
const argv = require('yargs').argv
const ip = require('ip')

// const src = path.resolve(__dirname, '../src'); // 源码目录
// const commonPath = {
//   dist: path.resolve(__dirname, '../dist'), // build 后输出目录
//   indexHTML: path.join(src, 'index.html'), // 入口基页
//   staticDir: path.resolve(__dirname, '../static') // 无需处理的静态资源目录
// };

debug('创建默认配置项')

// ========================================================
// 默认配置项
// ========================================================
const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // 文件夹配置
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // 服务端配置
  // ----------------------------------
  server_host : ip.address(), // use string 'localhost' to prevent exposure on local network
  server_port : process.env.PORT || 3000,

  // ----------------------------------
  // 编译配置
  // ----------------------------------
  compiler_babel : {
    cacheDirectory : true,
    plugins        : ['transform-runtime'],
    presets        : ['es2015', 'react', 'stage-0']
  },
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendors : [
    'react',
    'react-redux',
    'react-router',
    'redux'
  ],

  // ----------------------------------
  // 测试配置
  // ----------------------------------
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'lcov', dir : 'coverage' }
  ]
}

/************************************************
-------------------------------------------------
内部配置：配置有风险，操作需谨慎！
-------------------------------------------------
************************************************/

// ------------------------------------
// 环境变量
// ------------------------------------
// 重要提醒: 这里是全局配置， 在.eslintrc里面也必须加上
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__COVERAGE__' : !argv.watch && config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// 验证第三方的依赖
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from compiler_vendors in ~/config/index.js`
    )
  })

// ------------------------------------
// 根据参数获取路径  这个方法很吊！
// 下面的代码将会创建一个新的数组，包含所有 arguments 对象中的元素 然后 将参数从一个函数传递到另一个函数
// 另，apply, call和bind有什么区别？
// 三者都可以把一个函数应用到其他对象上，注意不是自身对象．apply,call是直接执行函数调用，
// bind是绑定，执行需要再次调用．apply和call的区别是：
// apply接受数组作为参数，call是接受逗号分隔的无限多个参数列表
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}
//bind需要先绑定，再执行,后面多次用到
config.utils_paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  dist   : base.bind(null, config.dir_dist)
}

// ========================================================
// 环境配置
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)
const environments = require('./environments')
const overrides = environments[config.env]
if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

module.exports = config
