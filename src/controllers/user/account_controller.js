"use strict";
const { getByUsername, create, get } = require("../../repositories/account_repository");
const { validateFields } = require("../../models/Account");
const { createToken } = require("../../authentication/token");
const { verifyPassword } = require("../../authentication/password");

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
  const account = await getByUsername(account_data.username);
  if (account.id > 0) {
    res.status(400).json({ success: false, error: "Username already in use " })
    return;
  }
  try {
    const accountCreated = await create(account_data);
    const token = await createToken(account_data)
    res.status(200).json({ success: true, credentials: `Bearer ${token}`, account: accountCreated });
  }
  catch (error) {
    res.status(500).json({ success: false, err: "Error creating account" })
  }

}

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const account = await getByUsername(username);
  if (account == 0) {
    res.status(400).json({ success: false, error: "Account not found" })
    return;
  }
  // Need to compare passwords
  const pass_match = await verifyPassword(password, account.pass_hash);
  if (!pass_match) {
    res.status(401).json({ success: false, error: "Invalid login" });
    return;
  }

  const token = await createToken(account)
  res.status(200).json({ success: true, credentials: `Bearer ${token}`, account: account });

}

const getById = async (req, res) => {
  console.log(req.params.id)
  try {
    const getResult = await get(req.params.id);
    res.status(200).json({ success: true, account: getResult })
  }
  catch (error) {
    res.status(500).json({ success: false, err: error })
  }
}

module.exports = { createAccount, login, getById }

