var Post = require('../models/post.js');
var moment = require('moment');

module.exports = function(app) {

    // Expects form data in the form of:
    // {
    //   authorId: String,
    //   content: String
    // }
    app.post('/posts/create', function(req, res, next) {

        // FIXME: Use req.user once authentication is implemented in order to set authorId

        var newPost = req.body;

        // add createdAt property
        newPost.createdAt = moment().toDate();

        Post.create(newPost, function(err, post) {
            if (err) {
                console.log(err);

                // TODO: Render template here w/ error message
                res.sendStatus(500);
            } else {
                console.log('New post created: ' + event);

                // TODO: Render template here
                res.sendStatus(201);
            }
        });
    });

    app.get('/posts/all', function(req, res, next) {

        // might want to limit posts to certain time period
        Post.find().exec(function(err, posts) {

            var templateData = {
                title: 'Lounge',
                posts: posts
            };

            res.render('feed/index', templateData);
        });
    });
};
