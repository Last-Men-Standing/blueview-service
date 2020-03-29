"use strict";
const { isEmpty, isLength, isNumeric} = require("validator");

const validateFields = (data) => {
  const name = data.name;
  const address = data.address;
  const zipcode = data.zipcode;
  const overall_rating = data.overall_rating;
 
  if (isEmpty(name)) {
    return { error_type: "name", msg: "Department name cannot be empty" }
  }
  if (isEmpty(address)) {
    return { error_type: "address", msg: "Address cannot be empty" }
  }
  if (isEmpty(zipcode) || !isLength(zipcode, 5)) {
    return { error_type: "zipcode", msg: "Zipcode must be 5 characters" }
  }
  if (isEmpty(overall_rating) || !isNumeric(overall_rating) || overall_rating <0 || overall_rating >5) {
    return { error_type: "overall_rating", msg: "Invalid overall_rating" }
  }

  return { error_type: "none" }

}


module.exports = { validateFields }