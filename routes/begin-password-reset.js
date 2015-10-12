var express = require('express');
var router = express.Router();

/* GET begin password reset page. */
router.get('/', function(req, res, next) {
  res.render('begin-password-reset');
});

module.exports = router;
