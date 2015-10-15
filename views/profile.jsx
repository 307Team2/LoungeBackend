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
            <p>Organization: ITaP</p>
            <p>Job Title: Web/Mobile App Intern</p>
            <p><a className="btn" href="/profile/edit">Edit Profile</a></p>
          </div>
          <div className="content">
            <h1>Posts</h1>
            <hr />
            <div className="post">
              <h2>I'm loving Kansas City, but I'm really excited to be going back home for the weekend! :)</h2>
              <h3>7:07 PM - 29 May 2015</h3>
            </div>
            <div className="post">
              <h2>Made it to Kansas and all moved in for the summer! :)</h2>
              <h3>10:22 PM - 16 May 2015</h3>
            </div>
            <div className="post">
              <h2>So excited for the Purdue men's varsity bowling team to be heading to nationals tonight! Best of luck guys, and I wish I could come watch!</h2>
              <h3>3:46 PM - 14 Apr 2015</h3>
            </div>
          </div>
        </div>
      </ProfileWrapper>
    );
  }
});

module.exports = Profile;
