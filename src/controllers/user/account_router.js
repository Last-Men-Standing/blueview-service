"use strict";
const express = require("express");
const cors = require("cors");
// Import controller functions
const { createAccount, login, getById } = require("./account_controller");
const accountRouter = express.Router();

accountRouter.options("*", cors());
accountRouter.post("/register", createAccount);
accountRouter.post("/login", login);
accountRouter.get("/:id", getById)

exports.accountRouter = accountRouter;
