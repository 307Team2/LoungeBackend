var React = require('react');
var SignUpWrapper = require('../layout.jsx');

var SignUp = React.createClass({
  render: function() {
    return (
      <SignUpWrapper title="Sign Up" page="signup">
        <div className="container">
          <div className="content">
            <h1>Join Lounge today.</h1>
            <form action="">
              <input type="text" name="fullname" placeholder="Full Name" />
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
