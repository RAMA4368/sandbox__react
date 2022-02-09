import React, { useRef, useState } from "react";
import CreateUser from "./CreateUser";
import InputSample from "./InputSample";
import UserList from "./UserList";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    age: ""
  });
  const { username, email, age } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

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

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
      age
    };
    //setUsers([...users, user]); //users를 복사하고 user를 붙인다
    setUsers(users.concat(user));
    setInputs({
      username: "",
      email: "",
      age: ""
    });
    console.log(nextId.current);
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // true 인 배열만 생성해준다. ex)3파라미터를 넘김 => 1!==3 true 이므로 배열에 추가
    setUsers(users.filter((user) => user.id !== id));
  };

  const onToggle = (id) => {
    //클릭한 리스트 active의 반대 상태로
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };
  const count = countActiveUsers(users);
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
