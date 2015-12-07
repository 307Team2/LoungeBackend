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
        jwt.verify(auth_token, app.get('superSecret'), function(error, userId) {
            User.findById(userId, function(error, user) {
                if (error) {
                    res.status(500).send(error);
                } else if (user) {
                    req.body.authorId = user._id;
                    postServices.createPost(req.body, user.tier, function(err, post) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            User.findById(post.authorId, function(error, author) {
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
                console.log(err);
                res.sendStatus(500);
            } else {
                User.findById(userId, function(error, user) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(500);
                    }
                    postServices.findAllPosts(user.tier, limit, lastTimestamp, function(err, posts) {
                        if (err) {
                            res.status(500).send(err);
                            return;
                        }

                        var expandPost = function(post, cb) {
                            User.findById(post.authorId, function(error, author) {
                                var newPost = post.toObject();
                                if (author) {
                                    newPost.displayName = author.firstName + " " + author.lastName;
                                } else {
                                    newPost.displayName = "Anonymous";
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

    // expects req.body with shape of {commentContent: String}
    app.post('/posts/:postId/comments', function(req, res) {
        var commentContent = req.body.commentContent;
        var authorId = req.user.id;

        Post.findById(req.params.postId, function(findErr, post) {
            if (findErr) {
                console.log('error finding post', findErr);
                res.sendStatus(500);
                return;
            }

            var newComment = {
                authorId: authorId,
                content: commentContent
            };

            post.comments.push(newComment);
            post.save(function(saveErr) {
                if (saveErr) {
                    console.log('error saving post afer adding comment', saveErr);
                }

                // send back updated post
                res.send(post);
            });
        });
    });

    app.delete('/posts/:postId/comments', function(req, res) {
      var commentId = req.body.commentId;

      Post.findById(req.params.postId, function(findErr, post) {
        if (findErr) {
            console.log('error finding post', findErr);
            res.sendStatus(500);
            return;
        }

        post.comments.id(commentId).remove();
        post.save(function(saveErr) {
            if (saveErr) {
                console.log('error saving post afer adding comment', saveErr);
            }

            // send back updated post
            res.send(post);
        });
      });
    });
};
