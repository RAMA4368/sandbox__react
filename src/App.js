import React, {
  useRef,
  useReducer,
  useState,
  useMemo,
  useCallback
} from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  //users.active 가 true 인 것들만 가져오겠다
  return users.filter((user) => user.active).length;
}
// 변수 생성 > inputs 라는 객체 (input 박스 reset용 )
const initialState = {
  inputs: {
    username: "",
    email: "",
    age: ""
  },
  users: [
    {
      id: 1,
      username: "sue1",
      email: "sue@naver.com",
      age: "24",
      active: true
    },
    {
      id: 2,
      username: "sue2",
      email: "sue@naver.com",
      age: "27",
      active: true
    },
    {
      id: 3,
      username: "sue3",
      email: "sue@naver.com",
      age: "30",
      active: false
    }
  ]
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs, //원래 있던 목록 표출
        users: state.users.concat(action.user) //원래있던 목록에 생성된 목록 붙이기
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id)
      };
    default:
      throw new Error("Unhandled action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const { username, email, age } = state.inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
        age
      }
    });
    nextId.current += 1;
  }, [username, email, age]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id
    });
  }, []);
  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id
    });
  }, []);
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        age={age}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}
export default App;
