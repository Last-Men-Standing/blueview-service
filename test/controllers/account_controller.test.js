"use strict";
const request = require("request-promise");
const app = require("../../src/services/server");
const { createMockAccount } = require("../_mocks/account");
const { deleteAccount } = require("../../src/repositories/account_repository");
const { createAccount, login, getById } = require("../../src/controllers/user/account_controller");
const { SERV_PORT } = process.env
const REQUEST_BASE_URL = `http://localhost:${SERV_PORT}`;


/**
 * Account controller testing suite
 * @todo Add test for GET request using internal id generated by the register test
 * @todo Delete the account after all tests are completed using account repo function
 */
describe("Account Controller test", () => {

  // Generate mock account
  const mockAccount = createMockAccount();
  // Internal id after DB insert
  let test_account_id;

  beforeAll(async () => {
    await app.start();
  });

  afterAll(async () => {
    await app.stop();
  });

  test("POST /account/register", async () => {

    const reqBody = {
      first_name: mockAccount.first_name,
      last_name: mockAccount.last_name,
      username: mockAccount.username,
      password: mockAccount.password,
      password_2: mockAccount.password
    }
    const baseOptions = { method: "POST", json: true, url: REQUEST_BASE_URL + "/account/register", body: reqBody };

    try {
      const response = await (request(baseOptions));
      expect(response.success).toBe(true);
      expect(response.account).toBeGreaterThan(0);
      test_account_id = response.account;
    }
    catch (error) {
      console.error(error)
      fail()
    }

  });

});