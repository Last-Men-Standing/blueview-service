"use strict";
const { getAll, getById, getByZipcode, getRating } = require("../../repositories/department_repository");
const { insert, getByDepartment, insertReply, getReplies,
  getRecent, deleteById, deleteReplyById
} = require("../../repositories/post_repository");
const { validateZipcode, validateId } = require("../../models/Department");
const { validateFields } = require("../../models/Post");
const { decodeToken } = require("../../authentication/token");


/**
 * @todo Either remove or implement this function somewhere
 * @param {*} req 
 * @param {*} res 
 */
const getDepartmentbyAddress = async (req, res) => {
  const department_data = {
    address: req.body.address
  }
  const { error_type, msg } = validateAddress(department_data);
  if (error_type != "none") {
    res.status(400).json({ success: false, type: error_type, error: msg });
  }
  try {
    const departmentRequested = await getByAddress(department_data.address);
    res.status(200).json({ success: true, department: departmentRequested });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err });
  }

}

/**
 * Fetches department by internal id
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getDepartmentbyId = async (req, res) => {
  const department_data = {
    id: req.params.id
  }
  const { error_type, msg } = validateId(department_data);
  if (error_type != "none") {
    res.status(400).json({ success: false, type: error_type, error: msg });
  }
  try {
    const departmentRequested = await getById(department_data.id);
    res.status(200).json({ success: true, department: departmentRequested });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err });
  }

}

/**
 * Fetches department by zipcode
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getDepartmentbyZipcode = async (req, res) => {
  const department_data = {
    zipcode: req.params.zipcode
  }
  const { error_type, msg } = validateZipcode(department_data);
  if (error_type != "none") {
    res.status(400).json({ success: false, type: error_type, error: msg });
  }
  try {
    const departmentRequested = await getByZipcode(department_data.zipcode);
    res.status(200).json({ success: true, department: departmentRequested });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err });
  }

}

/**
 * Fetches all departments
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getDepartments = async (req, res) => {
  try {
    const departmentsRequested = await getAll();
    res.status(200).json({ success: true, departments: departmentsRequested });
  }
  catch (err) {
    res.status(500).json({ success: false, error: "err" });
  }

}

/**
 * Creates a post by a user for a department, includes rating
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const createPost = async (req, res) => {
  const payload = decodeToken(req.headers.authorization);
  const post_data = {
    id: null,
    user_id: payload.user_id,
    department_id: parseInt(req.params.id),
    incident_date: req.body.incident_date,
    title: req.body.title,
    body: req.body.body,
    tag: req.body.tag,
    rating: {
      attitude: req.body.attitude,
      communication: req.body.communication,
      efficiency: req.body.efficiency,
      fairness: req.body.fairness,
      safety: req.body.safety
    }
  }


  const postValidation = validateFields(post_data);
  if (postValidation.error_type != "none") {
    res.status(500).json({ success: false, error_type: postValidation.error_type, error: postValidation.msg });
    return;
  }

  try {
    const postId = await insert(post_data);
    post_data.id = postId;
    res.status(200).json({ success: true, post: post_data });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err });
  }

}

/**
 * Fetches all posts for a department
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getDepartmentPosts = async (req, res) => {
  const department_id = req.params.id;

  try {
    const departmentPosts = await getByDepartment(department_id);
    res.status(200).json({ success: true, department_posts: departmentPosts });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err });

  }
}

/**
 * Returns calculated department rating
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getDepartmentRating = async (req, res) => {
  const department_id = req.params.id;
  try {
    const departmentRating = await getRating(department_id);
    res.status(200).json({ success: true, rating: departmentRating });
  }

  catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

/**
 * @todo implement this function
 * @param {*} req 
 * @param {*} res 
 */
const getPostById = async (req, res) => {
  const id = req.params.id;

  // try {
  //   const post = await getById
  // }
  // catch (err) {
  //   res.status(500).json({ success: false, error: err });
  // }
}


/**
 * Creates a reply for a department post
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const createPostReply = async (req, res) => {
  const payload = decodeToken(req.headers.authorization);
  const reply_data = {
    parent_post_id: parseInt(req.params.post_id),
    user_id: payload.user_id,
    text: req.body.text,
  }

  try {
    const replyId = await insertReply(reply_data);
    reply_data.id = replyId;
    res.status(200).json({ success: true, reply: reply_data });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err });
  }

}

/**
 * Fetches all replies for a department post
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getRepliesbyPost = async (req, res) => {
  const post_id = parseInt(req.params.post_id);
  try {
    const replies = await getReplies(post_id);
    res.status(200).json({ success: true, replies: replies });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

const getRecentPosts = async (req, res) => {
  let recentPosts = []
  try {
    const posts = await getRecent();
    for (let i = 0; i < posts.length; i++) {
      let post = posts[i];
      const replies = await getReplies(post.id);
      post.replies = replies;
      recentPosts.push(post);

    }
    res.status(200).json({ success: true, recent: recentPosts });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err });
  }


}

const deletePost = async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const deleteResult = await deleteById(post_id);
    res.status(200).json({ success: true, deletedPost: deleteResult });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }

}

const deleteReply = async (req, res) => {
  const reply_id = req.params.reply_id;
  try {
    const deleteResult = await deleteReplyById(reply_id);
    res.status(200).json({ success: true, deletedPost: deleteResult });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }

}





module.exports = {
  getDepartmentbyId, getDepartmentbyZipcode, getDepartments, createPost,
  getDepartmentPosts, getDepartmentRating, createPostReply, getRepliesbyPost,
  getRecentPosts, deletePost, deleteReply
}

