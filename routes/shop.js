var express = require('express');
var router = express.Router();

var logger = require('../lib/logging.js');
var stripe = require('stripe')(process.env.STRIPE_KEY);

var ManagementClient = require('auth0').ManagementClient;
var auth0 = new ManagementClient({
	token: process.env.AUTH0_TOKEN,
	domain: process.env.AUTH0_DOMAIN
});

router.use(function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		//req.flash('error', 'You must be logged in to do that.')
		//next();
		res.redirect('/');
	}
});

router.use(function checkStripeAccount(req, res, next) {
	logger.debug('Creating customer');
	auth0.users.get({ id: req.user.user_id })
		.then(function (user) {
			if (typeof user.app_metadata.customerId != 'undefined') throw new Error('Customer already exists');
			logger.debug(user.app_metadata);
			return stripe.customers.create({ email: user.email });
		})
		.then(function (customer) {
			logger.debug(customer.id);
			return auth0.users.update({ id: req.user.user_id }, { 'app_metadata': { 'customerId': customer.id } });
		})
		.then(function (user) {
			logger.debug(user.displayName);
			logger.debug(user.email);
			logger.debug(user.customerId);
			next();
		}).catch(function (err) {
			if (err.message != 'Customer already exists') {
				logger.debug(err);
				res.redirect('/');
			}
			next();
		});
});

router.get('/', function (req, res) {
	stripe.products.list().then(function (products) {
		res.render('shop/index', { products: products });
	}).catch(function (err) {
		logger.log(err);
		res.status(500);
	});
});

router.get('/basket', function (req, res) {
	stripe.customers.retrieve(req.user.app_metadata.customerId)
		.then(function (customer) {
			logger.log(customer);
			res.render('shop/basket', { customer: customer });
		}).catch(function (err) {
			logger.log(err);
			res.status(500);
		});
});

router.post('/charge', function (req, res) {
	logger.log(req.user.app_metadata.customerId);
	stripe.charges.create({
		amount: 1000, // amount in cents, again
		currency: 'gbp',
		customer: req.user.app_metadata.customerId,
		//source: req.body.stripeToken,
		description: 'Example charge'
	}).then(function (charge) {
		logger.log(charge);
		res.redirect('/shop/basket');
	}).catch(function (err) {
		logger.log(err);
		res.status(500);
	});
});

router.get('/:productId', function (req, res) {
	stripe.products.retrieve(req.params.productId).then(function (product) {
		res.render('shop/product', { product: product });
	}).catch(function (err) {
		logger.log(err);
		res.status(500);
	});
});

module.exports = router;