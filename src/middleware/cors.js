"use strict";

/**
 * Configure CORS to accept frontend requests
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next
 */
const allowCORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With-Content-Ttype, Accept");
  res.header("Access-Control-Allow-Headers", "Authorization");
  next();
}

module.exports = { allowCORS } 