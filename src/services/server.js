"use strict";
const express = require("express");
const { start: pgStart, stop: pgStop } = require("./postgres");
const { SERV_PORT } = process.env;
const bodyParser = require("body-parser");
const { accountRouter } = require("../controllers/user/account_router")
const { departmentRouter } = require("../controllers/department/department_router")

const app = express();

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Add routes
app.use("/account", accountRouter)
app.use("/department", departmentRouter)

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
