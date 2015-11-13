var Post = require('../models/post.js');
var moment = require('moment');

var postServices = {};

postServices.createPost = function(newPost, tier, cb) {
    newPost.createdAt = moment().toDate();
    newPost.tier = tier;
    Post.create(newPost, function(err, post) {
        cb(err, post);
    });
};

postServices.findAllPostInTier = function(givenTier, cb) {
    Event.find({tier: givenTier}).exec(function(err, posts) {
        cb(err, posts);
    });
};
postServices.findAllPosts = function(cb) {
    Post.find().exec(function(err, posts) {
        cb(err, posts);
    });
};    

module.exports = postServices;
