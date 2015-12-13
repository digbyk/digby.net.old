var winston = require('winston');
var express = require('express');
var router = express.Router();

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
	res.render('index', {});
});

router.get('/page/:pageId', function (req, res) {
	client.entry(req.params.id)
		.then(function (entry) {
			console.log(entry);
			res.render('index', { md: md, entry: entry });
		});
});

module.exports = router;