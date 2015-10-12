var express = require('express');
var router = express.Router();

/* GET password reset complete page. */
router.get('/', function(req, res, next) {
  res.render('password-reset-complete');
});

module.exports = router;
