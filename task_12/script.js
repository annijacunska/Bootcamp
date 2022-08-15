// import { Storage } from "./Storage.js";
// import { Task } from "./Task.js";

let taskList = document.querySelector('.tasks');
let addForm = document.getElementById('add-form');
let taskInput = document.getElementById('task-text');
// let storage = new Storage("To do list");
let taskTemplate = document.querySelector('.template');

displayTasks();

// Add new task event listener
addForm.onsubmit = function (event) {
  event.preventDefault();
  let data = new FormData(addForm);

  fetch(addForm.action, {
    method: 'POST',
    body: data
  })
    .then((response) => response.json())
    .then((data) => addTask(data['id']));

  taskInput.value = '';
}

//Edit task text event listener + waits 1000 ms after finished keyup event
// document.addEventListener('input',debounce( (event) => {
//   if(event.target && event.target.classList == 'task-editable') {
//     let task = event.target;
//     let taskText = task.textContent;
//     let key = task.parentElement.dataset.id;
//     // let done = storage.getData()[key]['done'];
//     // storage.add(key, taskText, done);
//   }
// }, 1000));

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

//   if(e.target && e.target.classList == 'edit-task-btn'){
//     let task = e.target;
//     let taskContainer = task.closest('.task-element');
//     let key = taskContainer.dataset.id;
//   }

  // if(e.target && e.target.classList == 'check-done'){
  //   let task = e.target;
  //   let key = task.parentElement.dataset.id;
  //   let taskText = task.nextElementSibling.textContent;
  //   // if (task.checked) {
  //   //   storage.add(key, taskText, true);
  //   // } else {
  //   //   storage.add(key, taskText, false);
  //   // }
  // }
});

function addTask(key) {
  getAllTasks(
    function (all_tasks) {
      let lastKey = all_tasks.length - 1;
      let newTask = createElement(all_tasks[lastKey]['id'], all_tasks[lastKey]['task'], all_tasks[lastKey]['done']);
      taskList.appendChild(newTask);
    }
  );
}

function removeTask(key) {
  findTask(key);
  displayTasks();
}


function displayTasks() {
  const tasks = taskList.querySelectorAll('.task-element');
  tasks.forEach(task => {
    task.remove();
  });

  getAllTasks(
    function (all_tasks) {
      for (let key in all_tasks) {
        taskList.appendChild(createElement(all_tasks[key]['id'], all_tasks[key]['task'], all_tasks[key]['done']));
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

function findTask(id) {
  fetch('http://web.local/Bootcamp/task_12/api.php?api-name=delete-task', {
    method: 'POST',
    body: JSON.stringify(id)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}