var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('events/event_item', {
    event: {
      name: 'BoilerMake',
      description: 'The best hackathon in the world!!!',
      date: new Date()
    },
    title: 'Lounge'
  });
});

module.exports = router;
