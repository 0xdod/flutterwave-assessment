const expect = require('expect');
const { getMyData, validateRule } = require('.');

var res = {
	statusCode: 200,
	json: obj => obj,
	status: function (c) {
		this.statusCode = c;
		return this;
	},
};
var req = {};

var myData = {
	message: 'My Rule-Validation API',
	status: 'success',
	data: {
		name: 'Damilola Dolor',
		github: '@0xdod',
		email: 'dolordamilola@gmail.com',
		mobile: '08156579791',
	},
};

describe('GET / controller', () => {
	it('should return my data in', () => {
		var response = getMyData(req, res);
		expect(response).toEqual(myData);
	});
});

describe('POST /validate-rule controller', () => {
	req.body = {
		rule: {
			field: 'missions',
			condition: 'gte',
			condition_value: 30,
		},
		data: {
			name: 'James Holden',
			crew: 'Rocinate',
			age: 34,
			position: 'Captain',
			missions: 45,
		},
	};

	it('should return success response', () => {
		var fakeResponse = {
			message: 'field missions successfully validated.',
			status: 'success',
			data: {
				validation: {
					error: false,
					field: 'missions',
					field_value: 45,
					condition: 'gte',
					condition_value: 30,
				},
			},
		};
		var response = validateRule(req, res);
		expect(response).toEqual(fakeResponse);
	});

	it('should return status code of 200 on success', () => {
		var response = validateRule(req, res);
		expect(res.statusCode).toBe(200);
	});
	it('should return status code of 400 on error', () => {
		req.body.rule.field = null;
		validateRule(req, res);
		expect(res.statusCode).toBe(400);
	});
	it('should return missing field error', () => {
		req.body = {
			rule: {
				field: '5',
				condition: 'contains',
				condition_value: 'rocinante',
			},
			data: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho'],
		};
		var fakeResponse = {
			message: 'field 5 is missing from data.',
			status: 'error',
			data: null,
		};
		var response = validateRule(req, res);
		expect(response).toEqual(fakeResponse);
	});
	it('should return validation failed response', () => {
		req.body = {
			rule: {
				field: '0',
				condition: 'eq',
				condition_value: 'a',
			},
			data: 'damien-marley',
		};
		var fakeResponse = {
			message: 'field 0 failed validation.',
			status: 'error',
			data: {
				validation: {
					error: true,
					field: '0',
					field_value: 'd',
					condition: 'eq',
					condition_value: 'a',
				},
			},
		};
		var response = validateRule(req, res);
		expect(response).toEqual(fakeResponse);
	});
});
