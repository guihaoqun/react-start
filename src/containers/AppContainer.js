import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router' // hashHistory ?
import { Provider } from 'react-redux'
/*
  默认容器，类似虚拟webviews，用于帮助管理routes、history和store.

  react-redux提供两个关键模块：Provider和connect；
  Provider：这个模块是作为整个App的容器，在你原有的App Container的基础上再包上一层，
  它的工作很简单，就是接受Redux的store作为props，并将其声明为context的属性之一，
  子组件可以在声明了contextTypes之后可以方便的通过this.context.store访问到store。
  不过我们的组件通常不需要这么做，将store放在context里，是为了给下面的connect用的。
  简单说：把App和redux建立起联系。把store和视图绑定在了一起，这里的Store就是那个唯一的State树。
  当Store发生改变的时候，整个App就可以作出对应的变化

  connect：这个模块是算是真正意义上连接了Redux和React。
  Redux的运作：首先store中维护了一个state，我们dispatch一个action，接下来reducer根据这个action更新state。
  映射到我们的React应用中，store中维护的state就是我们的app state，一个React组件作为View层，做两件事：
  render和响应用户操作。于是connect就是将store中的必要数据作为props传递给React组件来render，
  并包装action creator用于在响应用户操作时dispatch一个action。

  container 的理解问题。有些人不建议使用？！！

  Router组件本身只是一个容器，真正的路由要通过Route组件定义。

  hashHistory表示:路由的切换由URL的hash变化决定，即URL的#部分发生变化。
  举例来说，用户访问http://www.example.com/，实际会看到的是http://www.example.com/#/
 */

class AppContainer extends Component {
  static propTypes = {// 组件中需要这样子声明
    history : PropTypes.object.isRequired,
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
