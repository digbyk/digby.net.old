'use strict';

var newrelic = require('newrelic');
require('dotenv').load({ silent: true });

var db = require('./model');

var path = require('path');
var express = require('express');
var helmet = require('helmet');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();
app.locals.newrelic = newrelic;

app.use(helmet());

app.use(session({
	store: new RedisStore({ url: process.env.REDIS_URL }),
	secret: 'scrt',
	resave: true,
	saveUninitialized: true
}));

var passport = require('./passport.js');
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function (req, res, next) {
	if (req.user) {
		res.locals.user = req.user;
	}
	next();
})

var routes = require('./routes');
app.use('/auth', require('./routes/auth'));
app.use('/', routes);
app.use('/test', require('./routes/test'));

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function () {
	console.log('Node app is running at localhost:' + app.get('port'))
});