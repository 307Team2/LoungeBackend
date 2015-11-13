var Event = require('../models/event.js');
var moment = require('moment');
var _ = require('underscore');

var eventServices = {};

eventServices.createEvent = function(eventData, tier, cb) {
    var newEvent = eventData;
    newEvent.tier = tier
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

eventServices.findAllEventsInTier = function(givenTier, cb) {
    Event.find({tier: givenTier}).exec(function(err, events) {
        cb(err, events);
    });
};

eventServices.findAllEvents = function(cb) {
    Event.find({}).exec(function(err, events) {
        cb(err, events);
    });
};

eventServices.updateEventRsvp = function(eventId, userId, rsvpStatus, cb) {

    Event.findById(eventId, function(err, event) {
        // remove user's current rsvp if it exists
        event.rsvps = _.reject(event.rsvps, function(rsvp) { return rsvp.userId === userId; });

        // add new rsvp status for user
        event.rsvps.push({userId: userId, status: rsvpStatus});

        event.save(cb);
    });
};

module.exports = eventServices;
