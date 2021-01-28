const { sanitizeRequestData, isValid } = require('../lib/sanitize-data');

exports.getMyData = function (req, res) {
	let data = {
		name: 'Damilola Dolor',
		github: '@0xdod',
		email: 'dolordamilola@gmail.com',
		mobile: '08156579791',
	};
	let message = 'My Rule-Validation API';
	let status = 'success';
	return res.json({ message, status, data });
};

exports.validateRule = (req, res) => {
	const { rule, data } = req.body;
	const error = sanitizeRequestData(req.body);
	if (error) {
		return res.status(400).json({
			message: error.message,
			data: null,
			status: 'error',
		});
	}
	var message, status;
	if (!isValid(rule, data)) {
		message = `field ${rule.field} failed validation.`;
		status = 'error';
		res.status(400);
	} else {
		message = `field ${rule.field} successfully validated.`;
		status = 'success';
	}
	const respData = {
		validation: {
			error: status === 'error',
			field: rule.field,
			field_value: data[rule.field],
			condition: rule.condition,
			condition_value: rule.condition_value,
		},
	};
	return res.json({ message, status, data: respData });
};
