var User = require('../models/user');

var accountServices = {};

module.exports = accountServices;

accountServices.createUser = function(userData, cb) {
    var newUser = new User({
        username: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        location: userData.location,
        organization: userData.organization,
        jobTitle: userData.jobTitle
    });

    User.register(newUser, userData.password, function(err, user) {
        cb(err, user);
    });
};

accountServices.updateUser = function(userId, updatedData, cb) {

    // this will just overwrite all of the fields on the user record (all of which should be sent from the front end, otherwise the values will become null)
    User.where({_id: userId}).update(updatedData, function(err, user) {
        cb(err, user);
    });
};

accountServices.findUser = function(userId, cb) {
    User.findOne({_id: userId}, function(err, user) {
        cb(err, user);
    });
};
