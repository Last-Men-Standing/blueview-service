"use strict"
const { getConnection } = require("../services/postgres");

/**
 * @TODO Add support for rating and updating department_data inserts
 * @param {*} post_data 
 */
const insert = async (post_data) => {

  const { user_id, department_id, incident_date, title, body } = post_data;

  const dbClient = await getConnection();
  const post_statement = "INSERT INTO post (user_id, department_id, incident_date, title, body) VALUES ($1, $2, $3, $4, $5) RETURNING id";

  const postResult = await dbClient.query(post_statement, [user_id, department_id, incident_date, title, body]);
  if (postResult.rows.length < 1) {
    throw Error("Could not create post");
  }
  return postResult.rows[0].id;

}

module.exports = { insert }
