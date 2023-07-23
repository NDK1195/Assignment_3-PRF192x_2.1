'use strict';
const saveToStorage = function (key = 'USER_ARRAY', value) {
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

let userArr = getFromStorage('USER_ARRAY') || [];
// parse user object to User instance
userArr = userArr.map(user => parseUser(user));
console.log(userArr);
// Get current user
const currentUser = getFromStorage('currentUser') || '';
// console.log(currentUser);
