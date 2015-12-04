var newrelic = require('newrelic');
require('dotenv').load();

var path = require('path');
var express = require('express');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();

app.use(session({
	store: new RedisStore({ url: process.env.REDIS_URL }),
	secret: 'scrt',
	resave: true,
	saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var routes = require('./routes');
app.use('/', routes);

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function () {
	console.log('Node app is running at localhost:' + app.get('port'))
});