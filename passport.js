var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
      
			// To keep the example simple, the user's Google profile is returned to
			// represent the logged-in user.  In a typical application, you would want
			// to associate the Google account with a user record in your database,
			// and return that user instead.
			return done(null, profile);
		});
	}
));

module.exports = passport;