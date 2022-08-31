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

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const paintToDos = () => {
  const toDos = store.getState();
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    li.id = toDo.id;
    li.innerText = toDo.text;
    ul.append(li);
  });
};

store.subscribe(paintToDos);

const addToDo = (text) => {
  store.dispatch({ type: ADD_TODO, text });
};

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  addToDo(toDo);
};

form.addEventListener("submit", onSubmit);
