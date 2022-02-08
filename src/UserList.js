import React from "react";

function User({ user }) {
  console.log(user);
  return (
    <div>
      <b>{user.username}</b>
      <span>({user.email})</span>
      <span>({user.age})</span>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
      {/* app.js 에서 컴포넌트에 달아둔 props를 통해 user 정보가 여기(파라미터)로 날라온다  */}
      {/* 날아온 파라미터를 map을 이용해 index 만큼 돌려서 user 컴포넌트 알맞는 부분에 담아준다 */}
      {users.map((user, index) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}
export default UserList;
