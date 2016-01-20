var logger = require('../lib/logging.js');

var express = require('express');
var router = express.Router();

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
	client.entries({
		'content_type': 'Oblrgt64W4OQuYWiSkkmy',
		'fields.path': 'index'
	}).then(function (entries) {
		res.render('index', { md: md, entry: entries[0] });
	}).catch(function (err) {
		logger.error(err);
		res.render('index', { md: md, entry: null });
	})
});

router.get('/login', function (req, res) {
	res.render('login', {title: 'login'});
});

router.get('/page/:pageId', function (req, res) {
	client.entries({
		'content_type': 'Oblrgt64W4OQuYWiSkkmy',
		'fields.path': req.params.pageId
	}).then(function (entries) {
		res.render('page', { title: entries[0].fields.title, md: md, entry: entries[0] });
	}).catch(function (err) {
		logger.error(err);
		res.render('page', { md: md, entry: null });
	})
});

router.get('/blog', function (req, res) {
	restClient.get("https://public-api.wordpress.com/rest/v1.1/sites/thejoyoftechs.wordpress.com/posts/", function (data, response) {
		res.render('blog/index', { title: 'blog', moment: moment, blog: data });
	});
});

router.get('/blog/:id/:slug', function (req, res) {
	restClient.get("https://public-api.wordpress.com/rest/v1.1/sites/thejoyoftechs.wordpress.com/posts/" + req.params.id, function (data, response) {
		res.render('blog/entry', { title: data.title, moment: moment, entry: data });
	});
});

module.exports = router;