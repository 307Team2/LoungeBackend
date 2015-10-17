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
                <h2>{this.props.user.firstName} {this.props.user.lastName}</h2>
                <p>
                  Age:
                  <input type="text" value={this.props.user.age} />
                </p>
                <p>
                  Location:
                  <input type="text" value={this.props.user.location} />
                </p>
                <p>
                  Organization:
                  <input type="text" value={this.props.user.organization} />
                </p>
                <p>
                  Job Title:
                  <input type="text" value={this.props.user.title} />
                </p>
                <a href="/profile"><button type="button" className="btn btn-success">Submit Changes</button></a>
              </div>
            </div>
          </div>
        </div>
      </ProfileWrapper>
    );
  }
});

module.exports = EditProfile;
