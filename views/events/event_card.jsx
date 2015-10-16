var React = require('react');
var moment = require('moment');

var EventPanel = React.createClass({
  render: function() {
    console.log(this.props.event.startDate);
    return (
      <div className="panel event">
        <div className="panel-body">
          <h1 className="panel-title">
            <a href={"/events/" + this.props.event._id}>
              {this.props.event.title + " • " + this.props.event.startDate.toDateString()}
            </a>
          </h1>
          <div className="panel-content">
            <p>{this.props.event.description}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EventPanel;
