var React = require('react');
var ResetPasswordWrapper = require('./layout.jsx');

var ResetPassword = React.createClass({
  render: function() {
    return (
      <ResetPasswordWrapper title="Password Reset" page="reset-password">
        <div className="container">
          <div className="content">
            <h1>Reset your password</h1>
            <p>Strong passwords include numbers, letters, and punctuation marks.</p>
            <p>Type your new password</p>
            <p><input type="text" name="password1" /></p>
            <p>Type your new password one more time</p>
            <p><input type="text" name="password2" /></p>
            <p><a className="btn" href="/account/password_reset_complete">Submit</a></p>
          </div>
        </div>
      </ResetPasswordWrapper>
    );
  }
});

module.exports = ResetPassword;
