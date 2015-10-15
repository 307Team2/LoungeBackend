var React = require('react');
var SignUpWrapper = require('../layout.jsx');

var SignUp = React.createClass({
  render: function() {
    return (
      <SignUpWrapper title="Log In" page="login">
        <div className="container">
          <div className="content">
            <h1>Log in on this nice page.</h1>
            <p><input type="text" name="email" placeholder="Email" /></p>
            <p><input type="password" name="password" placeholder="Password" /></p>
            <p><a className="btn" href="#">Log In</a></p>
          </div>
        </div>
      </SignUpWrapper>
    );
  }
});

module.exports = SignUp;
