// Adding date to header element

const dateElem = document.getElementById("todayDate");

dateElem.textContent = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

// adding submit Event listner
const inputEle = document.getElementById("todoText");

const listElem = document.getElementById("todo-list");
const submitEle = document.getElementById("addEvent");
let counter = 1;
let arrList = showData() || [];

addListToDOM(arrList);

function addListToDOM(list) {
  listElem.innerHTML = "";
  list.forEach((element) => {
    liElem = document.createElement("li");
    liElem.className = "list-group-item p-3";

    let liInputElem = document.createElement("input");
    liInputElem.id = `todo-${counter}`;
    liInputElem.className = "form-check-input me-3";
    liInputElem.setAttribute("type", "checkbox");

    let liLabelElem = document.createElement("label");
    liLabelElem.id = `todoL-${counter}`;
    liLabelElem.className = "form-check-label";
    liLabelElem.setAttribute("for", liInputElem.id);

    liLabelElem.textContent = element;

    liElem.appendChild(liInputElem);
    liElem.appendChild(liLabelElem);

    listElem.appendChild(liElem);
    counter++;
    inputEle.value = "";
    inputEle.focus();

    //check event

    const checkBox = document.getElementById(liInputElem.id);
    const strikeText = document.getElementById(liLabelElem.id);
    checkBox.addEventListener("click", function () {
      if (checkBox.checked) {
        strikeText.style.textDecoration = "line-through";
        saveData();
      } else {
        strikeText.style.textDecoration = "none";
        saveData();
      }
    });
  });
  saveData();
}
submitEle.addEventListener("click", (event) => {
  event.preventDefault();
  arrList.push(inputEle.value);
  console.log(arrList);
  addListToDOM(arrList);
});

// clear all event
const clearAllBtn = document.getElementById("clearAll");
clearAllBtn.addEventListener("click", function () {
  listElem.innerHTML = "";
  arrList = [];
  saveData();
});

//saving to local storage

function saveData() {
  localStorage.setItem("data", JSON.stringify(arrList));
}

function showData() {
  return JSON.parse(localStorage.getItem("data"));
}

// showData();
