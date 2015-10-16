var express = require('express');
var router = express.Router();

module.exports = function(app) {
  
  /* GET profile page. */
  app.get('/profile/', function(req, res, next) {
    res.render('profile', {
      user: {
        firstname: "Miranda",
        lastname: "Mott",
        age: 21,
        location: "West Lafayette, IN",
        organization: "ITaP",
        title: "Web/Mobile App Intern"
      },
      posts: [
        {
          content: "This is a test post",
          timestamp: Date.now(),
          author: {
            firstname: "Miranda",
            lastname: "Mott"
          }
        },
        {
          content: "WUBBALUBBADUBDUB",
          timestamp: Date.now(),
          author: {
            firstname: "Miranda",
            lastname: "Mott"
          }
        },
        {
          content: "This is another test post",
          timestamp: Date.now(),
          author: {
            firstname: "Miranda",
            lastname: "Mott"
          }
        }
      ]
    });
  });

  /* GET edit profile page. */
  app.get('/profile/edit', function(req, res, next) {
    res.render('edit-profile', {
      user: {
        firstname: "Miranda",
        lastname: "Mott",
        age: 21,
        location: "West Lafayette, IN",
        organization: "ITaP",
        title: "Web/Mobile App Intern"
      },
      posts: [
        {
          content: "This is a test post",
          timestamp: Date.now(),
          author: {
            firstname: "Miranda",
            lastname: "Mott"
          }
        },
        {
          content: "WUBBALUBBADUBDUB",
          timestamp: Date.now(),
          author: {
            firstname: "Miranda",
            lastname: "Mott"
          }
        },
        {
          content: "This is another test post",
          timestamp: Date.now(),
          author: {
            firstname: "Miranda",
            lastname: "Mott"
          }
        }
      ]
    });
  });

}
