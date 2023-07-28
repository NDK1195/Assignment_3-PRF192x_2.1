'use strict';
/*** DOM ELEMENTS ***/

const inpTaskEle = document.getElementById('input-task');
const btnAddTask = document.getElementById('btn-add');
const todoListEle = document.getElementById('todo-list');

/*** FUNCTIONS ***/

// Render todo list base on current user function
const renderTodoList = function () {
  // Empty todo list
  todoListEle.innerHTML = '';
  // Render todo list
  todoArr.forEach((todo, index) => {
    // Filter current user task
    if (todo.owner === currentUser.username) {
      // Create task
      const task = `<li data-index=${index} class=${todo.isDone ? 'checked' : ''}>${
        todo.task
      }<span class="close">×</span></li>`;
      // Add task to todo list
      todoListEle.insertAdjacentHTML('beforeend', task);
    }
  });
};
// Render todo list on load
renderTodoList();

/*** EVENTS ***/

// Handle add task click event
btnAddTask.addEventListener('click', function () {
  // Create new task object
  const newTask = {
    task: inpTaskEle.value.trim(),
    owner: currentUser.username,
    isDone: false,
  };

  // Check if input task empty
  if (newTask.task === '') {
    alert('Please enter task');
  } else {
    // If not empty
    // Add new task to todoArr
    todoArr.push(newTask);
    // Save to local storage
    saveToStorage('TODO_ARRAY', todoArr);
    // Render todo list
    renderTodoList();
  }
});

// Handle toggle done task and delete task event
todoListEle.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    // If click on task, toggle checked class to display done or not done task
    e.target.classList.toggle('checked');
    // Update isDone status of click task
    const indexOfClickedTask = e.target.dataset.index;
    todoArr[indexOfClickedTask].isDone = todoArr[indexOfClickedTask].isDone ? false : true;
    // Update local storage
    saveToStorage('TODO_ARRAY', todoArr);
  } else if (e.target.tagName === 'SPAN') {
    // If click on delete icon, confirm delete
    const confirmDelete = confirm('Do you want to delete this task?');
    if (confirmDelete) {
      // Find index of clicked task
      const indexOfClickedTask = e.target.parentElement.dataset.index;
      // Remove task from todoArr
      todoArr.splice(indexOfClickedTask, 1);
      // Update local storage
      saveToStorage('TODO_ARRAY', todoArr);
      // Rerender todoList
      renderTodoList();
    }
  }
});
