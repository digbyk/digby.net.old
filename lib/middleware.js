var env = {
	AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
	AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
	AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

module.exports = function user(req, res, next) {
	if (req.user) {
		res.locals.user = req.user;
	}
	env.AUTH0_CALLBACK_URL = req.protocol+ '://' + req.get('host') + (req.port ? ':' + req.port : '') + '/auth/callback';
	res.locals.env = env;
	
	next();
};