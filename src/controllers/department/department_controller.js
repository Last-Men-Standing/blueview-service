"use strict";
const { checkAddressExists, create } = require("../../repositories/department_repository");
const { validateFields } = require("../../models/Department");

const createDepartment = async (req, res) => {
  const department_data = {
    name: req.body.name,
    address: req.body.address,
    zipcode: req.body.zipcode, 
    overall_rating: req.body.overall_rating
  }
  const { error_type, msg } = validateFields(department_data);
  if (error_type != "none") {
    res.status(400).json({ success: false, type: error_type, error: msg })
  }
  const departmentExists = await checkAddressExists(department_data.address);
  if (departmentExists) {
    res.status(400).json({ success: false, error: "A department at this address already exists " })
    return;
  }
  try {
    const departmentCreated = await create(department_data);
    res.status(200).json({ success: true, department: departmentCreated });
  }
  catch (err) {
    res.status(500).json({ success: false, error: "err" })
  }

}


module.exports = { createDepartment }

