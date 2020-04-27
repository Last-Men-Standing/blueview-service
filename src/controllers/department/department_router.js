"use strict";
const express = require("express");
const cors = require("cors");
const { verifyToken } = require("../../middleware/authorization");
const { getDepartmentbyId, getDepartmentbyZipcode,
  getDepartments, createPost, getDepartmentPosts,
  getDepartmentRating, createPostReply, getRepliesbyPost, getRecentPosts, deletePost
} = require("./department_controller");
const departmentRouter = express.Router();

/**
 * Add all routes and corresponding controller functions
 * @todo Consider what moving post functions to new controller would involve, would require department routes
 */
departmentRouter.options("*", cors());
departmentRouter.get("/all", getDepartments);
departmentRouter.get("/zipcode/:zipcode", getDepartmentbyZipcode);
departmentRouter.get("/:id", getDepartmentbyId);
departmentRouter.post("/:id/post/create", verifyToken, createPost);
departmentRouter.get("/:id/post/all", getDepartmentPosts);
departmentRouter.get("/:id/rating", getDepartmentRating);
//departmentRouter.get("/:id/post/:post_id", getPostbyId)
departmentRouter.post("/:id/post/:post_id/reply", verifyToken, createPostReply);
departmentRouter.get("/:id/post/:post_id/replies", getRepliesbyPost);
departmentRouter.get("/post/recent", getRecentPosts)
departmentRouter.delete("/post/:post_id/delete", deletePost)

exports.departmentRouter = departmentRouter;
