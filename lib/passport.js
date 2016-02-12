var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../model/user.js');

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

passport.use('google', new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_ID,
		callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
		prompt: 'none',
		accessType: 'online',
		approvalPrompt: 'auto'
	},
	function (accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOneAndUpdate(
				{ email: profile.emails[0].value },
				{
					email: profile.emails[0].value,
					displayName: profile.displayName,
					photoUrl: profile.photos[0].value,
					accessToken: accessToken,
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
	}
	));

module.exports = passport;