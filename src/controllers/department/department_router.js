"use strict";
const express = require("express");
// Import controller functions
const { getDepartmentbyAddress, getDepartmentbyId, getDepartmentbyZipcode, getDepartments } = require("./department_controller");
const departmentRouter = express.Router();

departmentRouter.get("/getDepartmentbyAddress", getDepartmentbyAddress);
departmentRouter.get("/getDepartmentbyId", getDepartmentbyId);
departmentRouter.get("/getDepartmentbyZipcode", getDepartmentbyZipcode);
departmentRouter.get("/getDepartments", getDepartments);

exports.departmentRouter = departmentRouter;
