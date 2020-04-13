"use strict";

const allowCORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With-Content-Ttype, Accept");
  next();
}

module.exports = { allowCORS } 