import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
};

const addToDo = (text) => {
  store.dispatch({ type: ADD_TODO, text });
};

const deleteToDo = () => {
  console.log("삭제");
};

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  addToDo(toDo);
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "❌";
    btn.addEventListener("click", deleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text + " ";
    li.append(btn);
    ul.append(li);
  });
};

store.subscribe(paintToDos);

form.addEventListener("submit", onSubmit);
