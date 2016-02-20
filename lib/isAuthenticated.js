'user strict';

module.exports = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.session.returnTo = req.path;
	res.redirect('/login');
};
