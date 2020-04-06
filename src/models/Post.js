"use strict";
const { isEmpty, isAlpha, isLength } = require("validator");

/**
 * @todo Make these es6 classes, add rating validation
 * @param {*} data 
 */
const validateFields = (data) => {
  const title = data.title;
  const body = data.body;
  const incident_date = data.incident_date;

  if (!title || isEmpty(title)) {
    return { error_type: "title", msg: "Post title cannot be empty" }
  }
  if (!body || isEmpty(body)) {
    return { error_type: "body", msg: "Post body cannot be empty" }
  }
  if (!incident_date || isEmpty(incident_date)) {
    return { error_type: "date", msg: "Must select incident date" }
  }

  return { error_type: "none" }

}


module.exports = { validateFields }