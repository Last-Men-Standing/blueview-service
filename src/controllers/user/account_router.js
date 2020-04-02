"use strict";
const express = require("express");
// Import controller functions
const { createAccount, login, getById } = require("./account_controller");
const accountRouter = express.Router();

accountRouter.post("/createAccount", createAccount);
accountRouter.post("/login", login);
accountRouter.get("/:id", getById)

exports.accountRouter = accountRouter;
