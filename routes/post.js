var jwt = require('jsonwebtoken');
var async = require('async');
var Post = require('../models/post.js');
var User = require('../models/user.js');
var postServices = require('../services/postServices');

module.exports = function(app) {

    // Expects form data in the form of:
    // {
    //   authorId: String,
    //   content: String
    // }
    app.post('/posts/create', function(req, res, next) {

        var auth_token = req.get('Authorization');

        jwt.verify(auth_token, app.get('superSecret'), function(error, user) {
        
            if (error) {
        
                res.status(500).send(error);
        
            } else if (user) {
        
                req.body.authorId = user._id;
                postServices.createPost(req.body, function(err, post) {
                    if (err) {
                        console.log(err);

                        // TODO: Render template here w/ error message
                        res.sendStatus(500);
                    } else {
                        console.log('New post created: ' + post);

                        // TODO: Render template here
                        res.sendStatus(201);
                    }
                });
        
            }
        
        });

    });

    app.get('/posts/all?', function(req, res, next) {

        var limit = req.query.limit;
        var lastTimestamp = req.query.lastTimestamp;

        // might want to limit posts to certain time period
        postServices.findAllPosts(limit, lastTimestamp, function(err, posts) {
            if (err) {
                res.status(500).send(err);
            }

            var expandPost = function(post, cb) {
                User.findById(post.authorId, function(error, author) {
                    var newPost = post.toObject();
                    if (author) {
                        newPost.displayName = author.firstName + " " + author.lastName;
                    } else {
                        newPost.displayName = "Anonymous"
                    }
                    cb(null, newPost);
                });
            }

            async.map(posts, expandPost, function(error, expandedPosts) {
                res.json({
                    posts: expandedPosts
                });
            });

        });
    });
};
