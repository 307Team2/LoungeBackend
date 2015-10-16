var Post = require('../models/event.js');
var moment = require('moment');

module.exports = function(app) {

    // Expects form data in the form of:
    // {
    //   authorId: String,
    //   content: String
    // }
    app.post('/posts/create', function(req, res, next) {

        var newPost = req.body;

        // add createdAt property
        newPost.createdAt = moment().toDate();

        Post.create(newPost, function(err, event) {
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
};
