'use strict';

require('dotenv').load({ silent: true });

//var logger = require('../lib/logging.js');
var List = require('../model/aiwf.js').List;
var Gift = require('../model/aiwf.js').Gift;

module.exports = {
	myLists: (email) => {
		return [email];
	}	
};