// 请从课程简介里下载本代码
import React, { useState, useContext } from "react";

const appContext = React.createContext(null);
export const App = () => {
  const [appState, setAppState] = useState({
    user: { name: "frank", age: 18 },
  });
  const contextValue = { appState, setAppState };
  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <Wrapper />
  </section>
);
const 幺儿子 = () => <section>幺儿子</section>;
const User = () => {
  const contextValue = useContext(appContext);
  return <div>User:{contextValue.appState.user.name}</div>;
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

const Wrapper = () => {
  const { appState, setAppState } = useContext(appContext);
  // dispatch规范setState流程
  const dispatch = (action) => {
    setAppState(reducer(appState, action));
  };
  return <UserModifier dispatch={dispatch} state={appState} />;
};

const UserModifier = ({ dispatch, state }) => {
  const { appState, setAppState } = useContext(appContext);
  const onChange = (e) => {
    dispatch({
      type: "updateUser",
      payload: { name: e.target.value },
    });
  };
  return (
    <div>
      <input value={appState.user.name} onChange={onChange} />
    </div>
  );
};
