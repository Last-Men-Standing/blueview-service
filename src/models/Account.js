"use strict";
const { isEmpty, isAlpha, isLength } = require("validator");

// class Account {
//   constructor(_id, _first_name, _last_name, _username) {
//     this.id = _id;
//     this.first_name = _first_name;
//     this.last_name = _last_name;
//     this.username = _username;
//   }

const validateFields = (data) => {
  const first_name = data.first_name;
  const last_name = data.last_name;
  const username = data.username;
  const password = data.password;
  const password_2 = data.password_2;
  let errors = {};

  if (!first_name || isEmpty(first_name) || !isAlpha(first_name)) {
    errors.first_name = "First name invalid";
  }
  if (!last_name || isEmpty(last_name) || !isAlpha(last_name)) {
    errors.last_name = "Last name invalid";
  }
  if (!username || !isLength(username, { min: 2, max: 20 })) {
    errors.username = "Username must be between 2 and 20 characters";
  }
  if (!password || !password_2 || isEmpty(password) || password != password_2) {
    errors.password = "Passwords must match and cannot be empty";
  }

  return errors;

}


module.exports = { validateFields }