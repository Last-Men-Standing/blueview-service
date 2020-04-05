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

  if (isEmpty(first_name) || !isAlpha(first_name)) {
    return { error_type: "first_name", msg: "First name invalid" }
  }
  if (isEmpty(last_name) || !isAlpha(last_name)) {
    return { error_type: "last", msg: "Last name invalid" }
  }
  if (!isLength(username, { min: 2, max: 20 })) {
    return { error_type: "username", msg: "Username must be between 2 and 20 characters" }
  }
  if (isEmpty(password) || password != password_2) {
    return { error_type: "password", msg: "Passwords must match and cannot be empty" }
  }

  return { error_type: "none" }

}


module.exports = { validateFields }