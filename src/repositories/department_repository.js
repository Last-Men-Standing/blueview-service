"use strict";
const { getConnection } = require("../services/postgres");

/**
 * Department repository 
 * @author Anthony Chen, William Zawilinski
 * @TODO Refactor to throw errors up to controller layer
 * @TODO Post by Department Implementation
 */


const getById = async (id) => {
  const dbClient = await getConnection();
  const departmentResult = await dbClient.query("SELECT * FROM department WHERE id = $1", [id]);
  dbClient.release();

  if (departmentResult.rows.length > 0) {
    return departmentResult.rows;
  }
  else {
    throw "ID not in Department";
  }
}

const getByZipcode = async (zipcode) => {
  const dbClient = await getConnection();
  const departmentResult = await dbClient.query("SELECT * FROM department WHERE zipcode = $1", [zipcode]);
  dbClient.release();

  if (departmentResult.rows.length > 0) {
    return departmentResult.rows;
  }
  else {
    throw "Zipcode not in Department";
  }
}

const getAll = async () => {
  const dbClient = await getConnection();
  const departmentResult = await dbClient.query("SELECT * FROM department GROUP BY id ORDER BY name");
  dbClient.release();

  return departmentResult.rows;
}

/**
 * @todo Refactor this later to cleanup logic, kinda ugly
 * @param {int} id 
 */
const getRating = async (id) => {
  const dbClient = await getConnection();
  const ratingData = await dbClient.query("SELECT * FROM department_data WHERE department_id = $1", [id]);
  let { num_posts, attitude, communication, efficiency, fairness, safety } = ratingData.rows[0]
  let rating_data = [attitude, communication, efficiency, fairness, safety]
  let averages = []
  dbClient.release();

  // The highest possible count for each field will be 5 * num posts for each category
  // Each rating is out of 5 
  const max_count = 5 * parseInt(num_posts);
  let overall = 0;
  for (let i = 0; i < 5; i++) {
    rating_data[i] = (parseInt(rating_data) / max_count) * 5
    averages.push(rating_data[i])
    overall += rating_data[i];
  }
  overall = overall / 5;

  const rating = {
    department_id: id,
    attitude: averages[0],
    communication: averages[1],
    efficiency: averages[2],
    fairness: averages[3],
    safety: averages[4],
    overall: overall
  }

  return rating;

}


module.exports = { getById, getByZipcode, getAll, getRating }