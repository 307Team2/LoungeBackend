var React = require('react');
var ProfileWrapper = require('./layout.jsx');

var Profile = React.createClass({
  render: function() {
    return (
      <ProfileWrapper page="profile">
        <div className="container">
          <div className="sidecar">
            <img className="image" src={"/images/profile.jpg"}/> 
            <h1>Miranda Mott</h1>
            <p>Age: 21</p>
            <p>Location: West Lafayette, IN</p>
            <p><a className="btn" href="/profile/miranda.mott/edit">Edit Profile</a></p>
          </div>
          <div className="content">
            <h1>Posts</h1>
          </div>
        </div>
      </ProfileWrapper>
    );
  }
});

module.exports = Profile;
