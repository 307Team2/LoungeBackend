var assert = require('assert');
var postServices = require('../services/postServices.js');

describe('postServices', function() {
	describe('#createPost', function() {
		it('Should not return an error when invoked', function() {
			var postData = {
				authorID: 'Test User',
				content: 'This is a test post',
				createdAt: new Date(2015, 11, 11)
			}
			postServices.createPost(postData, function(err, post) {
				assert.equal(err, 0);
			});
		});
	});
	describe('#findAllPosts', function() {
		it('Should not return an error when invoked', function() {
			postServices.findAllPosts(function(err, posts) {
				assert.equal(err, 0);
			});
		});
	});
});

