"use strict";
const chance = require("chance").Chance();

/**
 * Creates a random mock user account 
 */
const createMockAccount = () => {
  const _first_name = chance.word({ length: 8 });
  const _last_name = chance.word({ length: 8 });
  const _username = _first_name.substr(0,3) + _last_name.substr(0,4) + chance.integer({ min: 1, max: 9999 });
  const _password = chance.word({ length: 8 }) + chance.integer({ min: 1, max: 999 })

  return { first_name: _first_name, last_name: _last_name, username: _username, password: _password }
}

module.exports = { createMockAccount }