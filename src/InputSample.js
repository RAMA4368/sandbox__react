import React, { useState, useRef } from "react";

function InputSample() {
  //1. 객체를 만든다
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    age: ""
  });
  //useRef() 로 DOM 을 직접 가져오기 가능
  const nameInput = useRef();
  //2.inputs 라는 객체로 name nickname age 를 할당한다
  const { name, nickname, age } = inputs;

  const onChange = (e) => {
    //3.이벤트가 걸린 요소의 e.target.name 과 e.target.value 가 입력된다.
    const { name, value } = e.target;

    //4.setInputs 라는 객체에 inputs 객체를 복사한다
    //(똑같은 객체 하나가 만들어졌고) 그 setinputs 의 name 은 입력한 값으로 교체된다.
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
      age: ""
    });
    //DOM을 가져와서 DOM API중 focus 를 사용하면 ref를 걸어준 곳에 포커스를 맞출 수 있음
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput} //ref를 걸어주면 여기에 직접 접근 가능
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <input name="age" placeholder="나이" onChange={onChange} value={age} />
      <button onClick={onReset}>초기화</button>

      <div>
        <b>값 : </b>
        {name}({nickname})
      </div>
    </div>
  );
}
export default InputSample;
