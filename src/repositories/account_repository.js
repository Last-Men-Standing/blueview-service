"use strict";
const { getConnection } = require("../services/postgres");
const { hashPassword } = require("../authentication/password");

/**
 * Account repository 
 * @author William Zawilinski
 * @TODO Refactor to throw errors up to controller layer, fix department id in account schema
 */


/**
 * Querys account table by username
 * @param {string} username 
 */
const getByUsername = async (username) => {
  const userId = 0;

  const dbClient = await getConnection();
  const accountResult = await dbClient.query("SELECT * FROM account WHERE username = $1", [username]);
  dbClient.release();
  if (accountResult.rows.length < 1) {
    return userId;
  }
  else {
    return accountResult.rows[0];
  }

}

/**
 * Inserts new account in account table
 * @param {Object} account_data 
 */
const create = async (account_data) => {
  const first_name = account_data.first_name;
  const last_name = account_data.last_name;
  const username = account_data.username;
  const pass_hash = await hashPassword(account_data.password);

  const dbClient = await getConnection();
  const statement = "INSERT INTO account (first_name, last_name, username, pass_hash) VALUES ($1, $2, $3, $4) RETURNING id;";
  const createResult = await dbClient.query(statement, [first_name, last_name, username, pass_hash]);
  dbClient.release();

  if (createResult.rows.length < 1) {
    console.error(createResult);
    throw Error("Could not create account");
  }
  return createResult.rows[0].id;

}

/**
 * Querys account by internal id
 * @param {*} id 
 */
const get = async (id) => {
  const dbClient = await getConnection();
  const statement = "SELECT * FROM account WHERE id = $1;";
  const getResult = await dbClient.query(statement, [id]);
  dbClient.release();

  if (getResult.rows.length < 1) throw Error("Could not fetch account");
  return getResult.rows[0]

}

const deleteAccount = async (id) => {
  const dbClient = await getConnection();
  const statement = "DELETE FROM account WHERE id = $1 RETURNING *";
  const delResult = await dbClient.query(statement, [id]);
  dbClient.release();

  if (delResult.rows.length < 1) throw Error("Could delete account");
  return delResult.rows[0]

}

module.exports = { getByUsername, create, deleteAccount, get }