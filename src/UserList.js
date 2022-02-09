import React, { useEffect } from "react";

function User({ user, onRemove, onToggle }) {
  const { username, email, id, age, active } = user;

  // useEffect(() => {
  //   console.log("user 값이 설정됨");
  //   console.log(user);
  //   return () => {
  //     console.log("user값이 바뀌기 전");
  //     console.log(user);
  //   };
  //   //여기 넣은 해당 값이 바뀔때마다 등록한 함수가 호출된다. 바뀌기전에 return 이 호출
  // }, [user]);

  // useEffect(() => {
  //   console.log("컴포넌트가 화면에 나타남");
  //   //props -> state
  //   //REST API
  //   return () => {
  //     //clearInterval, clearTimeout

  //     console.log("컴포넌트가 화면에서 사라짐");
  //   };
  // }, []);

  return (
    <div>
      <b
        style={{
          color: active ? "green" : "black",
          cursor: "pointer"
        }}
        onClick={() => onToggle(id)}
      >
        {username}
      </b>
      &nbsp;
      <span>({email})</span>
      <span>({age})</span>
      <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {/* app.js 에서 컴포넌트에 달아둔 props를 통해 user 정보가 여기(파라미터)로 날라온다  */}
      {/* 날아온 파라미터를 map을 이용해 index 만큼 돌려서 user 컴포넌트 알맞는 부분에 담아준다 */}
      {users.map((user, index) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
export default UserList;
