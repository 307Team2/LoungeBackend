var React = require('react');
var LoungeWrapper = require('../layout.jsx');

var EventItem = React.createClass({
  render: function() {
    return (
      <LoungeWrapper title={this.props.title} page="{this.props.event.name}">
        <div className="container">
          <div className="panel event-item">
            <div className="panel-body">
              <h1 className="panel-title">
                {this.props.event.name}
              </h1>
              <div className="panel-content">
                <h3>{this.props.event.date.toDateString()}</h3>
                <p>{this.props.event.description}</p>
              </div>
            </div>
          </div>
        </div>
      </LoungeWrapper>
    );
  }
});

module.exports = EventItem;
