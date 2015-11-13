var assert = require('assert');
var eventServices = require('../services/eventServices.js'); 

describe('eventServices', function() {
	describe('#createEvent', function() {
		it('Should not return an error when invoked', function() {
			var eventData = {
				name: 'Test',
				description: 'This is a test event',
				date: new Date(2015, 11, 11)
			}	
			eventServices.createEvent(eventData, function(err, event) {
				assert.equal(err, 0);
			});
		});
	});
	describe('#findOneEvent', function() {
		it('Should not return an error when invoked', function() {
			var eventID = 457382;
			eventServices.findOneEvent(eventID, function(err, event) {
				assert.equal(err, 0);
			});
		});
	});
	describe('#findAllEvents', function() {
		it('Should not return an error when invoked', function() {
			eventServices.findAllEvents(function(err, events) {
				assert.equal(err, 0);
			});
		});
	});
});
