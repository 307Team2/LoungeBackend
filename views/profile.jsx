var React = require('react');
var ProfileWrapper = require('./layout.jsx');
var Posts = require('./feed/posts.jsx');

var Profile = React.createClass({
  render: function() {
    return (
      <ProfileWrapper page="profile">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-2">
              <div className="panel">
                <img className="img-thumbnail img-responsive" src={"/images/profile.png"}/> 
                <h2>{this.props.user.firstname} {this.props.user.lastname}</h2>
                <p>Age: {this.props.user.age}</p>
                <p>Location: {this.props.user.location}</p>
                <p>Organization: {this.props.user.organization}</p>
                <p>Job Title: {this.props.user.title}</p>
                <a href="/profile/edit"><button type="button" className="btn btn-default">Edit Profile</button></a>
              </div>
            </div>
            <div className="col-sm-4">
              <Posts posts={this.props.posts} />
            </div>
          </div>
        </div>
      </ProfileWrapper>
    );
  }
});

module.exports = Profile;
