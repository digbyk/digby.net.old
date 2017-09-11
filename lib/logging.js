var winston = require('winston');

winston.level = process.env.LOG_LEVEL;
winston.json = true;
winston.prettyPrint = true;

winston.log('info', 'Starting Winston logging');

module.exports = winston;