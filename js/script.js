
const itemLeft = document.querySelector("#itemLeft");
const todoLists = document.querySelector("#todoLists");
const todoInput = document.querySelector("#todoInput");
const filterBtns = document.querySelectorAll("[data-filter]");
const clearBtn = document.querySelector("#clear");
const themeBtn = document.querySelector(".theme");

const savedTodos = JSON.parse(localStorage.getItem("todos"));

let todos = savedTodos || [
  { id: 1, text: "Complete online JavaScript course", completed: true },
];

let currentFilter = "all";

function renderTodos() {
  todoLists.innerHTML = "";

  let visibleTodos = todos;

  if (currentFilter === "active") {
    visibleTodos = todos.filter((t) => t.completed === false);
  } else if (currentFilter === "completed") {
    visibleTodos = todos.filter((t) => t.completed === true);
  }

  visibleTodos.forEach((todo) => {
    const item = document.createElement("div");
    item.classList.add("list");
    item.innerHTML = `<label class="custom-checkbox">
  <input type="checkbox" ${todo.completed ? "checked" : ""} />
  <span class="checkmark"></span>
</label>
<p>${todo.text}</p>
<button class="delete">
  <img src="img/icon-cross.svg" alt="delete img" />
</button>`;

    if (todo.completed) {
      item.classList.add("completed");
    }

    const checkbox = item.querySelector("input");
    checkbox.addEventListener("change", function () {
      todo.completed = !todo.completed;
      renderTodos();
    });

    const deleteBtn = item.querySelector(".delete");
    deleteBtn.addEventListener("click", function () {
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    });

    todoLists.appendChild(item);
  });

  const left = todos.filter((todo) => todo.completed === false);
  itemLeft.textContent = left.length;

  localStorage.setItem("todos", JSON.stringify(todos));
}

todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const text = todoInput.value.trim();

    if (text === "") return;

    todos.push({
      id: Date.now(),
      text: text,
      completed: false,
    });
    todoInput.value = "";
    renderTodos();
  }
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    currentFilter = btn.dataset.filter;

    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    renderTodos();
  });
});

clearBtn.addEventListener("click", function () {
  todos = todos.filter((t) => t.completed === false);
  renderTodos();
});

function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

setTheme(localStorage.getItem("theme") === "dark");

themeBtn.addEventListener("click", function () {
  setTheme(!document.body.classList.contains("dark"));
});

renderTodos();