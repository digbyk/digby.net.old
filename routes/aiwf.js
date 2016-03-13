'use strict';
var _ = require('underscore');

var logger = require('../lib/logging.js');
var List = require('../model/aiwf.js').List;
var Gift = require('../model/aiwf.js').Gift;

var express = require('express');
var router = express.Router();

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

router.get('/', ensureLoggedIn, function(req, res) {
	List.find({ members: req.user.email })
		.then(function(lists) {
			res.render('aiwf/lists', { lists: lists });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.get('/:listId', ensureLoggedIn, function(req, res) {
	Gift.find({ list: req.params.listId, owner: { '$ne': req.user.email } })
		.sort('owner')
		.exec()
		.then(function(gifts) {
			var groupedGifts = _.groupBy(gifts, 'owner');
			res.render('aiwf/list', { gifts: groupedGifts });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.get('/:listId/edit', ensureLoggedIn, function(req, res) {
	Gift.find({ list: req.params.listId })
		.then(function(gifts) {
			res.render('aiwf/list-edit', { gifts: gifts });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.get('/lists/manage', ensureLoggedIn, function(req, res) {
	List.find({ owner: req.user.email })
		.then(function(lists) {
			res.render('aiwf/manage-lists', { lists: lists, owner: req.user.email });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.get('/lists/add', ensureLoggedIn, function(req, res) {
	res.render('aiwf/add-list', { owner: req.user.email });
});

router.post('/lists/add', ensureLoggedIn, function(req, res) {
	var list = new List({name: req.body.name, notes: req.body.notes, members: req.body.members, owner: req.user.email});
	list.save()
	.then(function(list) {
		console.log(list);
		res.redirect('/alliwantfor/lists/manage');
	})
	.catch(function(err) {
		logger.error(err);
	});
});

router.get('/lists/delete/:id', ensureLoggedIn, function(req, res) {
	console.log(req.params.id);
	List.findOneAndRemove({_id: req.params.id, owner: req.user.email})
	.exec()
	.then(function(result) {
		console.log(result);
		res.redirect('/alliwantfor/lists/manage');
	})
	.catch(function(err) {
		logger.error('Eek');
		logger.error(err);
	});
});

router.get('/lists/edit/:id', ensureLoggedIn, function(req, res) {
	if (req.params.id) {
		console.log(req.params.id);
	}
	List.find({ owner: req.user.email })
		.then(function(lists) {
			res.render('aiwf/edit-lists', { lists: lists, owner: req.user.email });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.get('/gifts/manage', ensureLoggedIn, function(req, res) {
	Gift.find({ owner: req.user.email })
		.then(function(gifts) {
			res.render('aiwf/manage-gifts', { gifts: gifts });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

module.exports = router;