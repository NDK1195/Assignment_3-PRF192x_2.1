'use strict';
/*** DOM ELEMENTS ***/
const loginModalEle = document.getElementById('login-modal');
const mainContentEle = document.getElementById('main-content');
const welcomeMessageEle = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');

// Check if user already login
if (currentUser) {
  welcomeMessageEle.innerText = `Welcome ${currentUser.username}`;

  mainContentEle.classList.add('d-block');
  mainContentEle.classList.remove('d-none');
  loginModalEle.classList.add('d-none');
} else {
  loginModalEle.classList.add('d-block');
  loginModalEle.classList.remove('d-none');
  mainContentEle.classList.add('d-none');
}

/*** EVENTS ***/

// Handle logout button click event
btnLogout.addEventListener('click', function () {
  const confirmLogout = confirm('Are you sure?');
  if (confirmLogout) {
    // Remove current user from local storage
    localStorage.removeItem('currentUser');
    // Redirect to login page
    window.location.href = '../pages/login.html';
  }
});
