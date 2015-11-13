var Event = require('../models/event.js');
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
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
            eventServices.createEvent(req.body, user.tier, function(err, event) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log('New event created: ' + event);
                res.json({
                    user: req.user;     
                    token: token; 
                    });
                }   
            });
          });
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

    // Route for retrieving data of all events in a tier
    app.get('/events/:tier', function(req, res, next) {

        eventServices.findAllEventsInTier(function(err, tier,  events) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json({
                posts: posts
                });
            }
        });
    });
};
