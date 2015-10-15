var React = require('react');
var LoungeWrapper = require('../layout.jsx');
var EventPanel = require('./event_panel.jsx');
var EventFilter = require('./event_filter.jsx');

var EventFeed = React.createClass({
  getInitialState: function() {
    return {
      filter: 'Ongoing',
      test: true
    };
  },
  changeFilter: function(filter) {
    console.log('test');
    this.setState({
      filter: filter
    });
  },
  changeTest: function() {
    console.log("Test");
    this.setState({
      test: !this.state.test
    });
  },
  events: [
    {test: 'test'},
    {test: 'test2'}
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
            <EventFilter filter={this.state.filter} changeFilter={this.changeFilter}/>
            <div className="event-creation"></div>
            <h1>{this.state.filter}</h1>
            <h1 onClick={this.changeTest}>{this.state.test? "TRUE" : "FALSE"}</h1>
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
