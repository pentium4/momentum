const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();

};

function paintTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const buttom = document.createElement("button");
    buttom.innerText = "❌";
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    buttom.addEventListener("click", deleteToDo);
    li.appendChild(buttom);
    li.appendChild(span);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        id: Date.now(),
        text: newTodo,
    };
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parseToDos = JSON.parse(savedToDos);
    toDos = JSON.parse(savedToDos);;
    parseToDos.forEach(paintTodo);
}