// import { Storage } from "./Storage.js";
// import { Task } from "./Task.js";

let taskList = document.querySelector('.tasks');
let addForm = document.getElementById('add-form');
let taskInput = document.getElementById('task-text');
// let storage = new Storage("To do list");
let taskTemplate = document.querySelector('.template');

displayTasks();

// New task event listener
addForm.onsubmit = function (event) {
  event.preventDefault();
  let data = new FormData(addForm);

  fetch(addForm.action, {
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
    // let done = storage.getData()[key]['done'];
    // storage.add(key, taskText, done);
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
    let key = task.closest('.task-element').dataset.id;
    removeTask(key);
  }

  if(e.target && e.target.classList == 'check-done'){
    let taskCheck = e.target;
    let key = taskCheck.parentElement.dataset.id;
    if (taskCheck.checked) {
      changeTaskStatus(key, true)
      taskCheck.checked = true;
    } else {
      changeTaskStatus(key, false)
    }
  }
});

function addTask(key) {
  getAllTasks(
    function (all_tasks) {
      let lastKey;
      let keys = Object.keys(all_tasks);
      let i = 1;
      do{
        lastKey = keys[keys.length - i];
        i++;
      } while (lastKey == 'next_id')
      let newTask = createElement(lastKey, all_tasks[lastKey]['task'], all_tasks[lastKey]['done']);
      taskList.appendChild(newTask);
    }
  );
}

function removeTask(id) {
  fetch('http://web.local/Bootcamp/task_12/api.php?api-name=delete-task', {
    method: 'POST',
    body: JSON.stringify(id)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
  displayTasks();
}

function changeTaskStatus(id, status) {
  let info = {
    'id': id,
    'status': status
  }
  fetch('http://web.local/Bootcamp/task_12/api.php?api-name=set-status', {
    method: 'POST',
    body: JSON.stringify(info)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

function editTask(id, text) {
  let info = {
    'id': id,
    'task': text
  }
  fetch('http://web.local/Bootcamp/task_12/api.php?api-name=edit-task', {
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
        if(key == 'next_id') {
          continue;
        };
        taskList.appendChild(createElement(key, all_tasks[key]['task'], all_tasks[key]['done']));
      }
    }
  )
}

function createElement (key, value, done) {
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
  fetch('http://web.local/Bootcamp/task_12/api.php?api-name=all-tasks')
  .then((response) => response.json())
  .then((data) => {
    const all_tasks = data['tasks'];
    callback(all_tasks);
  });
}

