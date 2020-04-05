"use strict";
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, TOKEN_EXP } = process.env;

const createToken = async (user_data) => {
  const userPayload = { username: user_data.username, first_name: user_data.first_name, user_id: user_data.id }
  const tokenConfig = { expiresIn: parseInt(TOKEN_EXP) }

  const token = await jwt.sign(userPayload, Buffer.from(PRIVATE_KEY).toString('base64'), tokenConfig);
  return token;

}

const decodeToken = (header) => {
  const token = header.split(' ')[1];
  const decodedToken = jwt.decode(token);

  return decodedToken;
}

module.exports = { createToken, decodeToken }
