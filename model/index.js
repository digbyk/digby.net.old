var url = process.env.MONGO_URL;

var mongoose = require('mongoose');

mongoose.connect(url, {
	server: {
		auto_reconnect: true
	}
});

mongoose.connection.on('connected', function () {
	console.info('Mongoose connected');
});

mongoose.connection.on('error', function (err) {
	console.info('Mongoose connection error: ' + err);
	mongoose.connect(url, {
		server: {
			auto_reconnect: true
		}
	});
});

mongoose.connection.on('disconnected', function () {
	console.info('Mongoose disconnected');
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.info('Mongoose disconnected through app termination');
		process.exit(0);
	});
});
