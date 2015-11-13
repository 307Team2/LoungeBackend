var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var accountServices = require('../services/accountServices');

module.exports = function(app) {

    /* GET sign up. */
    app.get('/account/login', function(req, res, next) {
        res.render('account/login');
    });

    app.post('/account/login', passport.authenticate('local'), function(req, res, next) {
        var token = jwt.sign(req.user._id, app.get('superSecret'), {
          expiresIn: 86400 // expires in 24 hours
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

        accountServices.createUser(req.body, function(err, user) {
            if (err) {
                console.log(err);
                res.json({
                    error: err
                });
            } else {
                var token = jwt.sign(req.user._id, app.get('superSecret'), {
                  expiresIn: 86400 // expires in 24 hours
                });
                res.json({
                    user: user,
                    token: token
                });
            }
        });
    });

    app.get('/account/data', function(req, res, next) {
        var auth_token = req.get('Authorization');
        jwt.verify(auth_token, app.get('superSecret'), function(error, userId) {
            User.findById(userId, function(error, user) {
                if (error) {
                    res.status(500).send(error);
                } else if (user) {
                    res.json({
                        user: user
                    });
                }
            });
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

        var updatedData = req.body;
        delete updatedData.id;

        accountServices.updateUser(req.user.id, updatedData, function(err, user) {
            if (err) {
                console.log('Error updating user: ' + user);
            }

            res.redirect('/account/update');
        });
    });

    app.post('/account/updateMembership', function(req, res, next) {        
        var auth_token = req.get('Authorization');
        jwt.verify(auth_token, app.get('superSecret'), function(error, userId) {
            accountServices.updateUser(userId, req.body, function(err, user) {
                if (err) {
                    console.log('Error updating tier for user: ' + user);
                }
                res.sendStatus(200);
            });
        });
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
        accountServices.findUser(req.params.userId, function(err, user) {
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
