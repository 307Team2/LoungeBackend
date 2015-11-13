var Post = require('../models/post.js');
var moment = require('moment');

var postServices = {};

postServices.createPost = function(newPost, cb) {
	newPost.createdAt = moment().toDate();
	Post.create(newPost, function(err, post) {
		cb(err, post);
	});
};

postServices.findAllPosts = function(limit, lastTimestamp, cb) {
	Post.find({createdAt: {$lt: lastTimestamp}}).sort({createdAt: -1}).limit(limit).exec(function(err, posts) {
		cb(err, posts);
	});
};    

module.exports = postServices;
