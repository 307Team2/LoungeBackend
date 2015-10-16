var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: String,
    description: String,
    startDate: Date
});

module.exports = mongoose.model('Event', eventSchema);
