var winston = require('winston');
require('winston-loggly');

winston.level = process.env.LOG_LEVEL;
winston.json = true;
winston.prettyPrint = true;

winston.add(winston.transports.Loggly, {
	token: process.env.LOGGLY_TOKEN,
	subdomain: process.env.LOGGLY_SUBDOMAIN,
	tags: ['digbynet', process.env.NODE_ENV],
	json: true,
	prettyPrint: true,
	level: process.env.LOGGLY_LOG_LEVEL
});

winston.log('info', 'Starting Winston logging');

module.exports = winston;