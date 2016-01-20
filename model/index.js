var url = process.env.MONGO_URL;

var winston = require('../lib/logging.js');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(url, {
    server: {
        auto_reconnect: true
    }
});

mongoose.connection.on('connected', function () {
    winston.log('info', 'Mongoose connected');
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
