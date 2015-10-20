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
