var Event = require('../models/event.js');
var moment = require('moment');

var eventServices = {};

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

eventServices.createEvent = function(eventData, tier, cb) {
    var newEvent = eventData;
    newEvent.tier = tier
    newEvent.startDate = moment(newEvent.startDate).toDate();
    newEvent.going = [];
    newEvent.maybe = [];
    newEvent.ignore = [];
    Event.create(newEvent, function(err, event) {
        cb(err, event);
    });
};

eventServices.rsvpToEvent = function(eventId, rsvp, userId, cb) {
    eventServices.findOneEvent(eventId, function(error, eventObject) {
        if (error) cb(error, null);

        var newGoing = eventObject.going;
        var newMaybe = eventObject.maybe;
        var newIgnore = eventObject.ignore;

        if (rsvp === "going") {
            if (newGoing.indexOf(userId) < 0) {
                newGoing.push(userId);
                newMaybe.remove(userId);
                newIgnore.remove(userId);
            }
        } else if (rsvp === "maybe") {
            if (newMaybe.indexOf(userId) < 0) {
                newGoing.remove(userId);
                newMaybe.push(userId);
                newIgnore.remove(userId);
            }
        } else if (rsvp === "ignore") {
            if (newIgnore.indexOf(userId) < 0) {
                newGoing.remove(userId);
                newMaybe.remove(userId);
                newIgnore.push(userId);
            }
        }

        Event.where({_id: eventId}).update({ going: newGoing, maybe: newMaybe, ignore: newIgnore }, function(updateErr, updatedEvent) {
            cb(updateErr, updatedEvent)
        });
    });
};

eventServices.findOneEvent = function(eventId, cb) {
    Event.findOne({_id: eventId}).exec(function(err, evnt) {
        cb(err, evnt);
    });
};

eventServices.findAllEventsInTier = function(givenTier, cb) {
    switch (givenTier) {
        case 'Bronze':
            Event.find({tier: givenTier}).sort({ startDate: 1 }).exec(function(err, events) {
                cb(err, events);
            });
            break;
        case 'Silver':
            Event.find({tier: {$ne: 'Gold'}}).sort({ startDate: 1 }).exec(function(err, events) {
                cb(err, events);
            });
            break;
        case 'Gold':
            Event.find({}).sort({ startDate: 1 }).exec(function(err, events) {
                cb(err, events);
            });
            break;
    };
};

eventServices.findAllEvents = function(cb) {
    Event.find({}).sort({ startDate: 1 }).exec(function(err, events) {
        cb(err, events);
    });
};

module.exports = eventServices;
