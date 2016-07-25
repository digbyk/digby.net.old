var logger = require('../lib/logging.js');

var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

var RestClient = require('node-rest-client').Client;
var restClient = new RestClient();
var moment = require('moment');

var contentful = require('contentful');
var md = require('markdown-it')({
	html: true,
	linkify: true,
	typographer: false
});

var client = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE,
	accessToken: process.env.CONTENTFUL_TOKEN,
	secure: true,
	host: process.env.CONTENTFUL_HOST,
	resolveLinks: true
});

router.get('/', function (req, res) {
	res.render('index');
});

router.get('/login', function (req, res) {
	res.render('login', {
		redirectTo: req.session.redirectTo
	});
});

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/profile', ensureLoggedIn, function (req, res) {
	res.render('profile', { user: req.user });
});

router.get('/page/:pageId', function (req, res) {
	client.getEntries({
		'content_type': 'Oblrgt64W4OQuYWiSkkmy',
		'fields.path': req.params.pageId
	}).then(function (entries) {
		res.render('page', { title: entries[0].fields.title, md: md, entry: entries[0] });
	}).catch(function (err) {
		logger.error(err);
		res.render('page', { md: md, entry: null });
	});
});

router.get('/blog', function (req, res) {
	restClient.get('https://public-api.wordpress.com/rest/v1.1/sites/thejoyoftechs.wordpress.com/posts/', function (data, response) {
		res.render('blog/index', { title: 'blog', moment: moment, blog: data });
	});
});

router.get('/blog/:id/:slug', function (req, res) {
	restClient.get('https://public-api.wordpress.com/rest/v1.1/sites/thejoyoftechs.wordpress.com/posts/' + req.params.id, function (data, response) {
		res.render('blog/entry', { title: data.title, moment: moment, entry: data });
	});
});

module.exports = router;