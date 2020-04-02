"use strict";
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = process.env;

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ success: false, error: "UNAUTHORIZED" });
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const validatedToken = await jwt.verify(token, SECRET);
    next();
  }
  catch (err) {
    res.status(401).json({ success: false, error: "UNAUTHORIZED" });
  }

}

module.exports = { verifyToken }

