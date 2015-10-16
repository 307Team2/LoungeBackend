var React = require('react');

var CreateEvent = React.createClass({
  render: function() {
    return (
      <div className="panel new-event">
        <div className="panel-body">
          <h2 className="panel-title">Create a new event</h2>
          <form action="/events/create" method="post">
            <h3 className="panel-label">What's your event called?</h3>
            <input name="title" type="text" className="form-control" placeholder="My awesome event name" />
            <h3 className="panel-label">What's your event about?</h3>
            <textarea name="description" type="text" className="form-control" placeholder="My awesome event description" />
            <h3 className="panel-label">When's your event?</h3>
            <input name="startDate" type="date" className="form-control" />
            <input type="submit" className="btn btn-success" value="Create Event" />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = CreateEvent;
