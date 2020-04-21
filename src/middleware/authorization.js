"use strict";
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = process.env;

/**
 * JWT middleware to validate token on protected endpoints
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next 
 */
const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ success: false, error: "UNAUTHORIZED" });
  }
  const token = req.headers.authorization.split(' ')[1];
  let validatedToken;
  try {
    validatedToken = jwt.verify(token, Buffer.from(PRIVATE_KEY).toString('base64'));
    next();
  }
  catch (err) {
    res.status(401).json({ success: false, error: "UNAUTHORIZED" });
  }

}

module.exports = { verifyToken }

