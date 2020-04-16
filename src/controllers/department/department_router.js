"use strict";
const express = require("express");
const cors = require("cors");
// Import controller functions
const { verifyToken } = require("../../middleware/authorization");
const { getDepartmentbyId, getDepartmentbyZipcode, getDepartments, createPost, getDepartmentPosts, getDepartmentRating, createPostReply, getRepliesbyPost } = require("./department_controller");
const departmentRouter = express.Router();

/**
 * @todo Large refactor to create post controller and router, need to figure out best way to do this
 */
departmentRouter.options("*", cors());
departmentRouter.get("/all", getDepartments);
departmentRouter.get("/zipcode/:zipcode", getDepartmentbyZipcode);
departmentRouter.get("/:id", getDepartmentbyId);
departmentRouter.post("/:id/post/create", verifyToken, createPost);
departmentRouter.get("/:id/post/all", getDepartmentPosts);
departmentRouter.get("/:id/rating", getDepartmentRating);
//departmentRouter.get("/:id/post/:post_id", getPostbyId)
departmentRouter.post("/:id/post/:post_id/reply", createPostReply);
departmentRouter.get("/:id/post/:post_id/replies", getRepliesbyPost);

exports.departmentRouter = departmentRouter;
