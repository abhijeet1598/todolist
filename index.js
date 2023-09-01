// Adding date to header element

const dateElem = document.getElementById("todayDate");

dateElem.textContent = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

const listContainer = document.getElementById("todo-list");

let arr = showData() || [];

console.log(arr);

arr.forEach((val) => {
  addTodoItemDOM(val.text, val.id, val.completed);
});

function addTodoItemDOM(text, id, checked) {
  let todoItem = document.createElement("li");
  todoItem.className = "list-group-item p-3";

  let todoItemInput = document.createElement("input");
  todoItemInput.className = "form-check-input me-3";
  todoItemInput.id = id;
  todoItemInput.setAttribute("type", "checkbox");
  todoItemInput.checked = checked;

  let todoItemLabel = document.createElement("label");
  todoItemLabel.className = "form-check-label";
  todoItemLabel.setAttribute("for", id);
  todoItemLabel.textContent = text;

  if (todoItemInput.checked) {
    todoItemLabel.style.textDecoration = "line-through";
  }

  todoItem.append(todoItemInput, todoItemLabel);

  listContainer.appendChild(todoItem);

  todoItemInput.addEventListener("click", (e) => {
    if (e.target.checked) {
      todoItemLabel.style.textDecoration = "line-through";
    } else {
      todoItemLabel.style.textDecoration = "none";
    }
    isChecked(arr, todoItemInput);
    localStorage.setItem("data", JSON.stringify(arr));
  });
}

function isChecked(arr, checkbox) {
  let checkBoxItem = arr.find((ele) => ele.id == checkbox.id);
  checkBoxItem.completed = checkbox.checked;
}

const formElem = document.getElementById("form");

let input = document.getElementById("todoText");

formElem.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodoItemDOM(input.value, `todo${arr.length + 1}`, false);
  savetoLocalStorage(input.value, `todo${arr.length + 1}`, false);
  input.value = "";
  input.focus();
});

const clearAllBtn = document.getElementById("clearAll");

clearAllBtn.addEventListener("click", function () {
  listContainer.innerHTML = "";
  arr = [];
  localStorage.setItem("data", JSON.stringify(arr));
});

function savetoLocalStorage(text, id, completed) {
  arr.push({ text: text, id: id, completed: completed });
  localStorage.setItem("data", JSON.stringify(arr));
}

function showData() {
  return JSON.parse(localStorage.getItem("data"));
}
