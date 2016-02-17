'use strict';

var logger = require('../lib/logging.js');
var List = require('../model/aiwf.js').List;
var Gift = require('../model/aiwf.js').Gift;

var express = require('express');
var router = express.Router();

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

router.get('/', ensureLoggedIn, function (req, res) {
	List.find({ members: req.user.email })
		.then(function (lists) {
			res.render('aiwf/index', { lists: lists });
		}
			);
});

router.get('/:listId', ensureLoggedIn, function (req, res) {
	Gift.find({ list: req.params.listId })
		.then(function (gifts) {
			res.render('aiwf/list', { gifts: gifts });
		})
		.catch(function (err) {
			logger.error(err);
		});
});

module.exports = router;