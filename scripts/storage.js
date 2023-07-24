'use strict';
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};
const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

// Parse user object to User instance
// Input: user object
// Output: User instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );

  return user;
}

// Parse task object to Task instance
// Input: task object
// Output: Task instance
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);

  return task;
}

let userArr = getFromStorage('USER_ARRAY') || [];
// parse user object to User instance
userArr = userArr.map(user => parseUser(user));

// Get current user
const currentUser = getFromStorage('currentUser') || '';

let todoArr = getFromStorage('TODO_ARRAY') || [];
// parse task object to Task instance
todoArr = todoArr.map(task => parseTask(task));
