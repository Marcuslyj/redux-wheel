// 请从课程简介里下载本代码
import React, { useState, useContext, useEffect } from "react";
import { appContext, store, connect } from './redux'


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



const User = connect(state => {
  return { user: state.user }
})(({ user }) => {
  console.log('user 执行了', Math.random());
  // return <div>hihi</div>
  return <div>User:{user.name}</div>;
});

const _UserModifier = ({ dispatch, state, children }) => {
  console.log('_UserModifier 执行了', Math.random());
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

const UserModifier = connect()(_UserModifier);
