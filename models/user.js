var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	name: String,
	tier: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
