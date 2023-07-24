'use strict';
/*** DOM ELEMENTS ***/

const inputFirstNameEle = document.getElementById('input-firstname');
const inputLastNameEle = document.getElementById('input-lastname');
const inputUsernameEle = document.getElementById('input-username');
const inputPasswordEle = document.getElementById('input-password');
const inputConfirmPasswordEle = document.getElementById('input-password-confirm');
const btnRegister = document.getElementById('btn-submit');

/*** GLOBAL VARIABLES ***/
/*** FUNCTIONS ***/

// Get user register data from input function
// Output: user data object
const getUserRegisterData = function () {
  const user = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  };

  user.firstName = inputFirstNameEle.value.trim();
  user.lastName = inputLastNameEle.value.trim();
  user.username = inputUsernameEle.value.trim();
  user.password = inputPasswordEle.value.trim();

  return user;
};

// Validate data function
// Input: user data object
// Output: validate result (true or false)
const validateData = function (userObj) {
  let result = true;

  try {
    if (userObj.firstName === '') {
      throw 'Please enter first name';
    }

    if (userObj.lastName === '') {
      throw 'Please enter last name';
    }

    if (userObj.username === '') {
      throw 'Please enter username';
    } else {
      // check duplicate username
      if (userArr.some(user => user.username === userObj.username)) {
        throw 'Username already existed';
      }
    }

    if (userObj.password === '') {
      throw 'Please enter password';
    } else {
      if (userObj.password.length <= 8) {
        throw 'Password must have more than 8 characters';
      }
    }

    if (userObj.confirmPassword === '') {
      throw 'Please enter password to confirm';
    } else {
      if (userObj.password !== inputConfirmPasswordEle.value.trim()) {
        throw 'Password and Confirm Password should be the same';
      }
    }
  } catch (error) {
    alert(error);
    result = false;
  }
  return result;
};

/*** EVENTS ***/

// Handle register button click event
btnRegister.addEventListener('click', function (e) {
  // Get user data from input
  const newUser = getUserRegisterData();
  // Validated data
  const isValidated = validateData(newUser);

  if (isValidated) {
    alert('Register successfully');
    // add new user to user array
    userArr.push(newUser);
    // Save to local storage
    saveToStorage('USER_ARRAY', userArr);
    // Redirect to login page
    window.location.href = '../pages/login.html';
  }
});
