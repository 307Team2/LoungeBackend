var React = require('react');

var EventPanel = React.createClass({
  render: function() {
    return (
      <div>
        <h1>{this.props.event.test}</h1>
      </div>
    );
  }
});

module.exports = EventPanel;
