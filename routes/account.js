var passport = require('passport');
var User = require('../models/user');

module.exports = function(app) {

    /* GET sign up. */
    app.get('/account/login', function(req, res, next) {
        res.render('account/login');
    });

    app.post('/account/login', passport.authenticate('local'), function(req, res, next) {

        if (typeof req.user.tier === 'undefined') {

            redirect('/account/updateMembership');
        } else {

            // NOTE need to redirect, then re-render so that we can lookup post data + render it into the template
            // ... -> can't redirect with template data
            res.redirect('posts/all');
        }
    });

    /* GET sign up. */
    app.get('/account/signup', function(req, res, next) {
        res.render('account/signup');
    });

    app.post('/account/signup', function(req, res, next) {
        var newUser = new User({username: req.body.email, name: req.body.name});

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
            res.send('Sorry, users only.');
        }
    });

    app.get('/account/updateMembership', function(req, res, next) {

        // FIXME: This needs to render a template that shows the user's current membership tier + has a Stripe payment button for adding/updating membership
        res.send('Update me!');
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
};
