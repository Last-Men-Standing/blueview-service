"use strict";
const express = require("express");
// Import controller functions
const { createAccount } = require("./account_controller");
const accountRouter = express.Router();

accountRouter.put("/createAccount", createAccount);

exports.accountRouter = accountRouter;
