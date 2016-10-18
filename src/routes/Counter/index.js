import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'counter',
  // 路由匹配到counter后，将会异步调用getComponent
  getComponent (nextState, cb) {
    // Webpack require.ensure在需要的时候才下载依赖的模块，
    // 当参数指定的模块都下载下来了（下载下来的模块还没执行），便执行参数指定的回调函数
    // 参考：http://blog.csdn.net/zhbhun/article/details/46826129
    require.ensure([], (require) => {
      const Counter = require('./containers/CounterContainer').default
      const reducer = require('./modules/counter').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'counter', reducer })

      /*  Return getComponent   */
      cb(null, Counter)
      
    }, 'counter')
  }
})
