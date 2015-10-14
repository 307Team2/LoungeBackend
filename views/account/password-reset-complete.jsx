var React = require('react');
var PasswordResetCompleteWrapper = require('../layout.jsx');

var PasswordResetComplete = React.createClass({
  render: function() {
    return (
      <PasswordResetCompleteWrapper title="Password Reset" page="password-reset-complete">
        <div className="container">
          <div className="content">
            <h1>Congratulations! You've successfully changed your password.</h1>
            <p><a className="btn" href="/">Continue to Lounge</a></p>
          </div>
        </div>
      </PasswordResetCompleteWrapper>
    );
  }
});

module.exports = PasswordResetComplete;
