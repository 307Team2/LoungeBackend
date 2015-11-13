var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: String,
    description: String,
    startDate: Date,
    tier: String
});

module.exports = mongoose.model('Event', eventSchema);
