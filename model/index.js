var url = process.env.MONGO_URL;

var logger = require('../lib/logging.js');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(url, {
	server: {
		auto_reconnect: true
	}
});

mongoose.connection.on('connected', function () {
	logger.log('info', 'Mongoose connected');
});

mongoose.connection.on('error', function (err) {
	logger.info('Mongoose connection error: ' + err);
	mongoose.connect(url, {
		server: {
			auto_reconnect: true
		}
	});
});

mongoose.connection.on('disconnected', function () {
	logger.info('Mongoose disconnected');
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		logger.info('Mongoose disconnected through app termination');
		process.exit(0);
	});
});
