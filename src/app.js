// fetch DOM elements
const titleEl = document.getElementById('page')
const taskCountEl = document.getElementById('task-count');
const taskListEl = document.getElementById('task-list');
const homeEl = document.getElementById('home');
const addTaskBtnEl = document.getElementById('add-task-btn');
const taskFormEl = document.getElementById('task-form');
const taskNameInputEl = document.getElementById('task-name');
const taskDateInputEl = document.getElementById('task-date');
const taskProgressInputEl = document.getElementById('task-progress');
const submitTaskBtnEl = document.getElementById('submit-task-btn');
const cancelTaskBtnEl = document.getElementById('cancel-task-btn');
const clearTaskBtnEl = document.getElementById('clear-task-btn');


//initial array
let tasks = [];
taskCountEl.innerHTML = `Total Tasks: ${tasks.length}`;

// Show form function
function showForm() {
  taskFormEl.style.display = 'block';
  homeEl.style.display = 'none';
}

// Hide form function
function hideForm() {
  taskFormEl.style.display = 'none';
  homeEl.style.display = 'block';
}

// Add task section
function addTask(event) {
  event.preventDefault();
  const task = {
    name: taskNameInputEl.value,
    date: taskDateInputEl.value,
    progress: taskProgressInputEl.value
  };
  tasks.push(task);

  const taskEl = document.createElement('li');
  taskEl.innerHTML = `Task: ${task.name}. <br>Deadline: ${task.date} <br>Progress:${task.progress}`;
  taskListEl.appendChild(taskEl);

  taskCountEl.innerHTML = `Total Tasks: ${tasks.length}`;

  hideForm();
}

// Clear tasks section
function clearTasks() {
  tasks = [];
  // Clear task list element
  taskListEl.innerHTML = '';
  taskCountEl.innerHTML = `Total Tasks: ${tasks.length}`;
}

//Edit task section
function editTask(task, index) {
  taskFormEl.style.display = 'block';
  homeEl.style.display = 'none';

  taskNameInputEl.value = task.name;
  taskDateInputEl.value = task.date;
  taskProgressInputEl.value = task.progress;

  //modify the title and the submit button to edit version
  titleEl.innerHTML = 'EDIT TASK';
  submitTaskBtnEl.innerHTML = 'Update Task';

  submitTaskBtnEl.removeEventListener('click', addTask);

  submitTaskBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    // Update the task in the array
    tasks[index].name = taskNameInputEl.value;
    tasks[index].date = taskDateInputEl.value;
    tasks[index].progress = taskProgressInputEl.value;

    // Update the task in the task list element
    taskListEl.children[index].innerHTML = `Task: ${task.name}. <br>Deadline: ${task.date} <br>Progress:${task.progress}`;

    // Hide the task form and show the home page
    hideForm();

    // Change the edit version back to a submit version
    submitTaskBtnEl.innerHTML = 'Add Task';
    submitTaskBtnEl.removeEventListener('click', arguments.callee);
    submitTaskBtnEl.addEventListener('click', addTask);
  });

  // Delete section
    //make a delete button
  const deleteTaskBtnEl = document.createElement('button');
  deleteTaskBtnEl.innerHTML = 'Delete Task';
  taskFormEl.appendChild(deleteTaskBtnEl);

  deleteTaskBtnEl.addEventListener('click', function(event) {
    event.preventDefault();

    tasks.splice(index, 1);
    taskListEl.removeChild(taskListEl.children[index]);

    taskCountEl.innerHTML = `Total Tasks: ${tasks.length}`;
    hideForm();

    //Change the edit version back to adding version
    titleEl.innerHTML = 'ADD NEW TASK';
    submitTaskBtnEl.innerHTML = 'Confirm';
    deleteTaskBtnEl.style.display = 'none';

    // Change the update button back to a submit button
    submitTaskBtnEl.innerHTML = 'Add Task';
    submitTaskBtnEl.removeEventListener('click', arguments.callee);
    submitTaskBtnEl.addEventListener('click', addTask);
    deleteTaskBtnEl.style.display = 'none';
  });
}

// Event listeners
addTaskBtnEl.addEventListener('click', showForm);
cancelTaskBtnEl.addEventListener('click', hideForm);
submitTaskBtnEl.addEventListener('click', addTask);
clearTaskBtnEl.addEventListener('click', clearTasks);
taskListEl.addEventListener('click', function(event) {
  const taskEl = event.target.closest('li');
  const index = Array.from(taskListEl.children).indexOf(taskEl);

  if (index >= 0) {
    const task = tasks[index];
    editTask(task, index);
  }
});







