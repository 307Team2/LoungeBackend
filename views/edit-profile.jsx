var React = require('react');
var ProfileWrapper = require('./layout.jsx');
var Posts = require('./feed/posts.jsx');

var EditProfile = React.createClass({
  render: function() {
    return (
      <ProfileWrapper page="profile">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-2">
              <div className="panel">
                <img className="img-thumbnail img-responsive" src={"/images/profile.png"}/> 
                <h2>{this.props.user.firstname} {this.props.user.lastname}</h2>
                <p>
                  Age:
                  <input type="text" placeholder={this.props.user.age} />
                </p>
                <p>
                  Location:
                  <input type="text" placeholder={this.props.user.location} />
                </p>
                <p>
                  Organization:
                  <input type="text" placeholder={this.props.user.organization} />
                </p>
                <p>
                  Job Title:
                  <input type="text" placeholder={this.props.user.title} />
                </p>
                <a href="/profile"><button type="button" className="btn btn-success">Submit Changes</button></a>
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

module.exports = EditProfile;
