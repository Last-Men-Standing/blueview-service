"use strict";
const { getConnection } = require("../services/postgres");

/**
 * Department repository 
 * @author Anthony Chen, William Zawilinski
 * @TODO Refactor to throw errors up to controller layer
 * @TODO Post by Department Implementation
 */

/*
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
const getByAddress = async (address) => {
  const dbClient = await getConnection();
  const departmentResult = await dbClient.query("SELECT * FROM department WHERE address = $1", [address]);
  if (departmentResult.rows.length > 0) {
    return departmentResult.rows[0];
  }
  else {
    throw Error("Address not in Department");
  }
}
*/

const getById = async (id) => {
  const dbClient = await getConnection();
  const departmentResult = await dbClient.query("SELECT * FROM department WHERE id = $1", [id]);
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
  return departmentResult.rows;
}



module.exports = { getById, getByZipcode, getAll }