import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMNET":
      return state - 1;
    default:
      throw new Error("Unhandled action");
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);
  const onIncrease = () => {
    dispatch({
      type: "INCREMENT"
    });
  };
  const onDecrease = () => {
    dispatch({
      type: "DECREMENT"
    });
  };
}
