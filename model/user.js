var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	email: String,
	displayName: String,
	picture: String,
	created: {
		type: Date,
		default: Date.now()
	},
	roles: [String],
	lastLoggedIn: Date,
	customerId: String
});

userSchema.methods.hasRole = function(role) {
	return (roles.indexOf(role) > -1);
}

var User = mongoose.model('User', userSchema);

module.exports = User;
