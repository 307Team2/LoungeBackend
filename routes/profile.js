var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

module.exports = function(app) {
  
  /* GET profile page. */
  app.get('/profile/:id', function(req, res, next) {
 
    User.findById(req.params.id, function(error, user) {
      Post.find({authorId: req.params.id}).sort({createdAt: -1}).exec(function(error, posts) {
        res.json({
          user: user,
          posts: posts
        });
      });
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
