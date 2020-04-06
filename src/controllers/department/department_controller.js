"use strict";
const { getAll, getById, getByZipcode } = require("../../repositories/department_repository");
const { insert, getByDepartment } = require("../../repositories/post_repository");
const { validateZipcode, validateId } = require("../../models/Department");
const { validateFields } = require("../../models/Post");
const { decodeToken } = require("../../authentication/token");


const getDepartmentbyAddress = async (req, res) => {
  const department_data = {
    address: req.body.address
  }
  const { error_type, msg } = validateAddress(department_data);
  if (error_type != "none") {
    res.status(400).json({ success: false, type: error_type, error: msg })
  }
  try {
    const departmentRequested = await getByAddress(department_data.address);
    res.status(200).json({ success: true, department: departmentRequested });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err })
  }

}

const getDepartmentbyId = async (req, res) => {
  const department_data = {
    id: req.params.id
  }
  const { error_type, msg } = validateId(department_data);
  if (error_type != "none") {
    res.status(400).json({ success: false, type: error_type, error: msg })
  }
  try {
    const departmentRequested = await getById(department_data.id);
    res.status(200).json({ success: true, department: departmentRequested });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err })
  }

}

const getDepartmentbyZipcode = async (req, res) => {
  const department_data = {
    zipcode: req.params.zipcode
  }
  const { error_type, msg } = validateZipcode(department_data);
  if (error_type != "none") {
    res.status(400).json({ success: false, type: error_type, error: msg })
  }
  try {
    const departmentRequested = await getByZipcode(department_data.zipcode);
    res.status(200).json({ success: true, department: departmentRequested });
  }
  catch (err) {
    res.status(500).json({ success: false, error: err })
  }

}
const getDepartments = async (req, res) => {
  try {
    const departmentsRequested = await getAll();
    res.status(200).json({ success: true, departments: departmentsRequested });
  }
  catch (err) {
    res.status(500).json({ success: false, error: "err" })
  }

}

/**
 * @TODO Add support for post rating
 * @param {*} req 
 * @param {*} res 
 */
const createPost = async (req, res) => {
  const payload = decodeToken(req.headers.authorization);
  const post_data = {
    user_id: payload.user_id,
    department_id: parseInt(req.params.id),
    incident_date: req.body.incident_date,
    title: req.body.title,
    body: req.body.body
  }

  const postValidation = validateFields(post_data);
  if (postValidation.error_type != "none") {
    res.status(500).json({ success: false, error_type: postValidation.error_type, error: postValidation.msg });
    return;
  }


  try {
    const insertResult = await insert(post_data);
    res.status(200).json({ success: true, post: post_data })
  }
  catch (err) {
    res.status(500).json({ success: false, error: err });
  }

}

const getDepartmentPosts = async (req, res) => {
  const department_id = req.params.id;

  try {
    const departmentPosts = await getByDepartment(department_id);
    res.status(200).json({ success: true, department_posts: departmentPosts })
  }
  catch (err) {
    res.status(500).json({ success: false, error: err })

  }
}



module.exports = { getDepartmentbyId, getDepartmentbyZipcode, getDepartments, createPost, getDepartmentPosts }

