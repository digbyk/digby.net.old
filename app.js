var newrelic = require('newrelic');
require('dotenv').load();

var winston = require('winston');
require('winston-loggly');
winston.add(winston.transports.Loggly, {
  token: "14d0eea3-dbce-4040-acd3-9e1ec59e500c",
  subdomain: "digbyk",
  tags: ["digbynet"],
  json: true
});

var express = require('express');
var app = express();

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({ url: process.env.REDIS_URL }),
  secret: 'scrt',
  resave: true,
  saveUninitialized: true
}));

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function () {
  winston.log("Node app is running at localhost:" + app.get('port'))
});