import React from "react";
import { useContext, useReducer } from "react";

const initState = {
  name: "dnhyxc",
  age: 18,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "EDITNAME":
      return { ...prevState, name: action.value };
    case "ADDAGE":
      return { ...prevState, age: action.value };
    default:
      break;
  }
};

const GlobalContext = React.createContext();

const { Provider } = GlobalContext;

const Child = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const onChangeName = () => {
    dispatch({
      type: "EDITNAME",
      value: "902209",
    });
  };

  const onResetName = () => {
    dispatch({
      type: "EDITNAME",
      value: "dnhyxc",
    });
  };

  return (
    <div>
      Child-{state.name}-{state.age}
      <button onClick={onChangeName}>edit name</button>
      <button onClick={onResetName}>reset name</button>
    </div>
  );
};

const Sub = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const onAddAge = () => {
    dispatch({
      type: "ADDAGE",
      value: state.age + 1,
    });
  };

  const onResetAge = () => {
    dispatch({
      type: "ADDAGE",
      value: 18,
    });
  };

  return (
    <div>
      sub-{state.name}-{state.age}
      <button onClick={onAddAge}>add age</button>
      <button onClick={onResetAge}>reset age</button>
    </div>
  );
};

const HowToUseContext = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Provider value={{ state, dispatch }}>
      <div style={{ padding: "10px 0", fontSize: "20px" }}>
        how to use context
      </div>
      <Child />
      <Sub />
    </Provider>
  );
};

export default HowToUseContext;
