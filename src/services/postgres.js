"use strict";
const pg = require("pg");
const { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE } = process.env;

let pool;

/**
 * Creates new Postgres connection pool
 */
const start = async () => {
  pool = new pg.Pool({
    host: PG_HOST,
    port: Number(PG_PORT),
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE
  });
};

/**
 * Returns a databse pool connection
 */
const getConnection = async () => {
  return pool.connect();
};

/**
 * Ends the Postgres pool
 */
const stop = async () => {
  await pool.end();
};

module.exports = { start, getConnection, stop };
