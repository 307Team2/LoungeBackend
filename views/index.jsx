var React = require('react');

var HelloMessage = React.createClass({
  render: function() {
    return <div>Welcome to {this.props.title}</div>;
  }
});

module.exports = HelloMessage;