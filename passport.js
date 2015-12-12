var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('./model/user.js');

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
	prompt: 'none',
	accessType: 'online',
	approvalPrompt: 'auto'
},
	function (accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ email: profile.emails[0].value }, function (err, user) {
				if (err) { return done(err); }
				if (!user) {
					var user2 = new User({
						email: profile.emails[0].value, displayName: profile.displayName
					});
					user2.save(function (err) {
						if (err) {
							console.error(err);
							return done(err);
						}
						return done(null, user2);
					});
				} else {
					user.lastLoggedIn = new Date();
					user.save(function (err) {
						if (err) {
							console.error(err);
							return done(err);
						}
						return done(null, user);
					});

				}
			});
		});
	}
	));

module.exports = passport;