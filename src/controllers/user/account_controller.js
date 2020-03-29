"use strict";
const { checkUsernameExists, create } = require("../../repositories/account_repository");
const { validateFields } = require("../../models/Account");

const createAccount = async (req, res) => {
  const account_data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    password_2: req.body.password_2
  }
  const { error_type, msg } = validateFields(account_data);
  if (error_type != "none") {
    res.status(400).json({ success: false, type: error_type, error: msg })
  }
  const accountExists = await checkUsernameExists(account_data.username);
  if (accountExists) {
    res.status(400).json({ success: false, error: "Username already in use " })
    return;
  }
  try {
    const accountCreated = await create(account_data);
    res.status(200).json({ success: true, account: accountCreated });
  }
  catch (err) {
    res.status(500).json({ success: false, error: "err" })
  }

}


module.exports = { createAccount }

