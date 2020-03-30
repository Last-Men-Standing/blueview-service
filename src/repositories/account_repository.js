"use strict";
const { getConnection } = require("../services/postgres");
const { hashPassword } = require("../authentication/password");

/**
 * Account repository 
 * @author William Zawilinski
 * @TODO Refactor to throw errors up to controller layer, fix department id in account schema
 */

const getByUsername = async (username) => {
  const userId = 0;
  try {
    const dbClient = await getConnection();
    const accountResult = await dbClient.query("SELECT * FROM account WHERE username = $1", [username]);
    if (accountResult.rows.length < 1) {
      return userId;
    }
    else {
      return accountResult.rows[0];
    }
  }
  catch (error) {
    console.error(`DB Error: ${error}`)
  }
}

const create = async (account_data) => {
  const first_name = account_data.first_name;
  const last_name = account_data.last_name;
  const username = account_data.username;
  const pass_hash = await hashPassword(account_data.password);
  const department_id = 0;

  const dbClient = await getConnection();
  const statement = "INSERT INTO account (department_id, firstName, lastName, username, pass_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id";
  const createResult = await dbClient.query(statement, [department_id, first_name, last_name, username, pass_hash]);
  return createResult;

  if (createResult.rows.length < 1) {
    console.error(createResult);
    throw Error("Could not create account");
  }
  return createResult.rows[0]["id"];

}

const get = async (id) => {
  const dbClient = await getConnection();
  const statement = "SELECT * FROM account WHERE id = $1";
  const getResult = await dbClient.query(statement, [id]);

  if (getResult.rows.length < 1) throw Error("Could not fetch account");
  return getResult.rows[0]


}

module.exports = { getByUsername, create, get }