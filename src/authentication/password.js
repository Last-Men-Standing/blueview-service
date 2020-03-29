"use strict";
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  const hashed_pass = await bcrypt.hash(password, SALT_ROUNDS);
  return hashed_pass;
}

const verifyPassword = async (password, hashed_pass) => {
  const match_result = await bcrypt.compare(password, hashed_pass);
  return match_result;
}

module.exports = { hashPassword, verifyPassword }