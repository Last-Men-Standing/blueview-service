"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const { allowCORS } = require("../middleware/cors");
const { start: pgStart, stop: pgStop } = require("./postgres");
const { SERV_PORT } = process.env;
const { accountRouter } = require("../controllers/user/account_router")
const { departmentRouter } = require("../controllers/department/department_router")

const app = express();

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(allowCORS);

// Add base routes and bind routers
app.use("/account", accountRouter)
app.use("/department", departmentRouter)

let serverInstance;

/**
 * Starts web server on port and starts postgres driver
 */
const start = async () => {
  await pgStart();
  serverInstance = app.listen(Number(SERV_PORT), () => {
    console.log(`App listening on ${Number(SERV_PORT)}`);
  });
};

/**
 * Stops postgres driver and closes web server
 */
const stop = async () => {
  await pgStop();
  serverInstance.close();
};

module.exports = { start, stop };
