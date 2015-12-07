var jwt = require('jsonwebtoken');
var async = require('async');
var Post = require('../models/post.js');
var User = require('../models/user.js');
var postServices = require('../services/postServices');

module.exports = function(app) {

    /* Expects form data in the form of:
       {
         authorId: String,
         content: String
       }
	*/
    app.post('/posts/create', function(req, res, next) {
        var auth_token = req.get('Authorization');
        jwt.verify(auth_token, app.get('superSecret'), function(error, userId) {
            User.findById(userId, function(error, user) {
				if (error) {
					console.log('Error finding by ID:', error);
					res.status(500).send(error);
                } else if (user) {
                    req.body.authorId = user._id;
                    postServices.createPost(req.body, user.tier, function(err, post) {
                        if (err) {
                            console.log('Error creating post:', err);
                            res.status(500).send(err);
                        } else {
                            User.findById(post.authorId, function(errorById, author) {
                                var newPost = post.toObject();
                                newPost.displayName = author.firstName + " " + author.lastName;
                                res.json({
                                    post: newPost
                                });
                            });
                        }
                    });
                }
            });
        });
    });

    app.get('/posts/all?', function(req, res, next) {


        var auth_token = req.get('Authorization');
        var limit = req.query.limit;
        var lastTimestamp = req.query.lastTimestamp;
        jwt.verify(auth_token, app.get('superSecret'), function(err, userId) {
            if (err) {
                console.log('Error verifying auth token:', err);
                res.status(401).send(err);
            } else {
                User.findById(userId, function(error, user) {
                    if (error) {
                        console.log('Error finding by ID:', error);
                		res.status(500).send(error);
                    }
                    postServices.findAllPosts(user.tier, limit, lastTimestamp, function(err, posts) {
                        if (err) {
							console.log('Error finding all posts:', err);
							res.status(500).send(err);
                            return;
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
                        };
                        async.map(posts, expandPost, function(error, expandedPosts) {
                            res.json({
                                posts: expandedPosts
                            });
                        });
                    });
                });
            }
        });
    });
};
