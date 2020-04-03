"use strict";
const express = require("express");
// Import controller functions
const { getDepartmentbyId, getDepartmentbyZipcode, getDepartments } = require("./department_controller");
const departmentRouter = express.Router();

departmentRouter.get("/getbyid/:id", getDepartmentbyId);
departmentRouter.get("/zipcode/:zipcode", getDepartmentbyZipcode);
departmentRouter.get("/all", getDepartments);

exports.departmentRouter = departmentRouter;
