let taskList = document.querySelector('.tasks');
let addForm = document.getElementById('add-form');
let taskInput = document.getElementById('task-text');
let taskTemplate = document.querySelector('.template');
let apiBase = 'api.php?api-name=';

displayTasks();

// New task event listener
addForm.onsubmit = function (event) {
  event.preventDefault();
  let data = new FormData(addForm);

  fetch(apiBase + 'insert', {
    method: 'POST',
    body: data
  })
    .then((response) => response.json())
    .then((data) => addTask(data['id']));
  this.reset();
}

// Edit task text event listener + waits 1000 ms after finished keyup event
document.addEventListener('input',debounce( (event) => {
  if(event.target && event.target.classList == 'task-editable') {
    let task = event.target;
    let taskText = task.textContent;
    let key = task.parentElement.dataset.id;
    editTask(key, taskText);
  }
}, 1000));

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(function () { callback.apply(this, args); }, wait);
  };
}

document.addEventListener('click',function(e){
  if(e.target && e.target.classList == 'delete-task-btn'){
    let task = e.target;
    let taskElement = task.closest('.task-element');
    let key = taskElement.dataset.id;
    removeTask(key);
    taskElement.remove();
  }

  if(e.target && e.target.classList == 'check-done'){
    let taskCheck = e.target;
    let key = taskCheck.parentElement.dataset.id;
    if (taskCheck.checked) {
      changeTaskStatus(key, true)
    } else {
      changeTaskStatus(key, false)
    }
  }
});

function addTask(key) {
  getAllTasks(
    function (all_tasks) {
      let keys = Object.keys(all_tasks);
      let lastKey = keys[keys.length - 1];
      let newTask = createElement(all_tasks[lastKey]['id'], all_tasks[lastKey]['task'], all_tasks[lastKey]['status']);
      taskList.appendChild(newTask);
    }
  );
}

function removeTask(id) {
  fetch('api.php?api-name=delete', {
    method: 'POST', //or 'delete' and pass id in url
    body: JSON.stringify(id)
  })
  .then((response) => response.json())
}

//error on set to false; true works
function changeTaskStatus(id, status) {
  let info = {
    'id': id,
    'status': status
  }
  fetch('api.php?api-name=update', {
    method: 'POST',
    body: JSON.stringify(info)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

//error on task edit
function editTask(id, text) {
  let info = {
    'id': id,
    'task': text
  }
  fetch('api.php?api-name=update', {
    method: 'POST',
    body: JSON.stringify(info)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

function displayTasks() {
  const tasks = taskList.querySelectorAll('.task-element');
  tasks.forEach(task => {
    task.remove();
  });

  getAllTasks(
    function (all_tasks) {
      for (let key in all_tasks) {
        taskList.appendChild(createElement(all_tasks[key]['id'], all_tasks[key]['task'], all_tasks[key]['status']));
      }
    }
  )
}

function createElement (key, value, status) {
  let done = status == 0 ? false : true;
  let task = taskTemplate.cloneNode(true);
  if (done) {
    task.querySelector('input.check-done').checked = true;
  }
  task.classList.remove('template');
  task.dataset.id = key;
  task.querySelector('p').textContent = value;
  return task;
}

function getAllTasks(callback) {
  fetch('api.php?api-name=select-all')
  .then((response) => response.json())
  .then((data) => {
    const all_tasks = data.entries;
    callback(all_tasks);
  });
}

