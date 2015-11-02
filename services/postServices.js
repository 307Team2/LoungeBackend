var Post = require('../models/post.js');
var moment = require('moment');

var postServices = {};

postServices.createPost = function(postData, cb) {
	var newPost = postData;
	newPost.createdAt = moment().toDate();
	Post.create(newPost, function(err, post) {
		cb(err, post);
	});
};

postServices.findPost = function(cb) {
	Post.find().exec(function(err, posts) {
		cb(err, posts);
	});
};    
