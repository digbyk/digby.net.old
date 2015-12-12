var express = require('express');
var router = express.Router();
//var redis = require("redis");
//var client = redis.createClient();
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
	res.render('test', { user: req.user });
});

router.get('/error/:code', function (req, res) {
	res.status(req.params.code).send('Something broke!');
});

router.get('/exception', function (req, res) {
	throw new Error("This is an error");
});

router.get('/content', function (req, res) {
	client.entries({
		'content_type': 'Page',
		'fields.path[match]': 'Index'
	}).then(function (entries) {
		console.log(entries.total);
		res.render('test', { md: md, entry: entries[0] });
	}).catch(function (err) {
		console.error(err);
		res.render('test', { md: md, entry: null });
	})
});

router.get('/content/:id', function (req, res) {
	client.entry(req.params.id)
		.then(function (entry) {
			console.log(entry);
			res.render('test', { md: md, entry: entry });
		});

});

module.exports = router;