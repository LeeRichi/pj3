// Initialize task array
let tasks = [];

// Get DOM elements
const addTaskButton = document.querySelector("#add-task");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector("#task-list");

// Event listener for add task button
addTaskButton.addEventListener("click", () => {
  // Get task value from input field
  const taskValue = taskInput.value.trim();

  // If task value is not empty
  if (taskValue !== "") {
    // Add task to tasks array
    tasks.push(taskValue);

    // Clear input field
    taskInput.value = "";

    // Render task list
    renderTaskList();
  }
});

// Function to render task list
function renderTaskList() {
  // Clear task list
  taskList.innerHTML = "";

  // Loop through tasks array and create list items
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    // Set list item text and delete button text
    listItem.textContent = task;
    deleteButton.textContent = "Delete";
    editButton.textContent = "Edit";

    // Add event listener to delete button
    deleteButton.addEventListener("click", () => {
      // Remove task from tasks array
      tasks.splice(i, 1);

      // Render task list
      renderTaskList();
    });

    // Append delete button to list item
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    // Append list item to task list
    taskList.appendChild(listItem);
  }
}