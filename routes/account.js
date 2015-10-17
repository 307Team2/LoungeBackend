var passport = require('passport');
var User = require('../models/user');

module.exports = function(app) {

    /* GET sign up. */
    app.get('/account/login', function(req, res, next) {
        res.render('account/login');
    });

    app.post('/account/login', passport.authenticate('local'), function(req, res, next) {
        // TODO: Change this redirect
        res.redirect('/account/usersOnly');
    });

    /* GET sign up. */
    app.get('/account/signup', function(req, res, next) {
        res.render('account/signup');
    });

    app.post('/account/signup', function(req, res, next) {
        var newUser = new User({
            username: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            location: req.body.location,
            organization: req.body.organization,
            jobTitle: req.body.jobTitle
        });

        User.register(newUser, req.body.password, function(err, user) {
            if (err) {
                console.log(err);
                res.redirect('/account/signup');
            } else {
                res.redirect('/');
            }
        });
    });

    // Temporary route for testing that authentication works
    app.get('/account/usersOnly', function(req, res, next) {
        if (req.user) {
            res.send('Welcome!');
        } else {
            debugger;
            res.send('Sorry, users only.');
        }
    });

    /* GET begin password reset page. */
    app.get('/account/begin_password_reset', function(req, res, next) {
        res.render('account/begin_password_reset');
    });

    /* GET password reset complete page. */
    app.get('/account/password_reset_complete', function(req, res, next) {
        res.render('account/password_reset_complete');
    });

    /* GET reset email sent page. */
    app.get('/account/reset_email_sent', function(req, res, next) {
        res.render('account/reset_email_sent');
    });

    /* GET reset password page. */
    app.get('/account/reset_password', function(req, res, next) {
        res.render('account/reset_password');
    });

    app.get('/account/profile/:userId', function(req, res, next) {
        User.findOne({_id: req.params.userId}, function(err, user) {
            if (err) {
                console.log('Error finding user: ' + err);
            } else {
                res.render('profile', {user: user});
            }
        });
    });
};
