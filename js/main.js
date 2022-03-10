const settings = document.getElementById("settings");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const add_btn = document.getElementById("add-btn");
let data = localStorage.getItem("TODO");
let LIST;
let id;

settings.addEventListener("click", function () {
  alert("W przyszłości tutaj będą opcje");
});

// Display date
date.innerHTML = new Date().toLocaleDateString("pl-PL", {
  day: "numeric",
  weekday: "short",
  month: "short",
});

// Check for local storage data
if (data) {
  LIST = JSON.parse(data);
  loadList(LIST);
  id = LIST.length;
} else {
  LIST = [];
  id = 0;
}

// Delete trash items from local storage and load list
function loadList(LIST) {
  for (let i = 0; i < LIST.length; i++) {
    if (LIST[i].trash === true) {
      LIST.splice(i, 1);
      i--;
    } else {
      addItem(LIST[i].name, i, LIST[i].done);
      LIST[i].id = i;
    }
  }
}

// Listen for click on 'plus' button to add item
add_btn.addEventListener("click", checkInput);

// Listen for Enter key to add item
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkInput();
  }
});

// If input isn't empty, add new element
function checkInput() {
  const item = input.value;
  if (item) {
    addItem(item, id);
    input.value = "";
    LIST.push({
      name: item,
      id: id,
      done: false,
      trash: false,
    });
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
  }
}

// Creating and inserting element
function addItem(item, id, done) {
  const lineThrough = done ? "line-through" : "";
  const object = `<li class="item">
                  <p class="text ${lineThrough}">${item}</p>
                  <div class="buttons-wrapper">
                    <i class="fa-solid fa-check check" job="complete" id="${id}"></i>
                    <i class="fa-regular fa-trash-can trash" job="delete" id="${id}"></i>
                  </div>
                </li>`;
  list.insertAdjacentHTML("beforeend", object);
}

// Listen for complete/trash buttons clicks
list.addEventListener("click", function (event) {
  const element = event.target; // clicked element inside list
  if (element.attributes.job != null) {
    const elementJob = element.attributes.job.value; // complete or delete
    if (elementJob == "complete") {
      completeObject(element);
    } else if (elementJob == "delete") {
      removeObject(element);
    }
  }
});

// Complete button - toggle element style
function completeObject(element) {
  element.parentNode.previousElementSibling.classList.toggle("line-through");
  LIST[element.id].done = LIST[element.id].done ? false : true;
  localStorage.setItem("TODO", JSON.stringify(LIST));
}

// Trash button - delete element
function removeObject(element) {
  list.removeChild(element.parentNode.parentNode);
  LIST[element.id].trash = true;
  localStorage.setItem("TODO", JSON.stringify(LIST));
}
