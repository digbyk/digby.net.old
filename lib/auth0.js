var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var User = require('../model/user.js');

var strategy = new Auth0Strategy({
	domain: process.env.AUTH0_DOMAIN,
	clientID: process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}, function (accessToken, refreshToken, extraParams, profile, done) {
		process.nextTick(function () {
			User.findOneAndUpdate(
				{ email: profile.email },
				{
					email: profile.email,
					displayName: profile.displayName,
					photoUrl: profile.picture,
					lastLoggedIn: new Date()
				},
				{ upsert: true, 'new': true }
				)
				.then(function (user) {
					done(null, user);
				}).catch(function (err) {
					console.error(err);
					done(err);
				});
		});
	console.log(profile);
	return done(null, profile);
});

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

module.exports = strategy;