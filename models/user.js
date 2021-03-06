var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    location: String,
    organization: String,
    jobTitle: String,
    tier: String,
    photoUrl: String,
    stripeId: String,
    subscriptionId: String,
    isAdmin: Boolean
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
