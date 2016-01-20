var winston = require('winston');
require('winston-loggly');

winston.level = 'silly';

winston.add(winston.transports.Loggly, {
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    tags: ["testing"],
    json: true,
    level: process.env.LOGGLY_LEVEL
});

winston.log('info', 'Starting Winston logging');

module.exports = winston;