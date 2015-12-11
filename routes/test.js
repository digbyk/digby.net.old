var express = require('express');
var router = express.Router();
var redis = require("redis");
var client = redis.createClient();

router.get('/', function (req, res) {
	res.render('test', {user: req.user});
});

router.get('/error/:code', function (req, res) {
	res.status(req.params.code).send('Something broke!');
});

router.get('/exception', function (req, res) {
	throw new Error("This is an error")
});

module.exports = router;