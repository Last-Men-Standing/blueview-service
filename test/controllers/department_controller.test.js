"use strict";
const request = require("request-promise");
const app = require("../../src/services/server");
const { createMockAccount } = require("../_mocks/account");
const { createMockPost } = require("../_mocks/post");
const { deleteAccount } = require("../../src/repositories/account_repository");
const { SERV_PORT } = process.env
const REQUEST_BASE_URL = `http://localhost:${SERV_PORT}`;


/**
 * Account controller testing suite
 * @todo Add test for GET request using internal id generated by the register test
 * @todo Delete the account after all tests are completed using account repo function
 */
describe("Department Controller test", () => {

  // Generate mock account and post
  const mockAccount = createMockAccount();
  const mockPost = createMockPost();

  // Internal id after DB insert
  let test_account_id;
  let test_account_token;
  let test_post_id;

  beforeAll(async () => {
    await app.start();
  });

  afterAll(async () => {
    await app.stop();
  });

  // Register mock user to generate JWT required for post creation
  test("POST /account/register", async () => {

    const reqBody = {
      first_name: mockAccount.first_name,
      last_name: mockAccount.last_name,
      username: mockAccount.username,
      password: mockAccount.password,
      password_2: mockAccount.password
    }
    const baseOptions = {
      method: "POST",
      json: true,
      url: REQUEST_BASE_URL + "/account/register",
      body: reqBody
    };
    try {
      const response = await (request(baseOptions));
      test_account_id = response.account;
      test_account_token = response.credentials;
      expect(response.success).toBe(true);
      expect(response.account).toBeGreaterThan(0);
    }
    catch (error) {
      console.error(error)
      fail()
    }

  });

  // Test get all departments
  /**
   * @todo Add expect to verify the departments in response
   */
  test(`GET /department/all`, async () => {

    const baseOptions = {
      method: "GET",
      json: true,
      url: REQUEST_BASE_URL + `/department/all`
    };

    try {
      const response = await (request(baseOptions));
      expect(response.success).toBe(true);
    }
    catch (error) {
      console.error(error)
      fail()
    }

  });


  /**
   * @todo Add expects to verify the proper department is fetched
   */
  test(`GET /department/zipcode/12180`, async () => {

    const baseOptions = {
      method: "GET",
      json: true,
      url: REQUEST_BASE_URL + `/department/zipcode/12180`
    };

    try {
      const response = await (request(baseOptions));
      expect(response.success).toBe(true);
    }
    catch (error) {
      console.error(error)
      fail()
    }

  });


  /**
   * @todo Add expects to verify the proper department is fetched
   */
  test(`GET /department/${mockPost.department_id}`, async () => {

    const baseOptions = {
      method: "GET",
      json: true,
      url: REQUEST_BASE_URL + `/department/${mockPost.department_id}`
    };

    try {
      const response = await (request(baseOptions));
      expect(response.success).toBe(true);
    }
    catch (error) {
      console.error(error)
      fail()
    }

  });

  //post creation
  test(`POST /department/${mockPost.department_id}/post/create`, async () => {
    const reqBody = {
      user_id: test_account_id,
      department_id: mockPost.department_id,
      incident_date: mockPost.incident_date,
      title: mockPost.title,
      body: mockPost.body,
      attitude: mockPost.attitude,
      communication: mockPost.communication,
      efficiency: mockPost.efficiency,
      fairness: mockPost.fairness,
      safety: mockPost.safety
    }
    const reqHeaders = {
      Authorization: test_account_token
    };
    const baseOptions = {
      method: "POST", json: true,
      url: REQUEST_BASE_URL + `/department/${reqBody.department_id}/post/create`,
      body: reqBody,
      headers: reqHeaders
    };

    try {
      const response = await (request(baseOptions));

      expect(response.success).toBe(true);
      expect(response.post.user_id).toEqual(test_account_id);
      expect(response.post.title).toEqual(mockPost.title);
      expect(response.post.body).toEqual(mockPost.body);
      expect(response.post.rating.attitude).toEqual(mockPost.attitude)
      expect(response.post.rating.communication).toEqual(mockPost.communication);
      expect(response.post.rating.efficiency).toEqual(mockPost.efficiency);
      expect(response.post.rating.fairness).toEqual(mockPost.fairness);
      expect(response.post.rating.safety).toEqual(mockPost.safety);

      test_post_id = response.post.id;
    }
    catch (error) {
      console.error(error)
      fail()
    }

  });

  /**
   * @todo Add expects to verify the proper department is fetched
   */
  test(`GET /department/${mockPost.department_id}/post/all`, async () => {

    const baseOptions = {
      method: "GET",
      json: true,
      url: REQUEST_BASE_URL + `/department/${mockPost.department_id}/post/all`
    };

    try {
      const response = await (request(baseOptions));
      expect(response.success).toBe(true);
    }
    catch (error) {
      console.error(error)
      fail()
    }

  });

  //get department rating
  test(`GET /department/${mockPost.department_id}/rating`, async () => {

    const baseOptions = {
      method: "GET",
      json: true,
      url: REQUEST_BASE_URL + `/department/${mockPost.department_id}/rating`
    };

    try {
      const response = await (request(baseOptions));
      expect(response.success).toBe(true);
      expect(response.rating.department_id).toEqual(mockPost.department_id.toString());
    }
    catch (error) {
      console.error(error)
      fail()
    }

  });


  // Test create post reply
  test(`POST /department/${mockPost.department_id}/post/${test_post_id}/reply`, async () => {
    const reqBody = {
      text: mockPost.body
    }
    const reqHeaders = {
      Authorization: test_account_token
    };
    const baseOptions = {
      method: "POST",
      json: true,
      url: REQUEST_BASE_URL + `/department/${mockPost.department_id}/post/${test_post_id}/reply`,
      body: reqBody,
      headers: reqHeaders
    };

    try {
      const response = await (request(baseOptions));
      expect(response.success).toBe(true);
      expect(response.reply.parent_post_id).toEqual(test_post_id);
      expect(response.reply.user_id).toEqual(test_account_id);
      expect(response.reply.text).toEqual(mockPost.body);
      expect(response.reply.id).toBeGreaterThan(0);
    }
    catch (error) {
      console.error(error)
      fail()
    }
  });

  // Test get post reply
  test(`GET /department/${mockPost.department_id}/post/${test_post_id}/replies`, async () => {
    const baseOptions = {
      method: "GET",
      json: true,
      url: REQUEST_BASE_URL + `/department/${mockPost.department_id}/post/${test_post_id}/replies`,
    };

    try {
      const response = await (request(baseOptions));
      expect(response.success).toBe(true);
    }
    catch (error) {
      console.error(error)
      fail()
    }
  });

});