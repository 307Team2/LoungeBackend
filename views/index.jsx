var React = require('react');
var LoungeWrapper = require('./layout.jsx');

var Homepage = React.createClass({
  render: function() {
    return (
      <LoungeWrapper title={this.props.title} page="homepage">
        <div className="container">
          <div className="content">
            <h1>Lounge</h1>
            <p>An interactive web experience for rich people.</p>
          </div>
        </div>
      </LoungeWrapper>
    );
  }
});

module.exports = Homepage;
