"use strict";
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, TOKEN_EXP } = process.env;

const createToken = async (user_data) => {
  const userPayload = { user_id: user_data.user_id, username: user_data.username, first_name: user_data.first_name }
  const tokenConfig = { expiresIn: parseInt(TOKEN_EXP) }

  const token = await jwt.sign(userPayload, PRIVATE_KEY, tokenConfig);
  return token;

}

const decodeToken = (token) => {
  const decodedToken = jwt.decode(token);
  return decodedToken.payload;
}

module.exports = { createToken, decodeToken }
