let draggedId = null;
let editTaskId = null;

let tasks = [];

/* ---------------- STORAGE ---------------- */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  tasks = data ? JSON.parse(data) : [];
}

/* ---------------- DRAG ---------------- */
function handleDragStart(e) {
  draggedId = e.target.dataset.id;
}

/* ---------------- RENDER ---------------- */
function renderTasks() {
  document.querySelectorAll(".task-list").forEach(list => {
    list.innerHTML = "";
  });

  tasks.forEach(task => {
    const card = document.createElement("div");

    // priority class applied
    card.className = `card ${task.priority}`;
    card.draggable = true;
    card.dataset.id = task.id;

   card.innerHTML = `
  <div class="card-top">
    <div class="card-text">
      <h4>${task.title}</h4>
      <p>${task.desc}</p>
      <small>${task.priority.toUpperCase()}</small>
    </div>

    <div class="card-actions">
      <button class="edit-btn" onclick="editTask('${task.id}')">Edit</button>
      <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
    </div>
  </div>
`;

    card.addEventListener("dragstart", handleDragStart);

    document
      .querySelector(`[data-column="${task.column}"] .task-list`)
      .appendChild(card);
  });
}

/* ---------------- EDIT ---------------- */
function editTask(id) {
  const task = tasks.find(t => t.id === id);

  document.getElementById("title").value = task.title;
  document.getElementById("desc").value = task.desc;
  document.getElementById("priority").value = task.priority;

  editTaskId = id;

  // change button text
  document.querySelector("#taskForm button").textContent = "Update Task";
}

/* ---------------- DELETE ---------------- */
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

/* ---------------- DRAG DROP ---------------- */
document.querySelectorAll(".column").forEach(column => {
  // when dragging over
  column.addEventListener("dragover", e => {
    e.preventDefault();
    column.classList.add("drag-over");
  });

  // when leaving column
  column.addEventListener("dragleave", () => {
    column.classList.remove("drag-over");
  });

  // when dropped
  column.addEventListener("drop", () => {
    column.classList.remove("drag-over");

    const newColumn = column.dataset.column;

    tasks = tasks.map(task =>
      task.id === draggedId ? { ...task, column: newColumn } : task
    );

    saveTasks();
    renderTasks();
  });
});
/* ---------------- FORM ---------------- */
document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const priority = document.getElementById("priority").value;

  if (editTaskId) {
    // UPDATE
    tasks = tasks.map(task =>
      task.id === editTaskId
        ? { ...task, title, desc, priority }
        : task
    );

    editTaskId = null;

    // reset button text
    document.querySelector("#taskForm button").textContent = "Add Task";
  } else {
    // CREATE
    tasks.push({
      id: Date.now().toString(),
      title,
      desc,
      priority,
      column: "todo"
    });
  }

  saveTasks();
  renderTasks();
  this.reset();
});

loadTasks();
renderTasks();