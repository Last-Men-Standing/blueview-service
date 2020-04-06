"use strict";
const express = require("express");
// Import controller functions
const { verifyToken } = require("../../middleware/authorization");
const { getDepartmentbyId, getDepartmentbyZipcode, getDepartments, createPost, getDepartmentPosts } = require("./department_controller");
const departmentRouter = express.Router();

departmentRouter.get("/all", getDepartments);
departmentRouter.get("/zipcode/:zipcode", getDepartmentbyZipcode);
departmentRouter.get("/:id", getDepartmentbyId);
departmentRouter.post("/:id/post/create", verifyToken, createPost)
departmentRouter.get("/:id/post/all", getDepartmentPosts)

exports.departmentRouter = departmentRouter;
