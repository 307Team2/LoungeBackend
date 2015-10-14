var React = require('react');
var SignUpWrapper = require('../layout.jsx');

var SignUp = React.createClass({
  render: function() {
    return (
      <SignUpWrapper title="Sign Up" page="signup">
        <div className="container">
          <div className="content">
            <h1>Join Lounge today.</h1>
            <p><input type="text" name="fullname" placeholder="Full Name" /></p>
            <p><input type="text" name="email" placeholder="Email" /></p>
            <p><input type="password" name="password" placeholder="Password" /></p>
            <p><a className="btn" href="#">Sign Up</a></p>
          </div>
        </div>
      </SignUpWrapper>
    );
  }
});

module.exports = SignUp;
