var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var logger = require('../lib/logging.js');

var strategy = new Auth0Strategy({
	domain: process.env.AUTH0_DOMAIN,
	clientID: process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	callbackURL: process.env.AUTH0_CALLBACK_URL
}, (accessToken, refreshToken, extraParams, profile, done) => {
	process.nextTick(function () {
		logger.debug(profile._json);
		return done(null, profile._json);
	});
});

passport.use(strategy);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

module.exports = strategy;