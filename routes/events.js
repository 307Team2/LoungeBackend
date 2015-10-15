var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('events/event_feed', { title: 'Lounge' });
});

module.exports = router;
