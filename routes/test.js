var express = require('express');
var router = express.Router();

var logger = require('../lib/logging.js');
var stripe = require('stripe')(process.env.STRIPE_KEY);
var User = require('../model/user.js');

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

router.use(function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
});

router.get('/', function (req, res) {
	res.render('test/test');
});

router.get('/error/:code', function (req, res) {
	logger.error('HTTP error', { code: req.params.code });
	res.status(req.params.code).send('Something broke!');
});

router.get('/exception', function (req, res) {
	logger.error('Exception thrown', {});
	throw new Error('This is an error');
});

router.get('/content', function (req, res) {
	client.entries({
		'content_type': 'Oblrgt64W4OQuYWiSkkmy',
		'fields.path': 'index'
	}).then(function (entries) {
		logger.log(entries.total);
		res.render('test/test', { md: md, entry: entries[0] });
	}).catch(function (err) {
		logger.error(err);
		res.render('test/test', { md: md, entry: null });
	});
});

router.get('/content/:id', function (req, res) {
	client.entry(req.params.id)
		.then(function (entry) {
			logger.log(entry);
			res.render('test/test', { md: md, entry: entry });
		});
});

router.get('/albums', function (req, res) {
	res.render('test/test');
});

router.use('/shop', function (req, res, next) {
	if (!req.user || req.user.roles.indexOf('admin') < 0) {
		res.status(401).send('Not authorised!');
	} else {
		next();
	}
});

router.get('/shop', function (req, res) {
	stripe.products.list().then(function (products) {
		res.render('test/shop', { products: products });
	}).catch(function (err) {
		logger.log(err);
		res.status(500);
	});

});

router.get('/okta', function (req, res) {
	res.render('test/okta', {});
});

module.exports = router;