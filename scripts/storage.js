'use strict';
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};
const getFromStorage = function (key) {
  return localStorage.getItem(key);
};
