var Event = require('../models/event.js');
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var async = require('async');
var moment = require('moment');
var eventServices = require('../services/eventServices.js');

module.exports = function(app) {

    // Route for creating events
    app.post('/events/create', function(req, res, next) {
        // TODO: Might need to parse this date, not sure
        // validate that start date makes sense
        var startDate = req.body.startDate;
        if (startDate > Date.now()) {
            console.log('invalid startDate (in future)');
            res.status(400).send({error: 'Invalid startDate'});
            return;
        }

        // check for missing fields
        if (!req.body.title || !req.body.description || !req.body.startDate || !req.body.tier) {
            console.log('event to be created is missing fields');
            res.status(400).send({error: 'Event is missing fields'});
            return;
        }

        var auth_token = req.get('Authorization');
        jwt.verify(auth_token, app.get('superSecret'), function(err, userId) {
            if (err) {
                console.log('Error verifying auth token:', err);
                res.status(401).send(err);
            }
            User.findById(userId, function(error, user) {
                if (error) {
                    console.log('Error finding user by ID:', error);
                    res.status(500).send(error);
                }
                eventServices.createEvent(req.body, user.tier, function(createErr, event) {
                    if (createErr) {
                        console.log('Error creating event:', createErr);
                        res.status(500).send(createErr);
                    } else {
                        console.log('New event created: ' + event);
                        res.json({
                            event: event
                        });
                    }
                });
            });
        });
    });

    app.get('/events/all', function(req, res, next) {
        var auth_token = req.get('Authorization');
        jwt.verify(auth_token, app.get('superSecret'), function(err, userId) {
            if (err) {
                console.log('Error verifying auth token:', err);
                res.status(401).send(err);
            }
            User.findById(userId, function(error, user) {
                if (error) {
                    console.log('Error finding user by ID:', error);
                    res.status(500).send(error);
                }
                eventServices.findAllEventsInTier(user.tier, function(errEvents, events) {
                    if (errEvents) {
                        console.error('Error finding all events in tier:', errEvents);
                        res.status(500).send(errEvents);
                    } else {
                        console.log(events);
                        res.json({
                            events: events
                        });
                    }
                });
            });
        });
    });

    // Route for retrieving data of single event
    app.post('/events/:id/rsvp', function(req, res, next) {
        var auth_token = req.get('Authorization');
        jwt.verify(auth_token, app.get('superSecret'), function(error, userId) {
            if (error) res.status(401).send("User not logged in: " + error);
            eventServices.rsvpToEvent(req.params.id, req.body.rsvp, userId, function(err, evnt) {
                if (err) res.status(500).send("Could not rsvp to event: " + err);

                // TODO: Render template pls
                res.json({
                    event: evnt
                });
            });
        });
    });

    // Route for retrieving data of single event
    app.get('/events/:id', function(req, res, next) {
        var auth_token = req.get('Authorization');
        jwt.verify(auth_token, app.get('superSecret'), function(error, userId) {
            eventServices.findOneEvent(req.params.id, function(err, evnt) {
                if (err) {
                    console.log('Error finding one event:', err);
                    res.status(500).send(err);
                } else {

                    var expandUser = function(userId, cb) {
                        User.findById(userId, function(userError, user) {
                            cb(userError, {
                                displayName: user.firstName + " " + user.lastName,
                                _id: user._id,
                                photoUrl: user.photoUrl
                            });
                        });
                    };

                    async.map(evnt.going, expandUser, function(error, newGoing) {
                        async.map(evnt.maybe, expandUser, function(error, newMaybe) {
                            async.map(evnt.ignore, expandUser, function(error, newIgnore) {
                                evnt.going = newGoing;
                                evnt.maybe = newMaybe;
                                evnt.ignore = newIgnore;
                                res.json({
                                    event: evnt
                                });
                            });
                        });
                    });
                }
            });
        });
    });

    // Route for retrieving data of all events
    app.get('/events', function(req, res, next) {

        eventServices.findAllEvents(function(err, events) {
            if (err) {
                console.log('Error finding all events:', err);
                res.status(500).send(err);
            } else {
                // not logging here since data might be massive

                // TODO: Render template pls
                res.render('events/event_feed', {events: events});
            }
        });
    });


    // Route for retrieving data of all events in a tier
    app.get('/events/:tier', function(req, res, next) {

        eventServices.findAllEventsInTier(function(err, tier, events) {
            if (err) {
                console.log('Error finding all events in tier:', err);
                res.status(500).send(err);
            } else {
                res.json({
                    events: events
                });
            }
        });
    });
};
