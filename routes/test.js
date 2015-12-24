var express = require('express');
var router = express.Router();
//var redis = require("redis");
//var client = redis.createClient();

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

router.use(function (req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		//req.flash('error', 'You must be logged in to do that.')
		res.redirect('/auth/google');
	}
});

router.use(function (req, res, next) {
	var user = req.user;
	if (typeof user.customerId === 'undefined') {
		console.log('Creating customer');
		stripe.customers.create({ email: user.email })
			.then(function (customer) {
				console.log(customer.id);
				user.customerId = customer.id;
				return User.findOneAndUpdate(
					{ email: user.email },
					{ customerId: customer.id },
					{ upsert: true, 'new': true }
					);
			}).then(function (user) {
				console.log(user.displayName);
				console.log(user.email);
				console.log(user.customerId);
				next();
			}).catch(function (err) {
				console.log(err);
				next();
			});
	} else {
		next();
	}
});

router.get('/', function (req, res) {
	res.render('test/test');
});

router.get('/error/:code', function (req, res) {
	res.status(req.params.code).send('Something broke!');
});

router.get('/exception', function (req, res) {
	throw new Error("This is an error");
});

router.get('/content', function (req, res) {
	client.entries({
		'content_type': 'Oblrgt64W4OQuYWiSkkmy',
		'fields.path': 'index'
	}).then(function (entries) {
		console.log(entries.total);
		res.render('test/test', { md: md, entry: entries[0] });
	}).catch(function (err) {
		console.error(err);
		res.render('test/test', { md: md, entry: null });
	})
});

router.get('/content/:id', function (req, res) {
	client.entry(req.params.id)
		.then(function (entry) {
			console.log(entry);
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
		console.log(err);
		res.status(500);
	});

});

router.get('/okta', function (req, res) {
	res.render('test/okta', {});
});

module.exports = router;