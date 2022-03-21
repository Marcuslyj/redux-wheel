// 请从课程简介里下载本代码
import React, { useState, useContext, useEffect } from "react";

const appContext = React.createContext(null);
const store = {
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

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => {
  console.log("大儿子", Math.random());
  return (
    <section>
      大儿子
      <User />
    </section>
  );
};
const 二儿子 = () => {
  console.log("二儿子", Math.random());
  return (
    <section>
      二儿子
      <UserModifier>内容</UserModifier>
    </section>
  );
};
const 幺儿子 = () => {
  console.log("幺儿子", Math.random());
  return <section>幺儿子</section>;
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

// connect创建高阶组件，注入dispatch、state
// 让组件和全局状态链接起来
const connect = (Component) => {
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
      console.log("dispatch");
      console.log(setState);
      console.log(reducer(state, action));
      setState(reducer(state, action));
    };
    return <Component {...props} dispatch={dispatch} state={state} />;
  };
};

const User = connect(() => {
  const { state, setState } = useContext(appContext);
  return <div>User:{state.user.name}</div>;
});

const _UserModifier = ({ dispatch, state, children }) => {
  const onChange = (e) => {
    dispatch({
      type: "updateUser",
      payload: { name: e.target.value },
    });
  };
  return (
    <div>
      {children}
      <input value={state.user.name} onChange={onChange} />
    </div>
  );
};

const UserModifier = connect(_UserModifier);
