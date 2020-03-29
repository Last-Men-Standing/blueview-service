"use strict";
const express = require("express");
// Import controller functions
const { createDepartment } = require("./department_controller");
const departmentRouter = express.Router();

departmentRouter.put("/createDepartment", createDepartment);

exports.departmentRouter = departmentRouter;
