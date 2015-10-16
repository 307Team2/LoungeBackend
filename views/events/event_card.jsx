var React = require('react');

var EventPanel = React.createClass({
  render: function() {
    return (
      <div className="panel event">
        <div className="panel-body">
          <h1 className="panel-title">
            <a href={"/eventTest"}>
              {this.props.event.name + " • " + this.props.event.date.toDateString()}
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
