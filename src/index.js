import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// Action 정보를 주기위한 함수들
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

// 리듀서
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      // console.log(typeof action.id);
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

// 디스패치하기 위한 함수들
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (event) => {
  // console.log(event.target.parentNode.id);
  const id = parseInt(event.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

// 서브밋 이벤트 리스너 함수
const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

// Store 생성
const store = createStore(reducer);

// store.subscribe(() => console.log(store.getState()));

// 페인팅, 렌더링 하는 함수
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "❌";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text + " ";
    li.append(btn);
    ul.append(li);
  });
};

// State 변경시 리페인팅, 리렌더링
store.subscribe(paintToDos);

// 서브밋 이벤트리스너
form.addEventListener("submit", onSubmit);
