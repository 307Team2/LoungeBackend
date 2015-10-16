var React = require('react');

var EventPanel = React.createClass({
  render: function() {
    return (
      <div className="event-panel">
        <a href={"/eventTest"}><h1>{this.props.event.name}</h1></a>
        <h2>{this.props.event.date.getDate()}</h2>
        <p>{this.props.event.description}</p>
      </div>
    );
  }
});

module.exports = EventPanel;
