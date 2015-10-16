var React = require('react');
var EditProfileWrapper = require('./layout.jsx');

var EditProfile = React.createClass({
  render: function() {
    return (
      <EditProfileWrapper page="edit-profile">
        <div className="container">
          <div className="content">
            <p><img className="image" src={"/images/profile.jpg"}/></p>
            <p><input type="text" name="fullname" placeholder="Miranda Mott" /></p>
            <p>Age: <input type="text" name="fullname" placeholder="21" /></p>
            <p>Location: <input type="text" name="fullname" placeholder="West Lafayette, IN" /></p>
            <p><a className="btn" href="/profile/miranda.mott">Save</a></p>
          </div>
        </div>
      </EditProfileWrapper>
    );
  }
});

module.exports = EditProfile;
