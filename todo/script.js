let todos = JSON.parse(localStorage.getItem('todos')) || [];

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: Date.now(),
    text: text,
    done: false
  });

  input.value = '';
  save();
  render();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.done = !todo.done;
  save();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
}

function render() {
  const list = document.getElementById('todoList');
  const stats = document.getElementById('stats');

  if (todos.length === 0) {
    list.innerHTML = '<p style="color:#aaa;text-align:center;padding:20px;">No tasks yet!</p>';
    stats.textContent = '';
    return;
  }

  list.innerHTML = todos.map(todo => `
    <div class="todo-item ${todo.done ? 'done' : ''}">
      <input type="checkbox" ${todo.done ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
      <span>${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    </div>
  `).join('');

  const done = todos.filter(t => t.done).length;
  stats.textContent = `${done} of ${todos.length} tasks completed`;
}

document.getElementById('todoInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTodo();
});

render();