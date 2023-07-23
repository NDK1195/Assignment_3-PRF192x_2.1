'use strict';
/*** DOM ELEMENTS ***/

const inpPageSizeEle = document.getElementById('input-page-size');
const selectCategoryEle = document.getElementById('input-category');
const btnSave = document.getElementById('btn-submit');

/*** EVENTS ***/

// Handle save settings button click events
btnSave.addEventListener('click', function () {
  // Set settings data to current user
  currentUser.pageSize = inpPageSizeEle.value ? inpPageSizeEle.value : 10;
  currentUser.category = selectCategoryEle.value;
  // Save to local storage
  saveToStorage('currentUser', currentUser);

  alert('Settings save');
});
