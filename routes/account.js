var express = require('express');
var router = express.Router();

/* GET sign up. */
router.get('/login', function(req, res, next) {
  res.render('account/login');
});

/* GET sign up. */
router.get('/signup', function(req, res, next) {
  res.render('account/signup');
});

/* GET begin password reset page. */
router.get('/begin_password_reset', function(req, res, next) {
  res.render('account/begin-password-reset');
});

/* GET password reset complete page. */
router.get('/password_reset_complete', function(req, res, next) {
  res.render('account/password-reset-complete');
});

/* GET reset email sent page. */
router.get('/reset_email_sent', function(req, res, next) {
  res.render('account/reset-email-sent');
});

/* GET reset password page. */
router.get('/reset_password', function(req, res, next) {
  res.render('account/reset-password');
});

module.exports = router;
