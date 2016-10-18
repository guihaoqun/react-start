# FReact 

FFReact参考了诸多优秀的react，react-native开源项目，结合F端运营活动的特点，着重UI、组件、业务逻辑的封装，同时结合webpack热加载、模块依赖、自动构建等等；加入部分单元测试，代码覆盖率报告，代码分割等等


## 特性

待会，慢慢道来

## 需求配置

* node `^4.2.0`
* npm `^3.0.0`

## <a name="getting-started">&sect; 快速开始</a>
在开始前，希望您已通读如下资料

* [React 文档][react-doc]
* [Redux 文档][redux-doc]（看完后懵逼的请转看 [Redux 莞式教程][simple-tutorial]）
* [React Router 文档][react-router-doc]
* 推荐：[React 技术栈系列教程](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)

同时您还需要熟悉 ES6  [推荐] (http://es6.ruanyifeng.com/)

## 开始

确认好你的环境配置，然后就可以开始以下步骤。

```bash
$ git clone http://10.20.11.218/FFYunYing/FFReact.git
$ cd FFReact
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```

## 常用操作命令

|`npm run <script>`|解释|
|------------------|-----------|
|`start`|服务启动在3000端口，代码热替换开启。|
|`compile`|编译程序到dist目录下（默认目录~/dist）。|
|`dev`|与`npm start`相同, 但是启动nodemon守护进程。|
|`dev:no-debug`|与`npm run dev` 但是禁用devtool（开发工具）。|
|`test`|开启Karma测试并生成覆盖率报告。|
|`test:dev`|开启Karma测试并监听改变随时重新测试，但是生成覆盖率报告。|
|`deploy`|启动代码检查，测试，如果成功，编译到dist目录下。|
|`deploy:dev`|与`deploy`相同，但是`NODE_ENV`值为"development"。|
|`deploy:prod`|与`deploy`相同，但是`NODE_ENV`值为"production"。|
|`lint`|检查所有.js文件是否规范。|
|`lint:fix`|检查所有.js文件是否规范并修复它们。 [更多](http://eslint.org/docs/user-guide/command-line-interface.html#fix)|

## 目录结构（有调整，稍后完善）

```
.
├── bin                      # 启动脚本
├── build                    # 所有打包构建配置项
│   └── webpack              # webpack的指定环境配置文件
├── config                   # 项目配置文件
├── server                   # express 程序 (使用 webpack 中间件)
│   └── main.js              # 服务端程序入口文件
├── src                      # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── components           # 可复用的通用组件(Presentational Components)
│   ├── containers           # 可复用的通用容器组件
│   ├── layouts              # 主页结构
│   ├── static               # 静态文件(不要到处imported源文件)
│   ├── styles               # 程序样式
│   ├── store                # Redux指定块
│   │   ├── createStore.js   # 创建和使用redux store
│   │   └── reducers.js      # Reducer注册和注入
│   └── routes               # 主路由和异步分割点
│       ├── index.js         # 用store启动主程序路由
│       ├── Root.js          # 为上下文providers包住组件
│       └── Home             # 不规则路由
│           ├── index.js     # 路由定义和代码异步分割
│           ├── assets       # 组件引入的静态资源
│           ├── components   # 直观React组件
│           ├── container    # 连接actions和store
│           ├── modules      # reducers/constants/actions的集合
│           └── routes **    # 不规则子路由(** 可选择的)
└── tests                    # 单元测试
```

## 几点说明

    在本项目中，木偶组件与智能组件最大的差别在于：  
    前者的状态是通过父组件传入获得，而后者是直接**连接**到 `state` 获得  
    亦即：若一个木偶组件直接**连接**到 `state`，那么它就是一个所谓的智能组件  
    （详见 [`src/utils/createContainer.js`][createContainer] 中对 `react-redux` 的 [`connect`][connect] 函数的封装）  
    本示例项目唯一在组件的定义中自行使用 `connect` 函数的是 [`Navbar`][Navbar] 组件（且用到了 ES7 的装饰器）

有关木偶组件与智能组件更为精确的论述，推荐 Redux 作者 Dan 的[这篇文章][dan-post]，避免教条主义
## 开发工具

**推荐使用：[Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**

## 样式

所有的css和sass都支持[CSS Modules](https://github.com/css-modules/css-modules)。只要被引入，都会经过[PostCSS](https://github.com/postcss/postcss)压缩，加前缀。在生产环境下会提取到一个css文件下。

## 服务端

这个项目的服务端使用express，（下个版本的换koa）

## 打包优化

Babel 配置[babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime)可以让代码更优化。另外，在生产环境，我们使用[react-optimize](https://github.com/thejameskyle/babel-react-optimize)来优化React代码。

在生产环境下，webpack会导出一个css文件并压缩Javascript，并把js模块优化到最好的性能。
