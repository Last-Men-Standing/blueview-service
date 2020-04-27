"use strict"
const { getConnection } = require("../services/postgres");


/**
 * Inserts post and rating into respective tables
 * @todo Cleanup this function, explore better ways to accomplish goals
 * @param {Object} post_data 
 */
const insert = async (post_data) => {

  const { user_id, department_id, incident_date, title, body, rating } = post_data;
  const { attitude, communication, efficiency, fairness, safety } = rating

  const dbClient = await getConnection();
  const post_statement = "INSERT INTO post (user_id, department_id, incident_date, title, body, tag) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";

  const postResult = await dbClient.query(post_statement, [user_id, department_id, incident_date, title, body, tag]);
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

/**
 * Query post by internal id
 * @param {number} id 
 */
const getById = async (id) => {
  const dbClient = await getConnection();

  const statement = "SELECT * FROM post WHERE id = $1";
  const getResult = await dbClient.query(statement, [id]);
  dbClient.release();

  if (getResult.rows.length < 1) {
    throw Error("Could not get post by id");
  }
  return getResult.rows[0];
}

/**
 * Query all posts by department id
 * @param {number} department_id 
 */
const getByDepartment = async (department_id) => {
  const dbClient = await getConnection();

  const statement = "SELECT * FROM post, rating WHERE department_id = $1 AND post.id = rating.post_id ORDER BY created_at DESC";
  const getResult = await dbClient.query(statement, [department_id]);
  dbClient.release();

  return getResult.rows;

}

/**
 * Insert reply into reply table
 * @param {Object} reply_data 
 */
const insertReply = async (reply_data) => {
  const dbClient = await getConnection();

  const statement = "INSERT INTO post_reply (parent_post_id, user_id, text) VALUES ($1, $2, $3) RETURNING id";
  const insertResult = await dbClient.query(statement, [reply_data.parent_post_id, reply_data.user_id, reply_data.text])
  dbClient.release();


  if (insertResult.rows.length < 1) {
    throw Error("Could not create reply");
  }
  return insertResult.rows[0].id;
}

/**
 * Query all replies by post id
 * @param {number} post_id 
 */
const getReplies = async (post_id) => {
  const dbClient = await getConnection();

  const statement = "SELECT * FROM post_reply WHERE parent_post_id = $1 ORDER BY created_at DESC ";
  const getResult = await dbClient.query(statement, [post_id])
  dbClient.release();

  return getResult.rows;
}


const getRecent = async () => {
  const dbClient = await getConnection();

  const statement = "SELECT * FROM post, rating WHERE post.id = rating.post_id ORDER BY post.created_at DESC LIMIT 5"
  const getResult = await dbClient.query(statement)
  dbClient.release();

  return getResult.rows;
}

const deleteById = async (id) => {
  const dbClient = await getConnection();

  const statement = "SELECT * FROM post, rating WHERE rating.post_id = $1 AND rating.post_id = post.id";
  const post_data = await dbClient.query(statement, [id]);
  const { attitude, communication, efficiency, fairness, safety, department_id } = post_data.rows[0];

  const dd_statement = "UPDATE department_data SET num_posts = num_posts - 1, attitude = attitude - $1, communication = communication - $2, efficiency = efficiency - $3, fairness = fairness - $4, safety = safety - $5 WHERE department_id = $6 RETURNING department_id";
  const DDresult = await dbClient.query(dd_statement, [attitude, communication, efficiency, fairness, safety, department_id]);

  const dr_statement = "DELETE FROM rating WHERE post_id = $1";
  const DRresult = await dbClient.query(dr_statement, [id]);

  const dreps_statement = "DELETE FROM post_reply WHERE parent_post_id = $1";
  const DRepsresult = await dbClient.query(dreps_statement, [id]);

  const dp_statement = "DELETE FROM post where id = $1";
  const DPresult = await dbClient.query(dp_statement, [id]);

  dbClient.release();

  return id;
}

const deleteReplyById = async (id) => {
  const dbClient = await getConnection();

  const dr_statement = "DELETE FROM post_reply WHERE id = $1 RETURNING *";
  const DRresult = await dbClient.query(dr_statement, [id]);

  if (DRresult.rows.length = 0) throw Error(`Could not delete post : ${id}`);

  return DRresult.rows[0];
}
module.exports = { insert, getByDepartment, insertReply, getReplies, getRecent, deleteById, deleteReplyById }
