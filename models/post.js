var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    authorId: String,
    content: String
});

var postSchema = new Schema({
    authorId: String,
    content: String,
    createdAt: Date,
    tier: String,
    comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);
