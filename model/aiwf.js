var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
	name: String,
	type: String,
	created: {
		type: Date,
		default: Date.now()
	},
	members: [String],
	owner: String
}, { collection: 'aiwf_lists' });

var List = mongoose.model('List', listSchema);

var giftSchema = new Schema({
	name: String,
	list: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'List'
	},
	created: {
		type: Date,
		default: Date.now()
	},
	owner: String
}, { collection: 'aiwf_gifts' });

var Gift = mongoose.model('Gift', giftSchema);

module.exports = { List: List, Gift: Gift };
