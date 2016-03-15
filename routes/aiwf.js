'use strict';
var _ = require('underscore');

var logger = require('../lib/logging.js');
var List = require('../model/aiwf.js').List;
var Gift = require('../model/aiwf.js').Gift;

var express = require('express');
var router = express.Router();

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

router.get('/', ensureLoggedIn, function(req, res) {
	res.render('aiwf/index');
});

router.get('/lists', ensureLoggedIn, function(req, res) {
	List.find({ members: req.user.email }, {}, {sort: 'name'})
		.then(function(lists) {
			res.render('aiwf/lists', { lists: lists });
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
	List.find({ owner: req.user.email }, {}, {sort: 'name'})
		.then(function(lists) {
			res.render('aiwf/manage-lists', { lists: lists, owner: req.user.email });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.get('/lists/add', ensureLoggedIn, function(req, res) {
	res.render('aiwf/edit-list', { owner: req.user.email });
});

router.get('/lists/edit/:id', ensureLoggedIn, function(req, res) {
	List.findOne({ _id: req.params.id, owner: req.user.email })
		.exec()
		.then(function(list) {
			res.render('aiwf/edit-list', { list: list, owner: req.user.email });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.post('/lists/save', ensureLoggedIn, function(req, res) {
	var list = new List({ name: req.body.name, notes: req.body.notes, members: req.body.members, owner: req.user.email });
	if (!req.body.id) {
		list.save()
			.then(function() {
				res.redirect('/alliwantfor/lists/manage');
			})
			.catch(function(err) {
				logger.error(err);
			});
	} else {
		List.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
			.then(function() {
				res.redirect('/alliwantfor/lists/manage');
			})
			.catch(function(err) {
				logger.error(err);
			});
	}
});

router.get('/lists/delete/:id', ensureLoggedIn, function(req, res) {
	List.findOneAndRemove({ _id: req.params.id, owner: req.user.email })
		.exec()
		.then(function() {
			res.redirect('/alliwantfor/lists/manage');
		})
		.catch(function(err) {
			logger.error('Eek');
			logger.error(err);
		});
});

router.get('/lists/:listId', ensureLoggedIn, function(req, res) {
	var groupedGifts;
	var numGifts;
	Gift.find({ list: req.params.listId, owner: { '$ne': req.user.email } })
		.sort('owner')
		.exec()
		.then(function(gifts) {
			groupedGifts = _.groupBy(gifts, 'owner');
			numGifts = gifts.length;
			return List.findOne({ _id: req.params.listId });
		})
		.then(function(list) {			
			res.render('aiwf/list', { list: list, gifts: groupedGifts, user: req.user, numGifts: numGifts });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.get('/gifts/manage', ensureLoggedIn, function(req, res) {
	Gift.find({ owner: req.user.email }, {}, {sort: 'name'})
		.populate('list')
		.then(function(gifts) {
			res.render('aiwf/manage-gifts', { gifts: gifts });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.get('/gifts/add', ensureLoggedIn, function(req, res) {
	List.find({ owner: req.user.email }, {}, {sort: 'name'})
		.then(function(lists) {
			res.render('aiwf/edit-gift', { lists: lists, owner: req.user.email });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.get('/gifts/edit/:id', ensureLoggedIn, function(req, res) {
	var theGift;
	Gift.findOne({ _id: req.params.id, owner: req.user.email })
		.populate('list', 'name', null, { sort: 'name' })
		.exec()
		.then(function(gift) {
			theGift = gift;
			return List.find({ owner: req.user.email });
		})
		.then(function(lists) {
			res.render('aiwf/edit-gift', { gift: theGift, lists: lists, owner: req.user.email });
		})
		.catch(function(err) {
			logger.error(err);
		});
});

router.post('/gifts/save', ensureLoggedIn, function(req, res) {
	var gift = new Gift({ name: req.body.name, url: req.body.url, list: req.body.list, owner: req.user.email });
	if (!req.body.id) {
		gift.save()
			.then(function() {
				res.redirect('/alliwantfor/gifts/manage');
			})
			.catch(function(err) {
				logger.error(err);
			});
	} else {
		Gift.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
			.then(function() {
				res.redirect('/alliwantfor/gifts/manage');
			})
			.catch(function(err) {
				logger.error(err);
			});
	}
});

router.get('/gifts/delete/:id', ensureLoggedIn, function(req, res) {
	Gift.findOneAndRemove({ _id: req.params.id, owner: req.user.email })
		.exec()
		.then(function() {
			res.redirect('/alliwantfor/gifts/manage');
		})
		.catch(function(err) {
			logger.error('Eek');
			logger.error(err);
		});
});

router.get('/gifts/buy/:id', ensureLoggedIn, function(req, res) {
	Gift.findOneAndUpdate({ _id: req.params.id }, {$set: {boughtBy: req.user.email}})
		.populate('list')
		.exec()
		.then(function(gift) {
			res.redirect('/alliwantfor/lists/' + gift.list.id);
		})
		.catch(function(err) {
			logger.error('Eek');
			logger.error(err);
		});
});

router.get('/gifts/replace/:id', ensureLoggedIn, function(req, res) {
	Gift.findOneAndUpdate({ _id: req.params.id }, {$unset: {boughtBy: 1}})
		.populate('list')
		.exec()
		.then(function(gift) {
			res.redirect('/alliwantfor/lists/' + gift.list.id);
		})
		.catch(function(err) {
			logger.error('Eek');
			logger.error(err);
		});
});

module.exports = router;