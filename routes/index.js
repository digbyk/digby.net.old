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
	client.entries({
		'content_type': 'Oblrgt64W4OQuYWiSkkmy',
		'fields.path': 'index'
	}).then(function (entries) {
		res.render('index', { md: md, entry: entries[0] });
	}).catch(function (err) {
		console.error(err);
		res.render('index', { md: md, entry: null });
	})
});

router.get('/page/:pageId', function (req, res) {
	client.entries({
		'content_type': 'Oblrgt64W4OQuYWiSkkmy',
		'fields.path': req.params.pageId
	}).then(function (entries) {
		res.render('page', { md: md, entry: entries[0] });
	}).catch(function (err) {
		console.error(err);
		res.render('page', { md: md, entry: null });
	})
});

module.exports = router;