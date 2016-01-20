'use strict';

require('dotenv').load({ silent: true });

var newrelic = require('newrelic');

var winston = require('./lib/logging.js');

var path = require('path');
var express = require('express');
var helmet = require('helmet');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var db = require('./model');

var app = express();

app.use(helmet());

app.use(session({
	store: new RedisStore({ url: process.env.REDIS_URL }),
	secret: 'scrt',
	resave: true,
	saveUninitialized: true
}));

var passport = require('./passport');
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('./lib/middleware.js'));

app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));
app.use('/test', require('./routes/test'));
app.use('/status', require('./routes/status'));

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
	winston.log('info', 'Node app is running at localhost:' + app.get('port'))
});