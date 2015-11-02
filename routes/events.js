var Event = require('../models/event.js');
var moment = require('moment');
var eventServices = require('../services/eventServices.js');

module.exports = function(app) {

    // Route for creating events
    app.post('/events/create', function(req, res, next) {

        eventServices.createEvent(req.body, function(err, event) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log('New event created: ' + event);
                res.sendStatus(201);
            }
        });
    });

    // Route for retrieving data of single event
    app.get('/events/:id', function(req, res, next) {
        eventServices.findOneEvent(req.params.id, function(err, event) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log('Event found: ' + event);
                // TODO: Render template pls
                res.render('events/event_item', {event: event});
            }
        });
    });

    // Route for retrieving data of all events
    app.get('/events', function(req, res, next) {

        eventServices.findAllEvents(function(err, events) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                // not logging here since data might be massive

                // TODO: Render template pls
                res.render('events/event_feed', {events: events});
            }
        });
    });
};
