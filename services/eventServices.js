var Event = require('../models/event.js');

var eventServices = {};

eventServices.createEvent = function(eventData, cb) {
    var newEvent = eventData;
    console.log(newEvent);
    newEvent.startDate = moment(newEvent.startDate).toDate();
    Event.create(newEvent, function(err, event) {
        cb(err, event);
    });
};

eventServices.findOneEvent = function(eventData, cb) {
    var eventId = eventData.id;
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