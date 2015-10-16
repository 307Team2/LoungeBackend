var React = require('react');
var SignUpWrapper = require('../layout.jsx');

var SignUp = React.createClass({
  render: function() {
    return (
      <SignUpWrapper title="Log In" page="login">
        <div className="container">
          <div className="content">
            <h1>Log in on this nice page.</h1>
            <form>
              <input type="text" name="email" placeholder="Email" />
              <br/>
              <input type="password" name="password" placeholder="Password" />
              <br/>
              <input type="submit" value="Log In" />
            </form>
          </div>
        </div>
      </SignUpWrapper>
    );
  }
});

module.exports = SignUp;
