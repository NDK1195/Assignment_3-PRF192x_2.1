'use strict';
class User {
  constructor(firstName, lastName, username, password, pageSize = 10, category = 'general') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }
}

class Task {
  constructor(task, owner, isDone = false) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
