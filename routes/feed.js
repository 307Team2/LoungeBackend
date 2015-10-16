var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('feed/index', {
    title: 'Lounge',
    posts: [
      {
        content: "This is a test post",
        timestamp: Date.now(),
        author: {
          firstname: "Ben",
          lastname: "Alderfer"
        }
      },
      {
        content: "WUBBALUBBADUBDUB",
        timestamp: Date.now(),
        author: {
          firstname: "Roy",
          lastname: "Fu"
        }
      },
      {
        content: "This is another test post",
        timestamp: Date.now(),
        author: {
          firstname: "Smevron",
          lastname: "James"
        }
      },
      {
        content: "This is a test post",
        timestamp: Date.now(),
        author: {
          firstname: "Ben",
          lastname: "Alderfer"
        }
      },
      {
        content: "WUBBALUBBADUBDUB",
        timestamp: Date.now(),
        author: {
          firstname: "Roy",
          lastname: "Fu"
        }
      },
      {
        content: "This is another test post",
        timestamp: Date.now(),
        author: {
          firstname: "Smevron",
          lastname: "James"
        }
      },
      {
        content: "This is a test post",
        timestamp: Date.now(),
        author: {
          firstname: "Ben",
          lastname: "Alderfer"
        }
      },
      {
        content: "WUBBALUBBADUBDUB",
        timestamp: Date.now(),
        author: {
          firstname: "Roy",
          lastname: "Fu"
        }
      },
      {
        content: "This is another test post",
        timestamp: Date.now(),
        author: {
          firstname: "Smevron",
          lastname: "James"
        }
      },
      {
        content: "This is a test post",
        timestamp: Date.now(),
        author: {
          firstname: "Ben",
          lastname: "Alderfer"
        }
      },
      {
        content: "WUBBALUBBADUBDUB",
        timestamp: Date.now(),
        author: {
          firstname: "Roy",
          lastname: "Fu"
        }
      },
      {
        content: "This is another test post",
        timestamp: Date.now(),
        author: {
          firstname: "Smevron",
          lastname: "James"
        }
      }
    ]
  });
});

module.exports = router;
