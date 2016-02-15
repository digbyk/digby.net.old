'use strict';

require('dotenv').load({ silent: true });
require('./model');
require('./lib/newrelic.js');

var logger = require('./lib/logging.js');

var path = require('path');
var express = require('express');
var helmet = require('helmet');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var i18n = require('i18next');
var i18nextMiddleware = require('i18next-express-middleware');
i18n
  .use(i18nextMiddleware.LanguageDetector)
  .init({});

var passport = require('passport');
var strategy = require('./lib/auth0');

passport.use(strategy);

var app = express();
app.use(cookieParser());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/images/rouleaux.png'));
app.use(helmet());

app.use(session({
	store: new RedisStore({ url: process.env.REDIS_URL }),
	secret: process.env.REDIS_SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('./lib/middleware.js'));

app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));
app.use('/test', require('./routes/test'));
app.use('/shop', require('./routes/shop'));
app.use('/status', require('./routes/status'));

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
	logger.log('info', 'Node app is running at localhost:' + app.get('port'));
});