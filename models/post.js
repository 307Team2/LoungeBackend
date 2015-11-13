var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    authorId: String,
    content: String,
    createdAt: Date,
    tier: String
});

module.exports = mongoose.model('Post', postSchema);
