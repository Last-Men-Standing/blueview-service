"use strict";
const { getConnection } = require("../services/postgres");

/**
 * Department repository 
 * @author Anthony Chen, William Zawilinski
 * @TODO Refactor to throw errors up to controller layer
 */

const checkAddressExists = async (address) => {
  try {
    const dbClient = await getConnection();
    const departmentResult = await dbClient.query("SELECT * FROM department WHERE address = $1", [address]);
    if (departmentResult.rows.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
  catch (error) {
    console.error(`DB Error: ${error}`)
  }
}

const create = async (department_data) => {
  const name = department_data.name;
  const address = department_data.address;
  const zipcode = department_data.zipcode;
  const overall_rating = department_data.overall_rating;
  

  try {
    const dbClient = await getConnection();
    const statement = "INSERT INTO department (name, address, zipcode, overall_rating) VALUES ($1, $2, $3, $4) RETURNING id";
    const createResult = await dbClient.query(statement, [name, address, zipcode, overall_rating]);
    return createResult;

    if (createResult.rows.length < 1) {
      console.error(createResult);
      throw Error("Could not create department");
    }
    return createResult.rows[0]["id"];
  }
  catch (error) {
    console.error(`DB Error: ${error}`)
  }
}

module.exports = { checkAddressExists, create }