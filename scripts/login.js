'use strict';
/*** DOM ELEMENTS ***/
const inputUsernameEle = document.getElementById('input-username');
const inputPasswordEle = document.getElementById('input-password');
const btnLogin = document.getElementById('btn-submit');

/*** FUNCTIONS ***/

// Validate login data function
// Input: login data object
// Output: validate result (true or false)
const validateData = function (loginData) {
  let result = true;
  try {
    if (loginData.username === '') {
      throw 'Please enter username';
    }

    if (loginData.password === '') {
      throw 'Please enter password';
    }
  } catch (error) {
    alert(error);
    result = false;
  }
  return result;
};

// Find user with login data function
// Input: login data object
// Output: user object if found
const findUser = function (loginData) {
  return userArr.find(
    user => user.username === loginData.username && user.password === loginData.password
  );
};

/*** EVENTS ***/

// Handle login button click event
btnLogin.addEventListener('click', function () {
  // Get login data from input
  const loginData = {
    username: inputUsernameEle.value.trim(),
    password: inputPasswordEle.value.trim(),
  };

  // Validate data
  const isValidated = validateData(loginData);

  if (isValidated) {
    // Find user with login data
    const userFound = findUser(loginData);
    console.log(userFound);
    if (userFound) {
      alert('Login successfully');
      // Save current user to local storage
      saveToStorage('currentUser', userFound);
      // Redirect to home page
      window.location.href = '../index.html';
    } else {
      alert('Wrong username or password');
    }
  }
});
