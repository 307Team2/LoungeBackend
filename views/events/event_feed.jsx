var React = require('react');
var LoungeWrapper = require('../layout.jsx');
var EventPanel = require('./event_panel.jsx');

var EventFeed = React.createClass({
  events: [
    {name: 'BoilerCamp', description: "the worst fucking thing ever", date: new Date()},
    {name: 'BoilerMake', description: "even worse than BoilerCamp", date: new Date()}
  ],
  getPanels: function() {
    return this.events.map(function(event, i) {
      return (
        <EventPanel event={event} key={i} />
      );
    });
  },
  render: function() {
    return (
      <LoungeWrapper title={this.props.title} page="events">
        <div className="event-well">
          <div className="event-nav">
            <h1>Events</h1>
            <div className="event-creation"></div>
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
