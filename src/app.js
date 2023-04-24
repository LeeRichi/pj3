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

// Add task function
function addTask(event) {
  event.preventDefault();
  const task = {
    name: taskNameInputEl.value,
    date: taskDateInputEl.value,
    progress: taskProgressInputEl.value
  };
  tasks.push(task);

  // Add task to task list element
  const taskEl = document.createElement('li');
  taskEl.innerHTML = `${task.name} - ${task.date} - ${task.progress}`;
  taskListEl.appendChild(taskEl);

  // Update task count
  taskCountEl.innerHTML = `Total Tasks: ${tasks.length}`;

  // Show clear tasks button
  // clearTaskBtnEl.style.display = 'block';

  hideForm();
}

// Clear tasks function
function clearTasks() {
  tasks = [];
  // Clear task list element
  taskListEl.innerHTML = '';
  taskCountEl.innerHTML = `Total Tasks: ${tasks.length}`;
}


// edit function
function editTask(task, index){
  taskFormEl.style.display = 'block';
  homeEl.style.display = 'none';

  taskNameInputEl.value = task.name;
  taskDateInputEl.value = task.date;
  taskProgressInputEl.value = task.progress;

  titleEl.innerHTML = 'EDIT TASK'
  submitTaskBtnEl.innerHTML = 'Update Task';
  submitTaskBtnEl.removeEventListener('click', addTask);
  //delete section
  //make a delete button
  const deleteTaskBtnEl = document.createElement('button');
  deleteTaskBtnEl.innerHTML = 'Delete Task';
  taskFormEl.appendChild(deleteTaskBtnEl);

  deleteTaskBtnEl.addEventListener('click', function(event){
    event.preventDefault();
    tasks.splice(index, 1); // Remove task from tasks array
    taskListEl.removeChild(taskListEl.children[index]); // Remove task from task list element
    // console.log(tasks)
    taskCountEl.innerHTML = `Total Tasks: ${tasks.length}`;
    hideForm(); // Hide the task form and show the home page
  });

  


  

  submitTaskBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (tasks.length === 0) {
      showForm();
    } else {
      addTask(event);
    }

    // Update the task in the array
    tasks[index] = {
      name: taskNameInputEl.value,
      date: taskDateInputEl.value,
      progress: taskProgressInputEl.value
    };

    // Update the task in the task list element
    taskListEl.children[index].innerHTML = `${tasks[index].name} - ${tasks[index].date} - ${tasks[index].progress}`;

    // Hide the task form and show the home page
    hideForm();

    // Change the update button back to a submit button
    submitTaskBtnEl.innerHTML = 'Add Task';
    submitTaskBtnEl.removeEventListener('click', arguments.callee);
    submitTaskBtnEl.addEventListener('click', addTask);
  });

  


}

// Event listeners
addTaskBtnEl.addEventListener('click', showForm);
cancelTaskBtnEl.addEventListener('click', hideForm);

submitTaskBtnEl.addEventListener('click', addTask);
clearTaskBtnEl.addEventListener('click', clearTasks);
// taskCountEl.innerHTML = `Total Tasks: ${tasks.length}`;

taskListEl.addEventListener('click', function(event) {
  const taskEl = event.target.closest('li');
  const index = Array.from(taskListEl.children).indexOf(taskEl);

  if (index >= 0) {
    const task = tasks[index];
    editTask(task, index);
  }
});







