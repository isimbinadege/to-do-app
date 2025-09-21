
const STORAGE_KEY = 'todo.tasks';
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between bg-white border rounded-lg p-3 shadow-sm';
    li.dataset.id = task.id;

    const left = document.createElement('div');
    left.className = 'flex items-center gap-3';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.completed;
    checkbox.className = 'w-5 h-5';
    checkbox.addEventListener('change', () => toggleComplete(task.id));

    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = 'task-text';
    if (task.completed) span.classList.add('line-through', 'text-gray-400');

    left.appendChild(checkbox);
    left.appendChild(span);

    const right = document.createElement('div');
    right.className = 'flex items-center gap-2';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    right.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(right);
    taskList.appendChild(li);
  });
}

function addTask(text) {
  if (!text.trim()) return;
  const task = { id: Date.now().toString(), text: text.trim(), completed: false };
  tasks.unshift(task);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
});


renderTasks();
