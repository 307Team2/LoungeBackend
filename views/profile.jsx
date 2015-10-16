var React = require('react');
var ProfileWrapper = require('./layout.jsx');

var Profile = React.createClass({
  render: function() {
    return (
      <ProfileWrapper page="profile">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-2">
              <div className="panel">
                <h2>{this.props.user.firstName} {this.props.user.lastName}</h2>
                <p>Age: {this.props.user.age}</p>
                <p>Location: {this.props.user.location}</p>
                <p>Organization: {this.props.user.organization}</p>
                <p>Job Title: {this.props.user.jobTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </ProfileWrapper>
    );
  }
});

module.exports = Profile;
