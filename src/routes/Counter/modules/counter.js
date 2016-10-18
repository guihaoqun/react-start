// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  
*/
export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT] : (state, action) => state + action.payload
}

// ------------------------------------
// Reducer
// 这是一个 reducer，形式为 (state, action) => state 的纯函数
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

// ------------------------------------
// 这是一个 reducer，形式为 (state, action) => state 的纯函数。
// Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。
// state 的形式取决于你，可以是基本类型、数组、对象、
// 甚至是 Immutable.js 生成的数据结构。惟一的要点是
// 当 state 变化时需要返回全新的对象，而不是修改传入的参数。

// 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
// 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
// 下面描述了 action 如何把 state 转变成下一个 state。
// ------------------------------------
/**
  function counter(state = 0, action) {
    switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
    }
  }
*/


// ------------------------------------
// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
// ------------------------------------
/**
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
  console.log(store.getState())
);
*/


// ------------------------------------
// 改变内部 state 惟一方法是 dispatch 一个 action。
// 用store.dispatch() 将 action 传到 store
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行 
// ------------------------------------
/**
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
*/