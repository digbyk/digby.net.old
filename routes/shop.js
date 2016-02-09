var express = require('express');
var router = express.Router();

var logger = require('../lib/logging.js');
var stripe = require('stripe')(process.env.STRIPE_KEY);

router.use(function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		//req.flash('error', 'You must be logged in to do that.')
		res.redirect('/auth/google');
	}
});

/*router.use(function checkStripeAccount(req, res, next) {
	var user = req.user;
	if (typeof user.customerId === 'undefined') {
		logger.log('Creating customer');
		stripe.customers.create({ email: user.email })
			.then(function (customer) {
				logger.log(customer.id);
				user.customerId = customer.id;
				return User.findOneAndUpdate(
					{ email: user.email },
					{ customerId: customer.id },
					{ upsert: true, 'new': true }
					);
			}).then(function (user) {
				logger.log(user.displayName);
				logger.log(user.email);
				logger.log(user.customerId);
				next();
			}).catch(function (err) {
				logger.log(err);
				next();
			});
	} else {
		next();
	}
});*/

router.get('/', function (req, res) {
	stripe.products.list().then(function (products) {
		res.render('test/shop', { products: products });
	}).catch(function (err) {
		logger.log(err);
		res.status(500);
	});

});

module.exports = router;