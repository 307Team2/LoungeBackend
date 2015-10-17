var React = require('react');
var ProfileWrapper = require('./layout.jsx');

var EditProfile = React.createClass({
  render: function() {
    return (
      <ProfileWrapper page="profile">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-2">
              <div className="panel">
                <a href={"/account/profile/" + this.props.user.id}>Back to profile</a>
                <h2>{this.props.user.firstName} {this.props.user.lastName}</h2>
                <form action="/account/update" method="POST">
                  <p>Age:</p>
                  <input name="age" type="text" defaultValue={this.props.user.age} />
                  <p>Location:</p>
                  <input name="location" type="text" defaultValue={this.props.user.location} />
                  <p>Organization:</p>
                  <input name="organization" type="text" defaultValue={this.props.user.organization} />
                  <p>Job Title:</p>
                  <input name="jobTitle" type="text" defaultValue={this.props.user.jobTitle} />
                  <br />
                  <br />
                  <input type="submit" className="btn btn-success" value="Submit Changes" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </ProfileWrapper>
    );
  }
});

module.exports = EditProfile;
