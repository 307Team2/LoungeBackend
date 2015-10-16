var React = require('react');
var SignUpWrapper = require('../layout.jsx');

var SignUp = React.createClass({
  render: function() {
    return (
      <SignUpWrapper title="Sign Up" page="signup">
        <div className="container">
          <div className="content">
            <h1>Join Lounge today.</h1>
            <form action="/account/signup" method="post">
              <input type="text" name="firstName" placeholder="First Name" />
              <br/>
              <input type="text" name="lastName" placeholder="Last Name" />
              <br/>
              <input type="number" name="age" placeholder="Age" />
              <br/>
              <input type="text" name="location" placeholder="Location" />
              <br/>
              <input type="text" name="organization" placeholder="Organization" />
              <br/>
              <input type="text" name="jobTitle" placeholder="Job Title" />
              <br/>
              <input type="text" name="email" placeholder="Email" />
              <br/>
              <input type="password" name="password" placeholder="Password" />
              <br/>
              <input type="submit" value="Sign Up" />
            </form>
          </div>
        </div>
      </SignUpWrapper>
    );
  }
});

module.exports = SignUp;
