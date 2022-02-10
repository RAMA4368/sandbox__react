import React, { useRef, useState, useMemo, useCallback } from "react";
import CreateUser from "./CreateUser";
import InputSample from "./InputSample";
import UserList from "./UserList";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  //users.active 가 true 인 것들만 가져오겠다
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    age: ""
  });
  //useCallback이 있다면 inputs가 바뀔때만 함수가 새로 만들어진다
  const { username, email, age } = inputs;
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    [inputs]
  );

  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
      age
    };
    //setUsers([...users, user]); //users를 복사하고 user를 붙인다
    setUsers((users) => users.concat(user));
    setInputs({
      username: "",
      email: "",
      age: ""
    });
    console.log(nextId.current);
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    // true 인 배열만 생성해준다. ex)3파라미터를 넘김 => 1!==3 true 이므로 배열에 추가
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    //클릭한 리스트 active의 반대 상태로
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        age={age}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}
export default App;
