import React, { useState, useContext, useEffect } from "react";

// connect创建高阶组件，注入dispatch、state
// 让组件和全局状态链接起来
export const connect = (Component) => {
    return (props = {}) => {
        const { state, setState } = useContext(appContext);
        // 强制刷新被connect组件
        const [, update] = useState({});
        // 只订阅一次
        useEffect(() => {
            store.subscribe(() => update({}));
        }, []);

        // dispatch规范setState流程
        const dispatch = (action) => {
            // console.log("dispatch");
            // console.log(setState);
            // console.log(reducer(state, action));
            setState(reducer(state, action));
        };
        return <Component {...props} dispatch={dispatch} state={state} />;
    };
};

export const appContext = React.createContext(null);

export const store = {
    state: {
      user: { name: "frank", age: 18 },
    },
    setState(newState) {
      store.state = newState;
      store.listeners.map((fn) => fn(store.state));
    },
    listeners: [],
    subscribe(fn) {
      store.listeners.push(fn);
      return () => {
        const index = store.listeners.indexOf(fn);
        store.listeners.splice(index, 1);
      };
    },
  };

  // 用reducer规范state更新(返回新的state)
// reducer就是规范state创建流程的一个函数
const reducer = (state, { type, payload }) => {
    switch (type) {
      case "updateUser":
        return {
          ...state,
          user: {
            ...state.user,
            ...payload,
          },
        };
      default:
        return state;
    }
  };