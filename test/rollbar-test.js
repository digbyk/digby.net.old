require('dotenv').load({ silent: true });

var rollbar = require('rollbar');
rollbar.init(process.env.ROLLBAR_KEY);

// record a generic message and send to rollbar
rollbar.reportMessage('Hello world1!');