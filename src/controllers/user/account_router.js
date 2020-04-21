"use strict";
const express = require("express");
const cors = require("cors");
const { createAccount, login, getById } = require("./account_controller");
const accountRouter = express.Router();

/**
 * Add all routes and bind controller callback functions
 */
accountRouter.options("*", cors());
accountRouter.post("/register", createAccount);
accountRouter.post("/login", login);
accountRouter.get("/:id", getById)

exports.accountRouter = accountRouter;
