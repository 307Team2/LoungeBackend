var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rsvpSchema = new Schema({
    userId: String,
    status: String
});

var eventSchema = new Schema({
    title: String,
    description: String,
    startDate: Date,
    tier: String,
    rsvps: [rsvpSchema]
});

module.exports = mongoose.model('Event', eventSchema);
