var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: String,
    description: String,
    startDate: Date,
    tier: String,
    going: Array,
    maybe: Array,
    ignore: Array
});

module.exports = mongoose.model('Event', eventSchema);
