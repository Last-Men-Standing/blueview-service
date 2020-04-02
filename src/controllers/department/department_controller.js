"use strict";
const { getAll, getByAddress, getById, getByZipcode } = require("../../repositories/department_repository");
const { validateAddress, validateId, validateZipcode } = require("../../models/Department");


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

module.exports = { getDepartmentbyAddress, getDepartmentbyId, getDepartmentbyZipcode, getDepartments }

