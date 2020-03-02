"use strict";
const express = require("express");
const { start: pgStart, stop: pgStop } = require("./postgres");
const { SERV_PORT } = process.env;

const app = express();
// Add routes
// Add middleware
let serverInstance;

const start = async () => {
  await pgStart();
  serverInstance = app.listen(Number(SERV_PORT), () => {
    console.log(`App listening on ${Number(SERV_PORT)}`);
  });
};

const stop = async () => {
  await pgStop();
  serverInstance.close();
};

module.exports = { start, stop };
