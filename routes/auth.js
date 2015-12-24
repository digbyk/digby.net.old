var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function (req, res) {
	res.render('login', { user: req.user });
});

router.get('/google',
	passport.authenticate('google', {
		//accessType: 'offline',
		scope: ['https://www.googleapis.com/auth/plus.profile.emails.read', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/drive.photos.readonly']
	}),
	function (req, res) {
	});

router.get('/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	function (req, res) {
		res.redirect('/');
	});

router.get('/saml',
	passport.authenticate('saml', {
	}),
	function (req, res) {
		res.redirect('/');
	});

router.post('/saml/callback',
	passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
	function (req, res) {
		console.log('kajsdkljas');
		res.redirect('/');
	});

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;