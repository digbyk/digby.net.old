var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	email: String,
	displayName: String,
	accessToken: String,
	created: {
		type: Date,
		default: Date.now()
	},
	lastLoggedIn: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
