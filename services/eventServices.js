var Event = require('../models/event.js');
var moment = require('moment');

var eventServices = {};

eventServices.createEvent = function(eventData, cb) {
    var newEvent = eventData;
    console.log(newEvent);
    newEvent.startDate = moment(newEvent.startDate).toDate();
    Event.create(newEvent, function(err, event) {
        cb(err, event);
    });
};

eventServices.findOneEvent = function(eventId, cb) {
    Event.findOne({_id: eventId}).exec(function(err, event) {
        cb(err, event);
    });
};

eventServices.findAllEvents = function(cb) {
    Event.find({}).exec(function(err, events) {
        cb(err, events);
    });
};

module.exports = eventServices;
