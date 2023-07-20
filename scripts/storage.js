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

const KEY = 'USER_ARRAY';
let userArr = getFromStorage(KEY) || [];
// parse user object to User instance
userArr = userArr.map(user => parseUser(user));
console.log(userArr);
// Get current user
const currentUser = getFromStorage('currentUser') || '';
console.log(currentUser);
