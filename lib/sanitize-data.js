const validator = require('./validator');

function checkRequired(body, properties) {
	var errors = validator.checkRequired(body, properties);
	if (errors !== null) {
		var errorMessages = errors.map(err => err.message);
		message = `${errorMessages.join(', ')}.`;
		return new Error(message);
	}
	return null;
}

exports.sanitizeRequestData = function (reqBody) {
	const { rule, data } = reqBody;
	var error = checkRequired(reqBody, ['rule', 'data']);
	if (error) {
		return error;
	}
	if (!validator.isObject(rule)) {
		return new Error('rule should be an object.');
	}
	error = checkRequired(rule, ['field', 'condition', 'condition_value']);
	if (error) {
		return error;
	}
	if (!validator.isString(rule.field)) {
		return new Error('field should be an string.');
	}

	error = validator.validateCondition(rule.condition);
	if (error) {
		return error;
	}

	if (
		!(
			validator.isArray(data) ||
			validator.isString(data) ||
			validator.isObject(data)
		)
	) {
		return new Error('data should be of type string, array or object.');
	}

	if (!validator.isRulePresentInData(rule.field, data)) {
		return new Error(`field ${rule.field} is missing from data.`);
	}
};

exports.isValid = function (rule, data) {
	const { field, condition, condition_value: value } = rule;
	var result = false;
	switch (condition) {
		case 'eq':
			result = data[field] === value;
			break;
		case 'neq':
			result = data[field] !== value;
			break;
		case 'gt':
			result = data[field] > value;
			break;
		case 'gte':
			result = data[field] >= value;
			break;
		case 'contains':
			if (Array.isArray(data) || typeof data === 'string') {
				var i = data.indexOf(field);
				if (~i) {
					result = data[i].includes(value);
				}
			} else {
				result = false;
			}
			break;
	}
	return result;
};
