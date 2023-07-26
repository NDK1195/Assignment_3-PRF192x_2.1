'use strict';
/*** DOM ELEMENTS ***/

const inpPageSizeEle = document.getElementById('input-page-size');
const selectCategoryEle = document.getElementById('input-category');
const btnSave = document.getElementById('btn-submit');

// Display current settings
inpPageSizeEle.value = currentUser.pageSize;
selectCategoryEle.value = currentUser.category;

/*** FUNCTIONS ***/

// Validate settings data function
// Input: settings data object
// Output: validate result (true or false)
const validateData = function (data) {
  let result = true;

  try {
    if (data.pageSize === '') {
      throw 'Please enter numbers of news per page';
    }

    if (data.category === '') {
      throw 'Please select category';
    }
  } catch (error) {
    alert(error);
    result = false;
  }

  return result;
};
/*** EVENTS ***/

// Handle save settings button click events
btnSave.addEventListener('click', function () {
  // Get settings data from input
  const settingsData = {
    pageSize: inpPageSizeEle.value,
    category: selectCategoryEle.value,
  };
  // Validate data
  const isValidated = validateData(settingsData);
  if (isValidated) {
    // Set settings data to current user
    currentUser.pageSize = settingsData.pageSize;
    currentUser.category = settingsData.category;
    // Save to local storage
    saveToStorage('currentUser', currentUser);

    alert('Settings saved');
  }
});
