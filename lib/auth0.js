var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var logger = require('../lib/logging.js');

var strategy = new Auth0Strategy({
	domain: process.env.AUTH0_DOMAIN,
	clientID: process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}, function (accessToken, refreshToken, extraParams, profile, done) {
	process.nextTick(function () {
		logger.debug(profile);
		return done(null, profile);
	});
});

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user._json);
});

module.exports = strategy;