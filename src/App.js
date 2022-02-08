import React, { useRef, useState } from "react";
import CreateUser from "./CreateUser";
import InputSample from "./InputSample";
import UserList from "./UserList";

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
      age: "24"
    },
    {
      id: 2,
      username: "sue2",
      email: "sue@naver.com",
      age: "27"
    },
    {
      id: 3,
      username: "sue3",
      email: "sue@naver.com",
      age: "30"
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
    setUsers([...users, user]); //users를 복사하고 user를 붙인다
    setInputs({
      username: "",
      email: "",
      age: ""
    });
    console.log(nextId.current);
    nextId.current += 1;
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        age={age}
      />
      <UserList users={users} />
    </>
  );
}
export default App;
