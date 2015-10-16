var Event = require('../models/event.js');
var moment = require('moment');

module.exports = function(app) {

    // Route for creating events
    app.post('/events/create', function(req, res, next) {

        var newEvent = req.body;
        console.log(newEvent);
        newEvent.startDate = moment(newEvent.startDate).toDate();

        Event.create(newEvent, function(err, event) {
            // TODO: Consider breaking out this error checking into a function to be shared across routes
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

        var eventId = req.params.id;

        Event.findOne({_id: eventId}).exec(function(err, event) {
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

        Event.find({}).exec(function(err, events) {
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
