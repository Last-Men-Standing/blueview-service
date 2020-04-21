"use strict";
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

/**
 * Uses bcrypt to hash password and returns this hash
 * @param {string} password 
 */
const hashPassword = async (password) => {
  const hashed_pass = await bcrypt.hash(password, SALT_ROUNDS);
  return hashed_pass;
}

/**
 * Uses bcyrpt to compare plain text and hashed password
 * @param {string} password 
 * @param {string} hashed_pass 
 */
const verifyPassword = async (password, hashed_pass) => {
  const match_result = await bcrypt.compare(password, hashed_pass);
  return match_result;
}

module.exports = { hashPassword, verifyPassword }