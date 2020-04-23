"use strict";
const chance = require("chance").Chance();

/**
 * Creates a random mock user account 
 */
const createMockAccount = () => {
  const _first_name = chance.first();
  const _last_name = chance.last();
  const _username = _first_name + "_" + _last_name + chance.integer({ min: 1, max: 999 });
  const _password = chance.word({ length: 8 }) + chance.integer({ min: 1, max: 999 })

  return { first_name: _first_name, last_name: _last_name, username: _username, password: _password }
}

module.exports = { createMockAccount }