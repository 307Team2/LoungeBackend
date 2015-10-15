var express = require('express');
var router = express.Router();

/* GET profile page. */
router.get('/', function(req, res, next) {
  res.render('profile');
});

/* GET edit profile page. */
router.get('/edit', function(req, res, next) {
  res.render('edit-profile');
});

module.exports = router;
