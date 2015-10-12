var express = require('express');
var router = express.Router();

/* GET reset email sent page. */
router.get('/', function(req, res, next) {
  res.render('reset-email-sent');
});

module.exports = router;
