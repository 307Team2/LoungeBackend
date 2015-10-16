var Event = require('../models/event.js');
var moment = require('moment');

module.exports = function(app) {

    app.post('/events/create', function(req, res, next) {

        var newEvent = req.body;
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
};
