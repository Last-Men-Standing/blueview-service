"use strict"
const { getConnection } = require("../services/postgres");


/**
 * @TODO Add support for rating and updating department_data inserts
 * @todo Cleanup this function, explore better ways to accomplish goals
 * @param {*} post_data 
 */
const insert = async (post_data) => {

  const { user_id, department_id, incident_date, title, body, rating } = post_data;
  const { attitude, communication, efficiency, fairness, safety } = rating

  const dbClient = await getConnection();
  const post_statement = "INSERT INTO post (user_id, department_id, incident_date, title, body) VALUES ($1, $2, $3, $4, $5) RETURNING id";

  const postResult = await dbClient.query(post_statement, [user_id, department_id, incident_date, title, body]);
  const post_id = postResult.rows[0].id

  if (postResult.rows.length < 1) {
    throw Error("Could not add post");
  }

  const rating_statement = "INSERT INTO rating (post_id, attitude, communication, efficiency, fairness, safety) VALUES ($1, $2, $3, $4, $5, $6) RETURNING post_id";
  const ratingResult = await dbClient.query(rating_statement, [post_id, attitude, communication, efficiency, fairness, safety]);

  if (ratingResult.rows.length < 1) {
    throw Error("Could not add post");
  }

  const dd_statement = "UPDATE department_data SET num_posts = num_posts + 1, attitude = attitude + $1, communication = communication + $2, efficiency = efficiency + $3, fairness = fairness + $4, safety = safety + $5 WHERE department_id = $6 RETURNING department_id";
  const DDresult = await dbClient.query(dd_statement, [attitude, communication, efficiency, fairness, safety, department_id]);

  if (DDresult.rows.length < 1) {
    throw Error("Could update department data");
  }

  dbClient.release();

  return post_id;

}

const getByDepartment = async (department_id) => {
  const dbClient = await getConnection();

  const statement = "SELECT * FROM post WHERE department_id = $1 ORDER BY created_at DESC";
  const getResult = await dbClient.query(statement, [department_id]);
  dbClient.release();


  if (getResult.rows.length < 1) {
    throw Error("Could not get posts");
  }
  return getResult.rows;

}

module.exports = { insert, getByDepartment }
