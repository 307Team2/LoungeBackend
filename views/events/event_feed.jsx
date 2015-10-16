var React = require('react');
var LoungeWrapper = require('../layout.jsx');
var EventCard = require('./event_card.jsx');

var EventFeed = React.createClass({
  events: [
    {name: 'BoilerCamp', description: "the worst fucking thing ever", date: new Date()},
    {name: 'BoilerMake', description: "even worse than BoilerCamp", date: new Date()}
  ],
  getPanels: function() {
    return this.events.map(function(event, i) {
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
            <div className="panel new-event">
              <div className="panel-body">
                <h2 className="panel-title">Create a new event</h2>
                <form>
                  <h3 className="panel-label">What's your event called?</h3>
                  <input type="text" className="form-control" placeholder="My awesome event name" />
                  <h3 className="panel-label">What's your event about?</h3>
                  <textarea type="text" className="form-control" placeholder="My awesome event description" />
                  <h3 className="panel-label">When's your event?</h3>
                  <input type="date" className="form-control" />
                  <input type="submit" className="btn btn-success" value="Create Event" />
                </form>
              </div>
            </div>
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
