//var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var logger = require('morgan');

var router = require('./routes');

var app = express();

//app.use(logger('dev'));
app.use((req, res, next) => {
	console.log(
		'[%s] %s %s:%s',
		req.method,
		req.originalUrl,
		req.hostname,
		app.get('port')
	);
	next();
});
app.use(express.json());

app.use(router);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
	//next(createError(404));
	next(new Error('404'));
});

//error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	var response = {};
	console.error(err);
	if (err.type === 'entity.parse.failed') {
		response = {
			message: 'Invalid JSON payload passed.',
			status: 'error',
			data: null,
		};
	}
	res.json(response);
});

module.exports = app;
