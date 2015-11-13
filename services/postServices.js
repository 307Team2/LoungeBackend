var Post = require('../models/post.js');
var moment = require('moment');

var postServices = {};

postServices.createPost = function(newPost, cb) {
	newPost.createdAt = moment().toDate();
	Post.create(newPost, function(err, post) {
		cb(err, post);
	});
};

postServices.findAllPosts = function(cb) {
	Post.find().exec(function(err, posts) {
		cb(err, posts);
	});
};    