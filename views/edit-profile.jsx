var React = require('react');
var EditProfileWrapper = require('./layout.jsx');

var EditProfile = React.createClass({
  render: function() {
    return (
      <EditProfileWrapper page="edit-profile">
        <div className="container">
          <div className="content">
            <h1>Edit profile</h1>
            <hr />
            <div className="image-container">
              <img className="image" src={"/images/profile.jpg"}/>
              <p>Picture: <input type="file" name="newimage" accept="image/*" /></p>
            </div>
            <div className = "fields">
              <p>Name: <input type="text" name="fullname" placeholder="Miranda Mott" /></p>
              <p>Age: <input type="text" name="fullname" placeholder="21" /></p>
              <p>Location: <input type="text" name="fullname" placeholder="West Lafayette, IN" /></p>
              <p>Organization: <input type="text" name="organization" placeholder="ITaP" /></p>
              <p>Job Title: <input type="text" name="job" placeholder="Web/Mobile App Intern" /></p>
              <div className="buttons">
                <a className="button" href="/profile">Save</a>
                <a className="button" href="/profile">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </EditProfileWrapper>
    );
  }
});

module.exports = EditProfile;
