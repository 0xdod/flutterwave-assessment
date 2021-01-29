const checkRequiredProperties = function (object, props) {
  var errors = [];
  if (!Array.isArray(props)) {
    throw new Error('Props should be an array of properties.');
    return;
  }
  for (let prop of props) {
    if (!object[prop]) {
      errors.push(new Error(`${prop} is required`));
    }
  }
  return errors.length > 0 ? errors : null;
};

const isObject = function (obj) {
  return typeof obj === 'object' && obj !== null;
};

const isString = function (param) {
  return typeof param === 'string';
};

const isArray = function (param) {
  return Array.isArray(param);
};

const conditionChoices = ['eq', 'neq', 'gt', 'gte', 'contains'];

const validateCondition = function (choice) {
  if (typeof choice !== 'string') {
    return new Error('condition should be a string.');
  }
  if (!conditionChoices.includes(choice)) {
    return new Error('Invalid choice for condition field.');
  }
  return null;
};

function isRulePresentInData(field, data) {
  return data[field] !== undefined;
}

module.exports = {
  checkRequiredProperties,
  validateCondition,
  isObject,
  isArray,
  isString,
  isRulePresentInData,
};

/*
payload = {
  "rule": {
    "field": "missions"
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}

Validation rules:
- [DONE]`rule` and `data` property are required in request body
- rule-validation:
  - [DONE] should be valid json object
  - [DONE]should contain a `field` property of type (string)
  - [DONE] should contain a `condition` property, whose value is within a range of choices
  - [DONE] should contain a `condition-value` property
- data-validation:
  - [DONE] should be of type object, array or string


[DONE]If a required field isn't passed:
http-status=400
response = {
  "message": "[field] is required."
  "status": "error",
  "data": null
}

[DONE]If a field has a wrong type:
http-status = 400
response={
  "message": "[field] should be a|an [type]."
  "status": "error",
  "data": null
}

[DONE] If invalid JSON:
http-status = 400
response = {
  "message": "Invalid JSON payload passed."
  "status": "error",
  "data": null
}

[DONE]If the field specified in the rule object is missing from the data passed
http-status = 400
response = {
  "message": "field [name of field] is missing from data."
  "status": "error",
  "data": null
}

[DONE]If successfully validated:
http-status = 400
response = {
  "message": "field [name of field] successfully validated."
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "[name of field]",
      "field_value": [value of field],
      "condition": "[rule condition]",
      "condition_value: [condition value]
    }
  }
}

[DONE]If validation fails:
http-status = 400
response = {
  "message": "field [name of field] failed validation."
  "status": "error",
  "data": {
    "validation": {
      "error": true,
      "field": "[name of field]",
      "field_value": [value of field],
      "condition": "[rule condition]",
      "condition_value: [condition value]
    }
  }
}

Since data can be an object, an array or string,
- Field can represent either
- a string index,
- an array value
- an object property 
*/
