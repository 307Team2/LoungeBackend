var passport = require('passport');
var User = require('../models/user');

module.exports = function(app) {

    /* GET sign up. */
    app.get('/account/login', function(req, res, next) {
        res.render('account/login');
    });

    app.post('/account/login', passport.authenticate('local'), function(req, res, next) {

        if (typeof req.user.tier === 'undefined') {

            res.redirect('/account/updateMembership');
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

    app.get('/account/update', function(req, res, next) {
        if (req.user) {

            // FIXME: This template is not rendering the values in the form as it should
            res.render('edit-profile', {user: req.user});
        } else {

            // send unauthorized status code
            res.sendStatus(401);
        }
    });

    // expects form data in the form of the user model
    app.post('/account/update', function(req, res, next) {

        var updatedUser = req.body;
        delete updatedUser.id;
        // this will just overwrite all of the fields on the user record (all of which should be sent from the front end, otherwise the values will become null)
        User.where({_id: req.user.id}).update(updatedUser, function(err, user) {
            res.redirect('/account/update');
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
        console.log(req.user);
        // FIXME: This needs to render a template that shows the user's current membership tier + has a Stripe payment button for adding/updating membership
        res.render('account/update_membership', {user: req.user});
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
        console.log(req.body);
        res.render('account/reset_email_sent');
    });

    app.post('/account/reset_email_sent', function(req, res, next) {
      var async = require('async');
      var crypto = require('crypto');
      async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ name: req.body.username }, function(err, user) {
                if (!user) {
                    console.log("User not found for password reset");
                    return res.redirect('/account/begin_password_reset');
                }
                
                user.resetPasswordToken = token;
                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            res.render('account/reset_email_sent');
            var sendgrid_api_key = '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';
            var sendgrid  = require('sendgrid')(sendgrid_api_key);
            var payload = {
              to      : req.body.email,
              from    : 'team@lounge-herokuapp.com',
              subject : 'Password Reset',
              text    : 'A password reset has been initiated for your account. Go to http://' + req.headers.host + '/account/reset_password/' + token + '\n to reset your password!'
            };
            sendgrid.send(payload, function(err, json) {
              if (err) { console.error(err); }
              console.log(json);
            });
        }
        ], function(err) {
            if (err) return next(err);
            return res.redirect('/account/begin_password_reset');
        });
    });

    /* GET reset password page. */
    app.get('/account/reset_password/:token', function(req, res, next) {
        res.render('account/reset_password');
    });

    app.post('/account/reset_password/:token', function(req, res) {
        User.findOne({ resetPasswordToken: req.params.token}, function(err, user) {
            if (!user) {
                return res.redirect('/account/begin_password_reset');
            }
            console.log(req.body.password);
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
       });
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

    app.get('/account/password_reset', function(req, res, next) {
        res.render('account/reset_password');
    });
};
