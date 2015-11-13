var Event = require('../models/event.js');
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var async = require('async');
var moment = require('moment');
var eventServices = require('../services/eventServices.js');

module.exports = function(app) {

    // Route for creating events
    app.post('/events/create', function(req, res, next) {
        var auth_token = req.get('Authorization');
        jwt.verify(auth_token, app.get('superSecret'), function(err, userId) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            User.findById(userId, function(error, user) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
                eventServices.createEvent(req.body, user.tier, function(createErr, event) {
                    if (createErr) {
                        console.log(createErr);
                        res.sendStatus(500);
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
                console.log(err);
                res.sendStatus(500);
            }
            User.findById(userId, function(error, user) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
                eventServices.findAllEventsInTier(user.tier, function(err, events) {
                    if (err) {
                        console.error(err);
                        res.sendStatus(500);
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
            if (error) res.status(500).send("User not logged in: " + error);
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
                    console.log(err);
                    res.sendStatus(500);
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
                console.log(err);
                res.sendStatus(500);
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
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json({
                    events: events
                });
            }
        });
    });
};
