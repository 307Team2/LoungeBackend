var React = require('react');
var LoungeWrapper = require('../layout.jsx');
var CreateEvent = require('./create_event.jsx');
var EventCard = require('./event_card.jsx');

var EventFeed = React.createClass({
  getPanels: function() {
    console.log(this.props.events);
    return this.props.events.map(function(event, i) {
      return (
        <EventCard event={event} key={i} />
      );
    });
  },
  render: function() {
    return (
      <LoungeWrapper title={this.props.title} page="events">
        <div className="container">
          <div className="event-creation">
            <CreateEvent />
          </div>
          <div className="event-panels">
            {this.getPanels()}
          </div>
        </div>
      </LoungeWrapper>
    );
  }
});

module.exports = EventFeed;
