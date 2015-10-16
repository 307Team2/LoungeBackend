var React = require('react');
var LoungeWrapper = require('../layout.jsx');

var EventItem = React.createClass({
  render: function() {
    return (
      <LoungeWrapper title={this.props.title} page="{this.props.event.name}">
        <div className="event-well">
          <div className="event-nav">
            <h1>{this.props.event.name}</h1>
            <div className="event-creation"></div>
          </div>
          <div className="event-panels">
          </div>
        </div>
      </LoungeWrapper>
    );
  }
});

module.exports = EventItem;
