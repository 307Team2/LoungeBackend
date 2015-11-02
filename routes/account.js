var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = function(app) {

    /* GET sign up. */
    app.get('/account/login', function(req, res, next) {
        res.render('account/login');
    });

    app.post('/account/login', passport.authenticate('local'), function(req, res, next) {
        
        var token = jwt.sign(req.user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        res.json({
            user: req.user,
            token: token
        });
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
                res.json({
                    error: err
                });
            } else {
                passport.authenticate('local')(req, res, function() {
                    var token = jwt.sign(req.user, app.get('superSecret'), {
                      expiresInMinutes: 1440 // expires in 24 hours
                    });
                    res.json({
                        user: req.user,
                        token: token
                    });
                });
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
        // var sendgrid_api_key = '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';
        // var sendgrid  = require('sendgrid')(sendgrid_api_key);
        // var payload = {
        //         to      : req.user.username,
        //         from    : 'team@lounge-herokuapp.com',
        //         subject : 'Password Reset',
        //         text    : 'A password reset has been initiated for your account'
        // };
        // sendgrid.send(payload, function(err, json) {
        //         if (err) { console.error(err); }
        //         console.log(json);
        // });
    });

    app.post('/account/reset_email_sent', function(req, res, next) {
      console.log(req.body);
      res.render('account/reset_email_sent');
      var sendgrid_api_key = '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';
      var sendgrid  = require('sendgrid')(sendgrid_api_key);
      var payload = {
              to      : req.body.email,
              from    : 'team@lounge-herokuapp.com',
              subject : 'Password Reset',
              text    : 'A password reset has been initiated for your account. Go to http://localhost:3000/account/password_reset to reset your password!'
      };
      sendgrid.send(payload, function(err, json) {
              if (err) { console.error(err); }
              console.log(json);
      });
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

    app.get('/account/password_reset', function(req, res, next) {
        res.render('account/reset_password');
    });
};
