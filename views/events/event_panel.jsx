var React = require('react');

var EventPanel = React.createClass({
  render: function() {
    return (
      <a href={"/eventTest"}>
        <div className="event-panel">
          <h1>{this.props.event.name}</h1>
          <h2>{this.props.event.date.getDate()}</h2>
          <p>{this.props.event.description}</p>
        </div>
      </a>
    );
  }
});

module.exports = EventPanel;
